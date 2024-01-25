import React, { useContext } from 'react';
import noteContext from '../context/noteContext/noteContext';
import { useNavigate } from 'react-router-dom';
import "../Styles/Alert.css";  

const Alert = (props) => {
    const { deleteNote, setNotes } = useContext(noteContext);
    const navigate = useNavigate();

    const handleYes = async () => {
        if (props.id === 'logout') {
            localStorage.removeItem('auth-token');
            setNotes([]);
            navigate('/login');
        } else {
            deleteNote(props.id);
        }

        const body = document.querySelector('body');
        body.style.overflowY = 'scroll';
        props.removeAlert();
    }

    const handleNo = () => {
        const body = document.querySelector('body');
        body.style.overflowY = 'scroll';
        props.removeAlert();
    }

    return (
        <div className={`custom-alert custom-alert-${props.type}`} role="alert">
            <strong>{props.message}</strong>
            {props.confirm &&
                <>
                    <br />
                    <button onClick={handleYes} className="custom-btn custom-yes">Yes</button>
                    <button onClick={handleNo} className="custom-btn custom-no">No</button>
                </>
            }
        </div>
    )
}

export default Alert;