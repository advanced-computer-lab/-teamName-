import React ,{useState , useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import './modal.css'
const Modalitem = (props) => {
    
    return (
        <React.Fragment>

            <Modal show={props.show} onHide={()=> props.close()} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.children}</Modal.Body>
                
            </Modal>

        </React.Fragment>
    )
}

export default Modalitem
