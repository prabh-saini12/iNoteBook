import React, { useContext, useEffect, useState, useRef } from 'react';
import NoteItem from './NoteItem';
import noteContext from '../context/noteContext/noteContext';
import EditNote from './EditNote';
import { useNavigate } from 'react-router-dom';

function GetNote() {
    const navigate = useNavigate();
    const { notes, getNotes, sendAlert } = useContext(noteContext);
    const [noteForEdit, setNoteForEdit] = useState({ title: "", description: "", tag: "" });
    const ref = useRef();

    useEffect(() => {
        const fetchData = async () => {
            if (!localStorage.getItem('auth-token')) {
                sendAlert("Please Login/Signup First", "danger");
                navigate('/login');
            } else {
                try {
                    await getNotes();
                } catch (err) {
                    sendAlert("Something Went Wrong, Please Login Again", "danger");
                    navigate('/login');
                }
            }
        };

        fetchData();
    }, [getNotes, navigate, sendAlert]);

    const updateNote = (note) => {
        ref.current.click();
        setNoteForEdit(note);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Your Notes</h2>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                {!notes || notes.length === 0 ? (
                    <div className="col text-center">
                        <p className="fs-4">No Notes Are Available</p>
                    </div>
                ) : (
                    notes.map((note, key) => (
                        <NoteItem key={key} note={note} updateNote={updateNote} />
                    ))
                )}
            </div>

            <button ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModalCenter" style={{ display: 'none' }}></button>
            <EditNote note={noteForEdit} />
        </div>
    );
}

export default GetNote;