import React, { useContext, useState } from 'react';
import noteContext from '../context/noteContext/noteContext';
import '../Styles/AddNote.css'

function AddNote() {
    const { addNote, sendAlert } = useContext(noteContext);
    const [note, setNote] = useState({
        title: '',
        tag: '',
        description: '',
    });

    const handleAdding = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({
            title: '',
            tag: '',
            description: '',
        });
        sendAlert('Note Added Successfully', 'success');
    };

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="addnote-container active">
            <h1 className="addnote-header">Add A Note</h1>
            <form className="addnote-row" onSubmit={handleAdding}>
                <div className="addnote-row">
                    <label className="addnote-label" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="addnote-input"
                        onChange={handleChange}
                        type="text"
                        id="title"
                        name="title"
                        value={note.title}
                        placeholder="Enter Your Title"
                        required
                    />
                </div>
                <div className="addnote-row">
                    <label className="addnote-label" htmlFor="description">
                        Description
                    </label>
                    <input
                        className="addnote-input"
                        onChange={handleChange}
                        type="text"
                        id="description"
                        name="description"
                        value={note.description}
                        placeholder="Enter Your Description"
                        required
                    />
                </div>
                <div className="addnote-row">
                    <label className="addnote-label" htmlFor="tag">
                        Tag
                    </label>
                    <input
                        className="addnote-input"
                        onChange={handleChange}
                        type="text"
                        id="tag"
                        name="tag"
                        value={note.tag}
                        placeholder="Enter Your Tag"
                    />
                </div>
                <button className="addnote-button" type="submit">
                    Add Note
                </button>
            </form>
        </div>
    );
}

export default AddNote;
