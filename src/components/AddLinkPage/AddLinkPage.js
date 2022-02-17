import React, { useEffect, useRef } from 'react'
import styles from './AddLinkPage.module.css'

const AddLinkPage = ({ setDeleteOrAdd, setLinkName, setLinkUrl, showToastMessage, setShowToastMessage, linkName, linkUrl, sortsFunc, setAddLinkControl, setLink, links }) => {

     const nameInput = useRef();
     const linkInput = useRef();

     /**
      * @param nameInput
      * @param linkInput
      * inputtan alınan değerlerin tutuldugu değişken
      */

     useEffect(() => {
          if (linkName !== "") {
               nameInput.current.style.background = "white"
          }
          if (linkUrl !== "") {
               linkInput.current.style.background = "white"
          }
     }, [linkName, linkUrl])

     /**
      * @param {*} links
      * eklenen linklerin tutuldugu objelerin dizisi
      */

     const addFunc = () => {

          if (linkName === "" && linkUrl === "") {
               nameInput.current.style.background = "#ff9c9c"
               linkInput.current.style.background = "#ff9c9c"
          }
          else if (linkName === "") {
               nameInput.current.style.background = "#ff9c9c"
          }
          else if (linkUrl === "") {
               linkInput.current.style.background = "#ff9c9c"
          } else {
               console.log('linkName :>> ', linkName);
               console.log('linkUrl :>> ', linkUrl);
               setDeleteOrAdd("added")
               let tempObj = { linkName: linkName, linkUrl: linkUrl, date: new Date(), vote: 0 }
               links.push(tempObj)
               setShowToastMessage(true);
               sortsFunc(links);
               localStorage.setItem('links', JSON.stringify(links));
          }
     }




     const onFocusNameInput = () => {
          nameInput.current.style.background = "white"
     }


     return (
          <div className={styles.addLinkPage}>
               <h5 onClick={() => setAddLinkControl(true)} style={{ cursor: "pointer", margin: "2rem 0" }}> ← Return to List</h5>
               <h2 style={{ marginBottom: "2rem" }}>Add New Link</h2>
               <p>Link Name:</p>
               <input ref={nameInput} data-testid="nameInput" onFocus={onFocusNameInput} value={linkName} onChange={e => setLinkName(e.target.value)} placeholder='e.g. Alphabet' />
               <p>Link URL:</p>
               <input ref={linkInput} data-testid="linkInput" value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder='e.g. http://abc.xyz' />
               <button data-testid="addBtn" className={styles.addBtn} onClick={() => !showToastMessage && addFunc()} >ADD</button>
          </div>
     )
}

export default AddLinkPage