import React from 'react'
import './Modal.css'

export const Modal = ({ modalRef, deletedLink }) => {
     var modal = document.getElementById("myModal");

     const closeFunc = () => {
          modalRef.current.style.display = "none";
     }

     window.onclick = function (event) {
          if (event.target === modal) {
               modal.style.display = "none";
          }
     }

     const deleteFunc = () => {
          modalRef.current.style.display = "none";
          deletedLink(true);
     }

     return (
          <div ref={modalRef} id="myModal" className="modal">
               <div className="modal-content">
                    <div className="modal-header">
                         <p>Remove Link</p>
                         <span onClick={closeFunc} className="close">&times;</span>
                    </div>
                    <div className="modal-body">
                         <div>
                              <p className='descModal'>Do you want remove:</p>
                              <p className='deleteUrlName'></p>
                         </div>
                         <div className="modalBtn">
                              <button onClick={deleteFunc}>
                                   OK
                              </button>
                              <button onClick={closeFunc}>
                                   CANCEL
                              </button>
                         </div>
                    </div>

               </div>

          </div>

     )
}
