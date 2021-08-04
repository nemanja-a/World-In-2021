import { useState } from 'react'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import dialogStyles from "../styles/dialog.module.css"
import tableStyles from "../styles/table.module.css"
import utilStyles from "../styles/utils.module.css"
import formStyles from "../styles/form.module.css"
import Image from "next/image"
import 'react-toastify/dist/ReactToastify.css';
import { ALLOWED_FORMATS, REFERER_HEADER_MAX_LENGTH, WEBSITE } from '../util/variables'
import { Input } from './common/Input'
import BadWordsFilter from 'bad-words'
import { Button } from './common/Button'
import FadeIn from 'react-fade-in';
import { Payment } from './Payment'
import { server } from '../config'
import { classNames } from '../lib/util'
import { ModalLoader } from './ModalLoader'
import { useDropzone } from 'react-dropzone'
import { Select } from './common/Select'
import { showError } from '../lib/toast'

export function AddWebsiteDialog(props) {
  let defaultWebsite = WEBSITE.DEFAULT
  if (props.website) {
    defaultWebsite.page = props.website.page
    defaultWebsite.rowIndex = props.website.rowIndex
    defaultWebsite.columnIndex = props.website.columnIndex
  }
  const defaultState = {
    websiteValid: null,
    websiteAlreadyExist: false,
    step: 1,
    amount: 2,
    showTitle: false,
    showDescription: false,
    website: defaultWebsite,
    loading: false
  }
  const [ state, setState ] = useState(defaultState)

  const { getRootProps, getInputProps } = useDropzone({
    accept: ALLOWED_FORMATS,
    multiple: false,
    disabled: state.step === 3,
    onDropRejected: () => { 
      showError("Invalid file type. Try again", 5000)
    },
    onDrop: (acceptedFiles) => { 
      acceptedFiles[0] && onImageChange(acceptedFiles[0])
     }
  })



  const deleteUnusedUploadedImage = async() => { 
    return await fetch(
      `${server}/api/deleteimage?filename=${state.website.thumbnail.cloudinaryId}`, {
      method: "DELETE"
    })
  }
  const onWebsiteUrlChange = (event) => {
    event.target.value = event.target.value.replace(/\s/g, "");
    setState({
      ...state,
      imageError: false,
      website: {
        ...state.website,
        [event.target.name]: event.target.value
      },
      websiteValid: null,
      websiteValid: null,
      websiteAlreadyExist: false
    })
  }

  const onDescriptionChange = (event) => {
    const filter = new BadWordsFilter()
   
    setState({
      ...state,
      validationError: false,
      website: {
        ...state.website,
        [event.target.name]: event.target.value,
      },
      [event.target.name + "Profane"]: filter.isProfane(event.target.value)
    })
  }

  const onImageChange = async(file) => {
    toggleLoading(true, "Uploading image...")
    const formData = new FormData()
    if (!file && file.type.substr(0,5) !== "image") return
    if (state.website.image) {
      deleteUnusedUploadedImage()
    }
    formData.append('image', file)
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET)
    const uploadUrl = `${server}/api/upload`
    const uploadRequest = await fetch(uploadUrl, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    })
    const uploadResponse = await uploadRequest.json()
    if (!uploadResponse.uploaded) {
      toggleLoading(false)
      setState({
        ...state,
        imagePreviewHovered: false,
        imageError: uploadResponse.message
      })
      showError(uploadResponse.message)
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = async() => {
        toggleLoading(false)
         setState({
           ...state,
           imageUnsafeText: '',
           imagePreviewHovered: false,
           imageError: false,
           previewImageUrl: uploadResponse.url,
           website: {
             ...state.website,
             thumbnail: {                
               cloudinaryId: uploadResponse.cloudinaryId
             },
             image: file
           }
         })
        }
    }
  }

  const addWebsiteCallback = () => {
    setState({...state, website: {...state.website, image: null } })
  }

  const onVerifyWebsiteClick = async (event) => {
    const urlRegExp = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
    const urlValid = state.website.url.match(urlRegExp)
    if (!urlValid) {
      setState({...state, websiteValid: false, urlError: `URL ${state.website.url} does not match valid URL pattern. Try again.` })
      return
    } 
    event.stopPropagation()
    event.preventDefault()
    toggleLoading(true, "Verifying URL...")
    const validateWebsiteURL = `${server}/api/validate?url=${state.website.url}&page=${state.website.page}`
    const websiteResponse = await fetch(validateWebsiteURL, {
      mode: 'no-cors'
    })
    if (websiteResponse.status === 409) {
      setState({
        ...state,
        websiteAlreadyExist: true,
        websiteValid: null
      })
      return
    } else if (websiteResponse.status === 404) {
      let data = await websiteResponse.json()
      if (data.error.length > 650) {
        data.error = data.error.slice(0, 650) + '... is not valid.'
      }
      toggleLoading(false)
      setState({
        ...state,
        websiteValid: false,
        websiteAlreadyExist: null,
        urlError: data.error
      }) 
    } else if (websiteResponse.status === 200) {
      toggleLoading(false)
      setState({
        ...state,
        websiteValid: true,
        websiteAlreadyExist: null,
        showTitle: true,
        showDescription: true
      })
    } else {
      toggleLoading(false)
      setState({
        ...state,
        websiteValid: false,
        websiteAlreadyExist: null,
        urlError: `URL ${state.website.url} is not valid. Try again`
      })
    }
  }
  const toggleLoading = (value, text) => { 
    setState( {...state, loading: value, loaderText: text} )
  }
  const onNextStep = () => { 
    if (state.step === 2 && (!state.website.categories.length || !state.website.description.length || !state.website.countries.length)) {
      setState({...state, validationError: true})
    } else {
      setState({
        ...state,
        validationError: false, 
        step: state.step + 1,
        urlError: null,
        imageError: null,
        websiteAlreadyExist: null,
        }) 
    }
  }

  const onPreviousStep = () => { 
    localStorage.removeItem('amount')
    setState({...state, step: state.step - 1}) 
  }

  const urlInputClasses = classNames({
    [dialogStyles.urlInput]: true,
    [formStyles.input]: true
  })

  const onSelect = (selectedList, controlName) => {
    setState({...state, validationError: false, website: {...state.website, [controlName]: selectedList}} )
  }


  const onRemove = (selectedList, controlName ) => {
    setState({...state, website: {...state.website, [controlName]: selectedList}} )
  }

  const getFormData = () => {
    console.log(`Before save: Row Index: ${props.website.rowIndex} \\ COlumn index: ${props.website.columnIndex}`)
    const categories = state.website.categories.map(category => { 
      return category.value
    })
    const countries = state.website.countries && state.website.countries.map(category => { 
      return category.value
    })
    return {
      url: state.website.url,
      page: Number(props.website.page),
      rowIndex: props.website.rowIndex,
      columnIndex: props.website.columnIndex,
      thumbnail: {...state.website.thumbnail, url: state.previewImageUrl},
      createdAt: new Date(),
      categories,
      countries,
      description: state.website.description
    } 
    
  }

  const cellClasses = classNames({
      [tableStyles.emptyCell]: true,
      [tableStyles.cellDisabled]: props.filterActive
  })

  const imagePreviewClasses = classNames({
    [tableStyles.websiteImage]: true,
    [tableStyles.previewImage]: true,
    [dialogStyles.imagePreviewHovered]: state.imagePreviewHovered
  })

  const dropZoneClasses = classNames({
    [utilStyles.dropZone]: true,
    [utilStyles.dropZoneDisabled]: state.step === 3
  })

  const selectStyles = {
    chips: {
      background: "#ffaa4e",
      color: "black"
    }  
  }

  const categorySelectClasses = classNames({
    [utilStyles.formControlError]: state.validationError && !state.website.categories.length
  })

  const descriptionInputClasses = classNames({
    [utilStyles.inputError]: state.validationError && !state.website.description.length
  })

  const nextButtonDisabled = state.step === 3 || !state.websiteValid || state.titleProfane || state.descriptionProfane 
  return (
    <div className={cellClasses} id={props.id}>
      {/* Dialog */}
      <Dialog className={dialogStyles.dialog} aria-label="add-website-dialog" isOpen={state.showDialog} onDismiss={props.close}>
        <FadeIn transitionDuration={500}>
          <button className={utilStyles.closeButton} onClick={props.close}>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </button>
          <div className={dialogStyles.title}>Add website</div>
          {state.step === 1 && <div className={utilStyles.stepTitle}>URL and Image</div>}
          {state.step === 2 && <div className={utilStyles.stepTitle}>Thumbnail appearance</div>}
          {state.step === 3 && <div className={utilStyles.stepTitle}>Payment</div>}
          
          {state.loading && <ModalLoader text={state.loaderText}/>}        

        <div className={dialogStyles.websitePreview}>
          {/* Image preview */}
          {state.step === 1 && <p>
          - Upload website thumbnail by clicking on image next to this text or by dropping file. Accepted
          image formats are JPG, JPEG and PNG. <br/>
          - Enter URL of website. <br/>
          - Once URL is entered, click on Verify to confirm that site does not contain inappropriate content <br/>
          - Continue to Next Step to customize thumbnail appearance
          </p>}

          {state.step === 2 && <p>
            - Show/hide title or description <br/>
            - Press and hold Position buttons to adjust positions <br/>
            - Add custom title/description text <br/>
            - Adjust opacity <br/>
            - Choose text color <br/>
            - Choose background color <br/>
          </p>}

          {state.step === 3 && <p>That's it.  If you want to change anything, now is the time to back go to Previous Step. <br/> <br/>
            *After publishing website, it can not be modified by neither user nor admin. Website can be removed by admin only. <br/> <br/>
            *Disclaimer: Websites with inappropriate content that manage to bypass safety-content check will be removed and no refund will be provided.
          </p>}

          <div>
            <div className={dialogStyles.imagePreviewWrapper}
             onMouseEnter={() => { state.step !== 3 && setState({...state, imagePreviewHovered: true })} }
             onMouseLeave={() => setState({...state, imagePreviewHovered: false})}
            > 
              <div {...getRootProps({className: dropZoneClasses})}>
                <input {...getInputProps()} />                          
                <div id={dialogStyles.imageUploadOverlay}>Drop or click here to upload</div>
                
                {state.step !== 1 && <div className={dialogStyles.imagePreviewInfo}>
                  <div className={dialogStyles.previewInfoRow}>
                    <span>URL</span>
                    <strong>{state.website.url || "www.exampleurl.com"}</strong>
                  </div>
                  <div className={dialogStyles.previewInfoRow}>
                    <span>Description</span>
                    <strong>{state.website.description || "Description goes here"}</strong>
                  </div>   
                </div>}   

                <Image
                  priority
                  src={state.previewImageUrl || WEBSITE.THUMBNAIL.DEFAULT}
                  className={imagePreviewClasses}
                  layout="fill"
                  alt={WEBSITE.THUMBNAIL.NO_IMAGE_FOUND}
                />

              </div>              
            </div>

            {/* Image preview end*/}
          </div>
        </div>
      </FadeIn>
      {/* First step */}
      {state.step === 1 && <FadeIn transitionDuration={500}>
        <div className={dialogStyles.step}>
          <div id={dialogStyles.websiteInputWrapper}>
            <span style={{display: "flex"}}>
              <span>
                <label htmlFor="url" className={utilStyles.formItemSpacing}>*Website Address</label>
                <input
                  style={{minWidth: '14vw'}}
                  className={urlInputClasses}
                  value={state.website.url}
                  placeholder="Enter url..."
                  id="url" 
                  name="url"
                  onChange={onWebsiteUrlChange}
                  onKeyDown={() => event.key === 'Enter' && onVerifyWebsiteClick(event) }
                  type="text"
                  autoComplete="url"
                  maxLength={REFERER_HEADER_MAX_LENGTH}
                />
                <span>*Make sure that URL starts with https://</span>
              </span>
            {state.websiteValid && <span className={dialogStyles.checkmark}>
                <div className={dialogStyles.checkmarkStem}></div>
                <div className={dialogStyles.checkmarkKick}></div>
            </span>}
            </span>
            <span className={dialogStyles.websiteInputUtils}>
                <Button
                    primary
                    onClick={() => onVerifyWebsiteClick(event)}
                    disabled={state.websiteValid || !state.website.url}
                    className={dialogStyles.verifyButton}
                >
                  Verify
                </Button>
            </span>
          </div>
          {(!state.websiteValid && state.websiteValid !== null) && <span className={utilStyles.error}>{state.urlError}</span>}
          {state.websiteAlreadyExist && <strong className={utilStyles.warning}>Website with url *{state.website.url}* has been found. But, If new website is located 10 or more pages before/after it's nearest location, it can be added again.</strong>}
        </div>
        <div id={dialogStyles.stepButtonsWrapper}>
            <Button primary onClick={onPreviousStep} disabled={state.step === 1} className={dialogStyles.stepButton}>Previous Step</Button>
            <Button primary onClick={onNextStep} disabled={nextButtonDisabled} className={dialogStyles.stepButton}>Next Step</Button>
        </div>
      </FadeIn>}
      {/* First step end */}

      {/* Second step */}
      {state.step === 2 && <FadeIn transitionDuration={500}>
      <form>
        <section id={dialogStyles.attributesSection}>
          <div className={dialogStyles.row}>
              <Input 
                required
                maxWidth
                label='Description'
                placeholder={`Enter maximum of ${WEBSITE.DESCRIPTION_MAX_LENGTH} characters...`}
                disabled={!state.websiteValid}
                name='description'
                value={state.website.description}              
                onChange={(event) => onDescriptionChange(event)}
                maxLength={WEBSITE.DESCRIPTION_MAX_LENGTH}
                className={descriptionInputClasses}
              />
          </div>
          {state.validationError && !state.website.description.length && <div className={dialogStyles.row}>
            <span className={utilStyles.error}>Description is required</span>
          </div>}
          <div className={dialogStyles.row}>
            <div>
              {state.website.description && (state.website.description.length === WEBSITE.DESCRIPTION_MAX_LENGTH) && <span className={utilStyles.error}>Character limit reached.</span>}
              {state.descriptionProfane && <span className={utilStyles.error}>Bad words are not allowed.</span>}
            </div>
          </div>
          <div className={dialogStyles.row}>
            {/* <Categories ref={categorySelectRef} selectedValues={state.website.categories}
             style={selectStyles} classes={categorySelectClasses}/> */}

            <Select
              required            
              maxWidth
              showCheckbox
              id="categoriesSelect"
              label='Categories'
              placeholder="Select website categories"                                                                 
              options={WEBSITE.CATEGORIES}
              onSelect={(selectedList) => onSelect(selectedList, 'categories')}
              onRemove={(selectedList) => onRemove(selectedList, 'categories')}
              selectedValues={state.website.categories}
              style={selectStyles}
              className={categorySelectClasses}
            />                        
          </div>
          {state.validationError && !state.website.categories.length && <div className={dialogStyles.row}>
             <span className={utilStyles.error}>Select one or more categories</span>
          </div>}
          <div className={dialogStyles.row}>
            <Select  
              required          
              maxWidth
              id="countriesSelect"
              showCheckbox
              label='Countries'
              placeholder="Select website country"                                                                 
              options={WEBSITE.COUNTRIES}
              onSelect={(selectedList) => onSelect(selectedList, 'countries')}
              onRemove={(selectedList) => onRemove(selectedList, 'countries')}
              onRemove={onRemove}              
              selectedValues={state.website.country}
              style={selectStyles}
            />                        
          </div>
          {state.validationError && !state.website.countries.length && <div className={dialogStyles.row}>
             <span className={utilStyles.error}>Select one or more countries</span>
          </div>}

        </section>
        </form>
        <div id={dialogStyles.stepButtonsWrapper}>
            <Button primary onClick={onPreviousStep} disabled={state.step === 1} className={dialogStyles.stepButton}>Previous Step</Button>
            <Button primary onClick={onNextStep} disabled={nextButtonDisabled} className={dialogStyles.stepButton}>Next Step</Button>
        </div>     
      </FadeIn>}
      {/* Second step end */}

      {/* Third step */}
      {state.step === 3 && <FadeIn transitionDuration={500}>
        <Payment addWebsiteCallback={addWebsiteCallback} close={props.close} toggleLoading={toggleLoading} getFormData={getFormData}/>
        <div id={dialogStyles.stepButtonsWrapper}>
          <Button primary onClick={onPreviousStep} disabled={state.step === 1} className={dialogStyles.stepButton}>Previous Step</Button>
          <Button primary onClick={onNextStep} disabled={nextButtonDisabled} className={dialogStyles.stepButton}>Next Step</Button>
        </div>
      </FadeIn>}
      {/* Third step end*/}
      </Dialog>
      {/* Dialog */}
    </div>
  )
}