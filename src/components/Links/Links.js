import React, { useRef, useState, useEffect } from 'react'
import styles from './Link.module.css'
import { Modal } from '../Modal/Modal';
import Pagination from '../Pagination/Pagination';

// deletedLinkIndex değişken silinecek elemanın bir fonksiyondan diğer fonksiyona değerini geçirmem gerekiyorken gereksiz state açmamak için kullandım 
let deletedLinkIndex;

const Links = ({ setVotedSort, setTempDeletedName, setShowToastMessage, setDeleteOrAdd, sortsFunc, links, setAddLinkControl, setLink }) => {
     //modalRef silinecek elemanı seçtikten sonra açılan modalın referansı
     const modalRef = useRef();
     const [pageNumber, setpageNumber] = useState(0)
     const [currentPage, setCurrentPage] = useState(0);
     const [arrPagination, setArrPagination] = useState([]);

     const change = (e) => {
          if (e.target.value === "1") {
               setVotedSort("mostVoted")
          } else {
               setVotedSort("lessVoted");
          }
     }

     /**
       * @param {*} btn
       * btn delete butonunun targeti  
       *  mouseHoverDeleteBtn ve mouseLeaveDeleteBtn fonksiyonunu silme butonunun hover animasyonu için kullandım
     */
     const mouseHoverDeleteBtn = (e) => {
          let btn = e.currentTarget.getElementsByClassName(styles.deleteBtn)[0];
          e.currentTarget.style.background = "#f7f7f7"
          btn.style.transition = "all .4s ease"
          btn.style.transform = "scale(1)"
          btn.id = "selected"
     }
     const mouseLeaveDeleteBtn = (e) => {
          let btn = e.currentTarget.getElementsByClassName(styles.deleteBtn)[0];
          btn.style.transition = "all .4s ease"
          btn.style.transform = "scale(0)"
          e.currentTarget.style.background = "white"
          btn.id = ""
     }


     /**
      * @param {*} deletedItem
      * silinecek elemanı data-key ile alıp deletedItem değişkeninde tutarak lifting-up yaptıgım yerde siliyorum. 
      */
     const deleteFunc = (e) => {
          deletedLinkIndex = e.target.dataset.key;
          modalRef.current.style.display = "flex";
          setTempDeletedName(links[deletedLinkIndex].linkName);
          document.getElementsByClassName("deleteUrlName")[0].innerHTML = links[deletedLinkIndex].linkName
     }


     /**
      * @param {*} props
      * props lifting-up ile geliyor alt componentten üst componenete değer çıkartmam gerekiyor.
      */
     const deletedLink = (props) => {
          console.log('props', props)
          if (props) {
               setDeleteOrAdd("deleted");
               let tempLinks = [...links];
               tempLinks.splice(deletedLinkIndex, 1)
               setLink([...tempLinks]);
               localStorage.setItem('links', JSON.stringify(tempLinks));
               setShowToastMessage(true)

          }
     }

     const upVote = (e) => {
          let upVoteIndex = e.target.dataset.key;
          let tempLinks = [...links];
          tempLinks[upVoteIndex].vote += 1;
          tempLinks[upVoteIndex].date = new Date();
          sortsFunc(tempLinks);
     }

     const downVote = (e) => {
          let upVoteIndex = e.target.dataset.key;
          let tempLinks = [...links];
          tempLinks[upVoteIndex].vote -= 1;
          tempLinks[upVoteIndex].date = new Date();
          sortsFunc(tempLinks);
     }


     useEffect(() => {
          if (links.length > 5) {
               setpageNumber(Math.ceil(links.length / 5));
          } else {
               setpageNumber(1);
          }
     }, [links])



     useEffect(() => {
          let minVal = currentPage * 5;
          let maxVal = currentPage * 5 + 4
          setArrPagination([...range(minVal, maxVal)])
     }, [currentPage])

     const range = (minVal, maxVal) => Array.from({ length: maxVal - minVal + 1 }, (_, i) => minVal + i);


     return (
          <div className={styles.linksComponent}>
               <Modal deletedLinkIndex={deletedLinkIndex} deletedLink={deletedLink} modalRef={modalRef} />
               <div className={styles.submitLink} onClick={() => setAddLinkControl(false)}>
                    <button >+</button>
                    <p>
                         SUBMIT A LINK
                    </p>
               </div>
               <hr />
               <div >
                    <select id={styles.dropdown} defaultValue={'DEFAULT'} onChange={change}>
                         <option value="DEFAULT" style={{ display: "none" }} disabled> Order by </option>
                         <option value="1">Most Voted (Z  → A)</option>
                         <option value="2">Less Voted (A  → Z)</option>
                    </select>
               </div>
               <div style={{ width: "300px", height: "350px" }}>
                    {
                         arrPagination.map((item, key) => {
                              return links.length > item && <div key={item} data-testid="linkElement" className={styles.linkElement} onMouseLeave={mouseLeaveDeleteBtn} onMouseOver={mouseHoverDeleteBtn}>
                                   <div data-key={item} className={styles.deleteBtn} onClick={deleteFunc}>-</div>
                                   <div className={styles.voteTextCover}>
                                        <p className={styles.voteText}>
                                             {
                                                  links[item].vote
                                             }
                                        </p>
                                        <p className={styles.pointsText}>POINTS</p>
                                   </div>

                                   <div className={styles.linkElementRight}>
                                        <p className={styles.linkNameStyle}>
                                             {
                                                  links[item].linkName
                                             }
                                        </p>
                                        <a className={styles.urlStyle} href={item.linkUrl} >
                                             {
                                                  links[item].linkUrl
                                             }
                                        </a>
                                        <div className={styles.votes}>
                                             <p data-key={item} onClick={upVote}>
                                                  &#129045; Up Vote
                                             </p>
                                             <p data-key={item} onClick={downVote}>
                                                  &#129047;
                                                  Down Vote
                                             </p>
                                        </div>
                                   </div>
                              </div>
                         }

                         )
                    }
               </div>

               <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageNumber={pageNumber} links={links} />
          </div >
     )
}

export default Links;