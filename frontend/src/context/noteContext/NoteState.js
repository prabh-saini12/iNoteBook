import { useState } from "react";
import noteContext from "./noteContext";
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
  const { sendAlert, updateLoading } = props;
  const host = process.env.REACT_APP_HOST

  	//useNavigate To Navigate into different page
	const navigate = useNavigate();


  const apiCall = async (method, url, bodyData) => {
    let response;
    try {
      if (method === "GET" || method === "DELETE") {
        response = await fetch(`${host}${url}`, {
          method,
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('auth-token')
          }
        });
      } else {
        response = await fetch(`${host}${url}`, {
          method,
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('auth-token'),
          },
          body: JSON.stringify(bodyData)
        });
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      sendAlert("Something Went Wrong!!!", "danger");
    }
  }

  const [notes, setNotes] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const loginUser = async (email, password) => {
    try {
      const response = await apiCall("POST", "/api/auth/login", { email, password });
      if (!response.authtoken) {
        sendAlert(response[0].msg, 'danger');
      } else {
        localStorage.setItem('auth-token', response.authtoken);
        console.log(localStorage.getItem('auth-token'));
        setLoggedIn(true);
        sendAlert('Login Successfully', 'success');
        navigate('/home')
      }
    } catch (err) {
      sendAlert('Something Went Wrong!!!', 'danger');
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('auth-token');
    setLoggedIn(false);
    sendAlert('Logged out Successfully', 'success');
  };


  //Add A Note
  const addNote = async (title, description, tag) => {
    props.updateLoading(10);
    try {
      props.updateLoading(20);
      if (!(title && description))
        sendAlert("Please Enter Data", 'primary', false);
      else if (title.length < 3)
        sendAlert("Title Should Have Minimum Length 3", 'primary', false);
      else if (description.length < 5)
        sendAlert("Description Should Have Minimum Length 5", 'primary', false);
      else {
        props.updateLoading(40);
        const response = await apiCall("POST", "/api/notes/addnotes", { title, description, tag });
        props.updateLoading(60);
        console.log(response);
        if (!response.user)
          sendAlert(response, 'secondary');
        else {
          props.updateLoading(80);
          //created a temp to store notes
          let temp = notes;
          if (!temp)
            temp = [];
          temp.push({ title, tag, description, "date": Date.now() });
          setNotes(temp);
          sendAlert("Note Added Successfully", "success");
          props.updateLoading(100);
        }
      }
    } catch (err) {
      console.log(err);
      sendAlert("Something Went Wrong!!!", "danger");
    }
    props.updateLoading(100);
  }

  //Get All Note
  const getNotes = async () => {
    props.updateLoading(10);
    try {
      props.updateLoading(20);
      const notes = await apiCall("GET", "/api/notes/fetchallnotes", "");
      props.updateLoading(60);
      setNotes(notes);
      props.updateLoading(80);
    } catch (err) {
      sendAlert("Something Went Wrong!!!", "danger");
    }
    props.updateLoading(100);
  }

  //Edit A Note
  const editNote = async (id, title, description, tag) => {
    props.updateLoading(10);
    try {
      props.updateLoading(20);
      if (!(title && description))
        sendAlert("Please Enter Data", 'primary', false);
      else if (title.length < 3)
        sendAlert("Title Should Have Minimum Length 3", 'primary', false);
      else if (description.length < 5)
        sendAlert("Description Should Have Minimum Length 5", 'primary', false);
      else {
        props.updateLoading(40);
        let response = await apiCall("PUT", `/api/notes/updatenotes/${id}`, { title, description, tag });
        props.updateLoading(60);
        if (!response.user) {
          alert(response);
        } else {
          props.updateLoading(80);
          let newNote = JSON.parse(JSON.stringify(notes));
          for (let i = 0; i < newNote.length; i++) {
            if (newNote[i]._id === id) {
              newNote[i].title = title;
              newNote[i].description = description;
              newNote[i].tag = tag;
              break;
            }
          }
          props.updateLoading(90);
          setNotes(newNote);
          props.updateLoading(100);
          sendAlert("Note Updated Successfully", "success");
        }
      }
    } catch (err) {
      sendAlert("Something Went Wrong!!!", "danger");
    }
    props.updateLoading(100);
  }

  //Delete A Note
  const deleteNote = async (id) => {
    props.updateLoading(10);
    try {
      props.updateLoading(20);
      await apiCall("DELETE", `/api/notes/deletenotes/${id}`, "");
      props.updateLoading(40);
      const newNote = notes.filter((note) => { return note._id !== id });
      props.updateLoading(60);
      setNotes(newNote);
      props.updateLoading(80);
      sendAlert("Note Deleted Successfully", "success");
      props.updateLoading(100);
    } catch (err) {
      sendAlert("Something Went Wrong!!!", "danger");
    }
    props.updateLoading(100);
  }

  return (
    <noteContext.Provider
      value={{
        notes,
        getNotes,
        addNote,
        editNote,
        deleteNote,
        sendAlert,
        setNotes,
        isLoggedIn,
        loginUser,
        logoutUser,
        updateLoading, // Pass updateLoading to context
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
export { noteContext };