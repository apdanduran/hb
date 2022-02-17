import React from 'react'

const ToastMessage = ({ content, id, toastRef }) => {
     return (
          <div id={id} ref={toastRef} className="">{content}</div>
     )
}
export default ToastMessage