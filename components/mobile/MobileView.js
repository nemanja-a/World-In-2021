import { Header } from "./Header"
import { useState } from "react"
import RecentlyJoined from "./RecentlyJoined"
import { Whiteboard } from "./Whiteboard"
import { getRecentlyJoined } from "../../lib/util"
import { Button } from "../common/Button"
import style from "../../styles/mobile.module.css"
import { FiltersDialog } from "./FiltersDialog"
import { WEBSITE } from "../../util/variables"


export default function MobileView() {
    let recentlyJoined
    const defaultState = {
        category: {},
        country: {}, 
        page: 0,
        showFiltersDialog: false
      }
    const [ state, setState ] = useState(defaultState)              
    const onDataReceived = (data) => {             
      recentlyJoined = getRecentlyJoined(data)         
      // TODO
      // setState({...state, recentlyJoined})
    }        
    
    const onChange = (filters) => {
       if (filters.category && filters.country) {
        setState({...state, category: filters.category, countries: filters.country}) 
       } else if (filters.category) {
         setState({...state, category: filters.category })
       } else if (filters.countries) {
        setState({...state, country: filters.country })
       }       
    }
    const onPageChange = (page) => { setState({...state, page}) }
    const categories = JSON.parse(JSON.stringify(WEBSITE.CATEGORIES))
    const countries = JSON.parse(JSON.stringify(WEBSITE.COUNTRIES))
  
    countries.unshift({displayValue: "All"})
    categories.unshift({displayValue: "All"})

    
    const FIlters = () =>  { 
      return <FiltersDialog 
      id="countryFilterList"
      title="Country"
      searchPlaceholder="Search countries..."
      countries={countries}
      categories={categories}
      onChange={onChange}      
    />
    }

    return (
        <div id="mobileContainer">
            <Header isMobile={true}/>
            <RecentlyJoined page={state.page} website={recentlyJoined}/>
            <FIlters />
            <Whiteboard category={state.category} country={state.country} onPageChange={onPageChange} getData={onDataReceived}/>            
        </div>
        // <div className={style.container}>
        //     <span>Coming soon!</span>
        // </div>
    )
}