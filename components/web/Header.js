import '@reach/dialog/styles.css'
import styles from "../../styles/header.module.css"
import utilStyles from "../../styles/utils.module.css"
import { IntroductionDialog } from '../IntroductionDialog'

export function Header() {
  return (
    <div id="header" className={utilStyles.displayFlex}>
      <div className={styles.textContent}>
        <div id={styles.appName}><span>Whiteboard</span> marketing</div>
        <div id={styles.appDescription}>Add website once and stay for a lifetime</div>
        <div id={styles.gettingStartedWrapper}>
          <div style={{fontSize: "medium"}}><IntroductionDialog showOnInit={true}/></div>
        </div>
      </div>
    </div>
  )
}