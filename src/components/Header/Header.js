import React from 'react'
import styles from './Header.module.css'

const Header = () => {
     return (
          <div className={styles.header}>
               <div className={styles.titleLeft}>
                    <p className={styles.hepsiburada}>
                         hepsiburada
                    </p>
                    <p className={styles.com}>
                         .com
                    </p>
               </div>
               <div className={styles.titleRight}>
                    <p className={styles.link}>
                         Link
                    </p>
                    <p className={styles.vote}>
                         VOTE
                    </p>
                    <p className={styles.challange}>
                         Challenge
                    </p>
               </div>

          </div>
     )
}
export default Header;