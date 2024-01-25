import React, { useState, useContext } from 'react';
import noteContext from '../context/noteContext/noteContext';
import { useNavigate } from 'react-router-dom';
import '../Styles/Signup.css';

const host = process.env.REACT_APP_HOST;

function Signup(props) {
  const navigate = useNavigate();
  const { sendAlert } = useContext(noteContext);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const handleSubmit = async (e) => {
    props.updateLoading(10);
    e.preventDefault();
    try {
      props.updateLoading(30);
      if (data.password === data.cpassword) {
        props.updateLoading(40);
        let response = await fetch(`${host}/api/auth/createuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
        });
        props.updateLoading(60);
        response = await response.json();
        props.updateLoading(80);
        if (!response.authtoken) {
          if (response.Error) sendAlert(response.Error[0].msg, 'danger');
          else if (response[0].msg) sendAlert(response[0].msg, 'danger');
          else sendAlert('Please Enter Valid Data', 'danger');
        } else {
          props.updateLoading(90);
          sendAlert(response.msg, 'success');
          props.updateLoading(100);
          navigate('/login');
        }
      } else {
        sendAlert('Password and Confirm Password Should Be Same!!!', 'danger');
      }
    } catch (err) {
      sendAlert('Something Went Wrong!!!', 'danger');
    }
    props.updateLoading(100);
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className='signup-container active'>
      <h1 className="signup-header">Sign Up To iNotebook To Note Your data</h1>
      <form className="signup-row" onSubmit={handleSubmit}>
        <div className="signup-row">
          <label className="signup-label" htmlFor="name">
            Name
          </label>
          <input
            className="signup-input"
            value={data.name}
            onChange={onChange}
            placeholder="Enter Your Name"
            type="text"
            id="name"
            name="name"
          />
        </div>
        <div className="signup-row">
          <label className="signup-label" htmlFor="emailForSignUp">
            Email address
          </label>
          <input
            className="signup-input"
            value={data.email}
            onChange={onChange}
            placeholder="Enter Your Email"
            type="email"
            id="emailForSignUp"
            name="email"
          />
        </div>
        <div className="signup-row">
          <label className="signup-label" htmlFor="password">
            Password
          </label>
          <input
            className="signup-input"
            value={data.password}
            onChange={onChange}
            placeholder="Enter Your Password"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="signup-row">
          <label className="signup-label" htmlFor="cpassword">
            Confirm Password
          </label>
          <input
            className="signup-input"
            value={data.cpassword}
            onChange={onChange}
            placeholder="Enter Your Password"
            type="password"
            name="cpassword"
            id="cpassword"
          />
        </div>
        <button className="signup-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;