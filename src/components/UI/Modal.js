import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const portalElement = document.getElementById('overlays');

export const Backdrop = (props) => {
    return <div onClick={props.onClose} className={classes.backdrop}></div>
}

const Modal = props => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
            {ReactDOM.createPortal(
                <div className={classes.modal}>
                    {props.children}
                </div>,
                portalElement
            )}
            
        </>
    )
}

export default Modal;