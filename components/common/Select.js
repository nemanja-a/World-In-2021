import { classNames } from "../../lib/util"
import styles from "../../styles/form.module.css"
import Multiselect from 'multiselect-react-dropdown';

export function Select(props) {
        const labelStyles = classNames({
        [styles.disabled]: props.disabled,
        [styles.label]: true
    })

    let wrapperStyles = classNames({
        [styles.input]: true,
        [styles.fullWidth]: props.maxWidth
    })

    return <div className={wrapperStyles}>
            <label className={labelStyles} htmlFor={props.name}>
                {props.required ? '*' : null}
                {props.label}            
            </label>
            <Multiselect
                options={props.options} 
                selectedValues={props.selectedValues}
                placeholder={props.placeholder}
                onSelect={props.onSelect}
                onRemove={props.onRemove}            
                displayValue="displayValue"
                showCheckbox={props.showCheckbox}
                style={props.style}
                closeOnSelect={false}
                avoidHighlightFirstOption={true}
                hidePlaceholder={true}
                showArrow={true}
            />
        </div>
}