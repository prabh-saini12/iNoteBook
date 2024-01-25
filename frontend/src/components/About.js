import React from 'react';
import '../Styles/About.css';

const About = (props) => {
	return (
		<div className="about-container">
			<h2 className="about-heading">About</h2>
			<p className="about-paragraph">
				iNotebook is a Web Application to Note Your Info.
				<ul className="about-list">
					<li>Add your note anytime you want</li>
					<li>Edit your note anytime you want</li>
					<li>Delete your note anytime you want</li>
					<li>Access your note from anywhere with your email and password</li>
					<li>Your notes are only accessible to you</li>
				</ul>
			</p>
		</div>
	);
};

export default About;
