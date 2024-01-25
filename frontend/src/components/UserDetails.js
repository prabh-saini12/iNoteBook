import React, { useState, useEffect } from 'react';
import '../Styles/UserDetail.css';

const host = process.env.REACT_APP_HOST;

function UserDetails(props) {
  const [data, setData] = useState({});

  const getDetails = async () => {
    props.updateLoading(10);
    try {
      props.updateLoading(20);
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST",
        headers: { 'auth-token': localStorage.getItem('auth-token') }
      });
      props.updateLoading(50);
      const userData = await response.json();
      props.updateLoading(80);

      setData({
        name: userData.name,
        email: userData.email,
        signupDate: new Date(userData.createdAt).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      });

      props.updateLoading(100);
    } catch (err) {
      console.log(err.message);
      props.updateLoading(100);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="user-details-wrapper">
      <div className="user-details-card">
        <h2>My Details</h2>
        <div className="user-details-info">
          <h2><span>Name:</span>{data.name ? data.name : "Loading"}</h2>
          <p><span>Email:</span> {data.email ? data.email : "Loading"}</p>
          <p><span>Signup On:</span> {data.signupDate ? data.signupDate : "Loading"}</p>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
