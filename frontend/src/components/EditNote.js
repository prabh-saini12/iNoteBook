import React, { useState, useContext, useEffect, useRef } from 'react';
import noteContext from '../context/noteContext/noteContext';

function EditNote(props) {
    const ref = useRef(null);
    const [note, setNote] = useState(props.note);
    const { editNote } = useContext(noteContext);

    useEffect(() => {
        setNote(props.note);
    }, [props.note]);

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleEdit = () => {
        editNote(note._id, note.title, note.description, note.tag);
        if (note.title.length >= 3 && note.description.length >= 5)
            ref.current.click();
    }

    return (
        <>
            <div className="custom-edit-modal fade" id="customEditModal" tabIndex="-1" role="dialog" aria-labelledby="customEditModalTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content custom-edit-modal-content">
                        <div className="modal-header custom-edit-modal-header">
                            <h5 className="modal-title" id="customEditModalTitle">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body custom-edit-modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label fs-5">New Title</label>
                                <input
                                    onChange={handleChange}
                                    value={note.title}
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    placeholder="Enter Your Title"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label fs-5">New Description</label>
                                <textarea
                                    onChange={handleChange}
                                    value={note.description}
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    placeholder="Enter Your Description"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label fs-5">New Tag</label>
                                <input
                                    onChange={handleChange}
                                    value={note.tag}
                                    type="text"
                                    className="form-control"
                                    id="tag"
                                    name="tag"
                                    placeholder="Enter Your Tag"
                                />
                            </div>
                        </div>
                        <div className="modal-footer custom-edit-modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleEdit}>Save changes</button>
                            <button ref={ref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditNote;
