import React, { useContext } from 'react';
import noteContext from '../context/noteContext/noteContext';

function NoteItem(props) {
    const { sendAlert } = useContext(noteContext);

    const handleDelete = () => {
        const body = document.querySelector('body');
        body.style.overflowY = 'hidden';
        sendAlert("Confirm Deleting The Note?", "danger", true, props.note._id);
    };

    const formatDate = (timestamp) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        return new Date(timestamp).toLocaleString('en-US', options);
    };

    return (
        <>
            <div className="card col-md-4 m-3 shadow" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title mb-3">Title: {props.note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Tag: {props.note.tag}</h6>
                    <p className="card-text mb-3">Description: {props.note.description}</p>
                    <p className="card-text">
                        <small className="text-muted">Added On: {formatDate(props.note.createdAt)}</small>
                        {props.note.updatedAt && <span>, Updated On: {formatDate(props.note.updatedAt)}</span>}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                        <button className="btn btn-primary btn-sm" onClick={() => { props.updateNote(props.note) }}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NoteItem;