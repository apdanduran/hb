import React from 'react'
import styles from './Pagination.module.css'

const Pagination = ({ currentPage, setCurrentPage, pageNumber }) => {
     return (
          <div className={styles.pagination}>
               <div className={styles.arrowLeft}>
                    {currentPage !== 0 ? <div onClick={() => setCurrentPage(prev => prev - 1)}> {"<"} </div> : <div style={{ width: "18px" }} />}
               </div>
               {
                    [...Array(pageNumber)].map((i, key) => { return <div style={{ border: `${currentPage === key ? "1px solid black" : ""}` }} onClick={() => setCurrentPage(key)} className={styles.numbers} key={key}>{key}</div> })
               }
               <div className={styles.arrowRight}>
                    {(currentPage !== (pageNumber - 1)) ? <div onClick={() => setCurrentPage(prev => prev + 1)}> {">"} </div> : <div style={{ width: "18px" }} />}
               </div>
          </div >
     )
}
export default Pagination;