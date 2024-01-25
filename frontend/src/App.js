import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NoteState from './context/noteContext/NoteState';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDetails from './components/UserDetails';
import LoadingBar from 'react-top-loading-bar';
import GetNote from './components/GetNote';
import LandingPage from './components/LandingPage';


const App = () => {
	const [progress, setProgress] = useState(0);
	const [myAlert, setMyAlert] = useState({ isAlert: false });



	// Function to display an alert message
	const sendAlert = (message, type, confirm, id) => {
		setMyAlert({
			message,
			type,
			confirm,
			id,
			isAlert: true
		});
		if (!confirm) {
			setTimeout(removeAlert, 1000);
		}
	};

	const removeAlert = () => {
		setMyAlert({
			message: '',
			type: '',
			confirm: false,
			id: '',
			isAlert: false
		});
	};

	const updateLoading = (val) => {
		setProgress(val);
	};


	return (
		<Router>
			<NoteState updateLoading={updateLoading} sendAlert={sendAlert}>
				<Navbar />
				<LoadingBar color="blue" progress={progress} />
				{myAlert.isAlert && <Alert message={myAlert.message} type={myAlert.type} confirm={myAlert.confirm} removeAlert={removeAlert} id={myAlert.id} />}
				<div className="container">
					<Routes>
						<Route path="/home" element={<Home />} />
						<Route path="/login" element={<Login updateLoading={updateLoading} sendAlert={sendAlert} />} />
						<Route path="/signup" element={<Signup updateLoading={updateLoading} />} />
						<Route path="/about" element={<About />} />
						<Route path="/getnotes" element={<GetNote />} />
						<Route path="/" element={<LandingPage />} />
						<Route path="/userdetails" element={<UserDetails updateLoading={updateLoading} />} />

					</Routes>
				</div>
			</NoteState>
		</Router>
	);
};

export default App;



// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import NoteState from './context/noteContext/NoteState';
// import Navbar from './components/Navbar';
// import Alert from './components/Alert';
// import Home from './components/Home';
// import About from './components/About';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import UserDetails from './components/UserDetails';
// import LoadingBar from 'react-top-loading-bar';
// import GetNote from './components/GetNote';
// import LandingPage from './components/LandingPage';
// import EditNote from './components/EditNote';

// const App = () => {
// 	const [progress, setProgress] = useState(0);
// 	const [myAlert, setMyAlert] = useState({ isAlert: false });

// 	// Function to display an alert message
// 	const sendAlert = (message, type, confirm, id) => {
// 		setMyAlert({
// 			message,
// 			type,
// 			confirm,
// 			id,
// 			isAlert: true
// 		});
// 		if (!confirm) {
// 			setTimeout(removeAlert, 1000);
// 		}
// 	};

// 	const removeAlert = () => {
// 		setMyAlert({
// 			message: '',
// 			type: '',
// 			confirm: false,
// 			id: '',
// 			isAlert: false
// 		});
// 	};

// 	const updateLoading = (val) => {
// 		setProgress(val);
// 	};

// 	return (
// 		<Router>
// 			<NoteState updateLoading={updateLoading} sendAlert={sendAlert}>
// 				<Navbar />
// 				<LoadingBar color="blue" progress={progress} />
// 				{myAlert.isAlert && <Alert message={myAlert.message} type={myAlert.type} confirm={myAlert.confirm} removeAlert={removeAlert} id={myAlert.id} />}
// 				<div className="container">
// 					<Routes>
// 						<Route path="/home" element={<Home />} />
// 						<Route path="/login" element={<Login updateLoading={updateLoading} sendAlert={sendAlert} />} />
// 						<Route path="/signup" element={<Signup updateLoading={updateLoading} />} />
// 						<Route path="/about" element={<About />} />
// 						<Route path="/getnotes" element={<GetNote />} />
// 						<Route path="/edit/:noteId" element={<EditNote />} />
// 						<Route path="/" element={<LandingPage />} />
// 						<Route path="/userdetails" element={<UserDetails updateLoading={updateLoading} />} />
// 					</Routes>
// 				</div>
// 			</NoteState>
// 		</Router>
// 	);
// };

// export default App;