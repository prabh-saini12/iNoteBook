import React, { useContext, useRef } from 'react';
import noteContext from '../context/noteContext/noteContext';
import '../Styles/DeleteNote.css'

function DeleteNote(props) {
    const { deleteNote } = useContext(noteContext);
    const ref = useRef(null);

    const handleDelete = () => {
        deleteNote(props.note._id);
        ref.current.click(); 
    };

    return (
        <>
            <div className="delete-note-modal" id="deleteNoteModal">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete Note</h5>
                            <span className="close" data-bs-dismiss="modal" aria-label="Close" onClick={() => ref.current.click()}>&times;</span>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this note?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn-secondary" data-bs-dismiss="modal" onClick={() => ref.current.click()}>Cancel</button>
                            <button type="button" className="btn-danger" onClick={handleDelete}>Delete</button>
                            <button ref={ref} data-bs-dismiss="modal" style={{ display: 'none' }}></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteNote;
