import React, { useContext, useRef } from 'react';
import noteContext from '../context/noteContext/noteContext';

function DeleteNote(props) {
    const { deleteNote } = useContext(noteContext);
    const ref = useRef(null);

    const handleDelete = () => {
        deleteNote(props.note._id);
        ref.current.click(); // Close the modal after deleting the note
    };

    return (
        <>
            <div className="modal fade" id="deleteNoteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteNoteModalTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteNoteModalTitle">Delete Note</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this note?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                            <button ref={ref} data-bs-dismiss="modal" style={{ display: 'none' }}></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteNote;
