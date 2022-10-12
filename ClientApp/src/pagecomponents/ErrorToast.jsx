import React, {useState} from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';


function ErrorToast({errorMsg}){
    const [show,setShow] = useState(true);
    return(
    <ToastContainer position='top-end'>
    <Toast onClose={()=>{setShow(false);sessionStorage.clear()}} show={show} delay={3000} autohide bg='dark' postion='top-end'>
        <Toast.Header closeButton={true}>
            <strong className='me-auto'>Error</strong>
        </Toast.Header>
        <Toast.Body>{errorMsg}</Toast.Body>
       
    </Toast>
    </ToastContainer>
    )
}
export default ErrorToast;