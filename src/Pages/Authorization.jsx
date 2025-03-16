import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userLoginAPI, userRegisterAPI, userVerifyOTPAPI } from '../Services/allAPIs'; 
import { toast } from 'react-toastify';

function Authorization({ insideRegister }) {
  const [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [userId, setUserId] = useState(null);
  const [otp, setOtp] = useState("");    
  const [isVerifying, setIsVerifying] = useState(false); 
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (registrationData.username && registrationData.email && registrationData.password) {
      try {
        const result = await userRegisterAPI(registrationData);

        if (result.status === 200) {

          setUserId(result.data.userId); 
          setIsVerifying(true);
          toast.success('Registration Successful! Please check your email for the OTP.');
        } else {
          if (result.status === 406) {
            toast.warning(result.response.data);
          } else {
            toast.error('Registration Failed. Please try again.');
          }
        }
      } catch (err) {
        console.error("Registration error:", err);
        toast.error('An error occurred during registration.');
      }
    } else {
      toast.warning('Please Enter All Fields...');
    }
  };

  const handleVerifyOTP = async () => {
    if (otp && userId) {
      try {
        const verificationData = { userId: userId, otp: otp }; 
        const result = await userVerifyOTPAPI(verificationData); 
        console.log("Verification result:", result);

        if (result.status === 200) {

          toast.success(result.data.message);  
          setUserId(null);        
          setOtp("");            
          setIsVerifying(false);  
          setRegistrationData({username:"",email:"",password:""})
          navigate('/login');     
        } else {
          toast.error(result.response.data.message || 'OTP Verification Failed'); 
        }
      } catch (err) {
        console.error("OTP verification error:", err);
        toast.error('An error occurred during OTP verification.'); 
      }
    } else {
      toast.warning('Please Enter the OTP.'); 
    }
  };

  const handleLogin = async () => {
    if (registrationData.email && registrationData.password) {
      try {
        const result = await userLoginAPI(registrationData);
        console.log(result);
        if (result.status === 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          sessionStorage.setItem("token", result.data.token);
          if (result.data.user.role === 'Admin') {
            navigate('/dashboardAdmin');
          } else {
            navigate('/dashboardUser');
          }
        } else {
          if (result.status === 404) {
            toast.error(result.response.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.warning('Fields Cannot Be Empty');
    }
  };

  return (
    <>
      <div className="container" style={{ maxWidth: '400px', marginTop: "100px" }}>
        <div className="card">
          <div className="card-body">

            {!isVerifying ? (
              <>
                <h2 className="card-title fw-bold mb-3">Login</h2>
                <p className="card-text text-muted mb-4">
                  Enter your email below to login to your account
                </p>
                {insideRegister &&
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-bold">
                      User Name
                    </label>
                    <input
                      onChange={e => setRegistrationData({ ...registrationData, username: e.target.value })}
                      value={registrationData.username}
                      type="name"
                      className="form-control"
                      id="name"
                      placeholder="Username..."
                    />
                  </div>
                }
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">
                    Email
                  </label>
                  <input
                    onChange={e => setRegistrationData({ ...registrationData, email: e.target.value })}
                    value={registrationData.email}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="abc@example.com"
                  />
                </div>
                <div className="mb-2 d-flex justify-content-between align-items-center">
                  <label htmlFor="password" className="form-label fw-bold">
                    Password
                  </label>
                </div>
                <input
                  onChange={e => setRegistrationData({ ...registrationData, password: e.target.value })}
                  value={registrationData.password}
                  type="password"
                  className="form-control"
                  id="password"
                />
                {insideRegister ?
                  <button onClick={handleRegister} className="btn btn-dark w-100 mt-3">Register</button>
                  :
                  <button onClick={handleLogin} className="btn btn-dark w-100 mt-3">Login</button>
                }
                {insideRegister ?
                  <p className="mt-4 text-center"> Already have an account? <Link to={'/login'}>Login</Link></p>
                  :
                  <p className="mt-4 text-center">Don't have an account? <Link to={'/register'}>Sign up</Link> </p>
                }
              </>
            ) : (
              <>
                <h2 className="card-title fw-bold mb-3">Verify OTP</h2>
                <p className="card-text text-muted mb-4">
                  Enter the OTP sent to your email address to complete registration.
                </p>
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label fw-bold">
                    OTP
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <button onClick={handleVerifyOTP} className="btn btn-dark w-100 mt-3">Verify OTP</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Authorization;