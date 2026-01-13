import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPasswordAPI, resetPasswordAPI, userLoginAPI, userRegisterAPI, userVerifyOTPAPI, verifyresetOTPAPI } from '../Services/allAPIs'; 
import { toast } from 'react-toastify';
import '../Styles/admin-pages.css';

function Authorization({ insideRegister }) {
  const [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [userId, setUserId] = useState(null);
  const [otp, setOtp] = useState("");    
  const [isVerifying, setIsVerifying] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1); // 1: email, 2: otp, 3: new password
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [forgotPasswordUserId, setForgotPasswordUserId] = useState(null);
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div style={{ width: '100%', maxWidth: '420px', padding: '20px' }}>
          <div className="form-card" style={{ background: 'white', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f3460', marginBottom: '10px' }}>
                {isForgotPassword ? '🔑 Reset Password' : (insideRegister ? '🚀 Create Account' : '🔐 Welcome Back')}
              </h2>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>
                {isForgotPassword ? 'Enter your email to receive OTP' : (insideRegister ? 'Join us to manage your inventory' : 'Sign in to your account')}
              </p>
            </div>

            {!isForgotPassword && !isVerifying ? (
              <>
                {insideRegister &&
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label" style={{ fontWeight: '600', color: '#1f2937' }}>
                      <i className="fas fa-user me-2" style={{ color: '#667eea' }}></i>Username
                    </label>
                    <input
                      onChange={e => setRegistrationData({ ...registrationData, username: e.target.value })}
                      value={registrationData.username}
                      type="text"
                      className="modern-input"
                      id="name"
                      placeholder="Enter your username"
                      style={{ borderRadius: '8px', padding: '12px' }}
                    />
                  </div>
                }
                <div className="mb-3">
                  <label htmlFor="email" className="form-label" style={{ fontWeight: '600', color: '#1f2937' }}>
                    <i className="fas fa-envelope me-2" style={{ color: '#667eea' }}></i>Email Address
                  </label>
                  <input
                    onChange={e => setRegistrationData({ ...registrationData, email: e.target.value })}
                    value={registrationData.email}
                    type="email"
                    className="modern-input"
                    id="email"
                    placeholder="your@email.com"
                    style={{ borderRadius: '8px', padding: '12px' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label" style={{ fontWeight: '600', color: '#1f2937' }}>
                    <i className="fas fa-lock me-2" style={{ color: '#667eea' }}></i>Password
                  </label>
                  <input
                    onChange={e => setRegistrationData({ ...registrationData, password: e.target.value })}
                    value={registrationData.password}
                    type="password"
                    className="modern-input"
                    id="password"
                    placeholder="••••••••"
                    style={{ borderRadius: '8px', padding: '12px' }}
                  />
                </div>
                {!insideRegister && (
                  <div style={{ textAlign: 'right', marginBottom: '15px' }}>
                    <button 
                      onClick={() => setIsForgotPassword(true)} 
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#667eea', 
                        fontSize: '14px', 
                        cursor: 'pointer', 
                        fontWeight: '500',
                        textDecoration: 'underline'
                      }}
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}
                {insideRegister ?
                  <button onClick={handleRegister} className="modern-btn modern-btn-primary w-100" style={{ padding: '12px', fontSize: '16px', fontWeight: '600', borderRadius: '8px' }}>
                    <i className="fas fa-user-plus me-2"></i>Create Account
                  </button>
                  :
                  <button onClick={handleLogin} className="modern-btn modern-btn-primary w-100" style={{ padding: '12px', fontSize: '16px', fontWeight: '600', borderRadius: '8px' }}>
                    <i className="fas fa-sign-in-alt me-2"></i>Sign In
                  </button>
                }
                <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
                  {insideRegister ?
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>Already have an account? <Link to={'/login'} style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>Login</Link></p>
                    :
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>Don't have an account? <Link to={'/register'} style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>Sign up</Link></p>
                  }
                </div>
              </>
            ) : isForgotPassword && forgotPasswordStep === 1 ? (
              // Step 1: Request Password Reset - Email Input
              <>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <i className="fas fa-envelope-open-text" style={{ fontSize: '48px', color: '#667eea', marginBottom: '10px' }}></i>
                </div>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>
                  Enter your registered email address to receive an OTP
                </p>
                <div className="mb-3">
                  <label htmlFor="forgotEmail" className="form-label" style={{ fontWeight: '600', color: '#1f2937' }}>
                    <i className="fas fa-envelope me-2" style={{ color: '#667eea' }}></i>Email Address
                  </label>
                  <input
                    type="email"
                    className="modern-input"
                    id="forgotEmail"
                    placeholder="your@email.com"
                    value={forgotPasswordData.email}
                    onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, email: e.target.value })}
                    style={{ borderRadius: '8px', padding: '12px' }}
                  />
                </div>
                <button onClick={handleForgotPasswordRequest} className="modern-btn modern-btn-primary w-100" style={{ padding: '12px', fontSize: '16px', fontWeight: '600', borderRadius: '8px', marginBottom: '10px' }}>
                  <i className="fas fa-paper-plane me-2"></i>Send OTP
                </button>
                <button 
                  onClick={() => setIsForgotPassword(false)} 
                  className="modern-btn modern-btn-info w-100" 
                  style={{ padding: '12px', fontSize: '16px', fontWeight: '600', borderRadius: '8px' }}
                >
                  <i className="fas fa-arrow-left me-2"></i>Back to Login
                </button>
              </>
            ) : isForgotPassword && forgotPasswordStep === 2 ? (
              // Step 2: Verify OTP
              <>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <i className="fas fa-key" style={{ fontSize: '48px', color: '#667eea', marginBottom: '10px' }}></i>
                </div>
                <h3 style={{ color: '#1f2937', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>Verify OTP</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>
                  Enter the OTP sent to <strong>{forgotPasswordData.email}</strong>
                </p>
                <div className="mb-3">
                  <label htmlFor="forgotOtp" className="form-label" style={{ fontWeight: '600', color: '#1f2937' }}>
                    <i className="fas fa-mobile-alt me-2" style={{ color: '#667eea' }}></i>OTP Code
                  </label>
                  <input
                    type="text"
                    className="modern-input"
                    id="forgotOtp"
                    placeholder="Enter 6-digit OTP"
                    value={forgotPasswordData.otp}
                    onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, otp: e.target.value })}
                    style={{ borderRadius: '8px', padding: '12px', fontSize: '18px', letterSpacing: '2px', textAlign: 'center' }}
                  />
                </div>
                <button onClick={handleForgotPasswordOTPVerify} className="modern-btn modern-btn-success w-100" style={{ padding: '12px', fontSize: '16px', fontWeight: '600', borderRadius: '8px', marginBottom: '10px' }}>
                  <i className="fas fa-check me-2"></i>Verify OTP
                </button>
                <button 
                  onClick={() => {
                    setForgotPasswordStep(1);
                    setForgotPasswordData({ ...forgotPasswordData, otp: '' });
                  }} 
                  className="modern-btn modern-btn-info w-100" 
                  style={{ padding: '12px', fontSize: '16px', fontWeight: '600', borderRadius: '8px' }}
                >
                  <i className="fas fa-arrow-left me-2"></i>Back
                </button>
              </>
            ) : isForgotPassword && forgotPasswordStep === 3 ? (
              // Step 3: Reset Password
              <>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <i className="fas fa-lock" style={{ fontSize: '48px', color: '#667eea', marginBottom: '10px' }}></i>
                </div>
                <h3 style={{ color: '#1f2937', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>Create New Password</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>
                  Enter your new password to reset your account access
                </p>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label" style={{ fontWeight: '600', color: '#1f2937' }}>
                    <i className="fas fa-lock me-2" style={{ color: '#667eea' }}></i>New Password
                  </label>
                  <input
                    type="password"
                    className="modern-input"
                    id="newPassword"
                    placeholder="••••••••"
                    value={forgotPasswordData.newPassword}
                    onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, newPassword: e.target.value })}
                    style={{ borderRadius: '8px', padding: '12px' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label" style={{ fontWeight: '600', color: '#1f2937' }}>
                    <i className="fas fa-lock me-2" style={{ color: '#667eea' }}></i>Confirm Password
                  </label>
                  <input
                    type="password"
                    className="modern-input"
                    id="confirmPassword"
                    placeholder="••••••••"
                    value={forgotPasswordData.confirmPassword}
                    onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, confirmPassword: e.target.value })}
                    style={{ borderRadius: '8px', padding: '12px' }}
                  />
                </div>
                <button onClick={handleResetPassword} className="modern-btn modern-btn-success w-100" style={{ padding: '12px', fontSize: '16px', fontWeight: '600', borderRadius: '8px', marginBottom: '10px' }}>
                  <i className="fas fa-check-circle me-2"></i>Reset Password
                </button>
                <button 
                  onClick={() => {
                    setIsForgotPassword(false);
                    setForgotPasswordStep(1);
                    setForgotPasswordData({ email: "", otp: "", newPassword: "", confirmPassword: "" });
                    setForgotPasswordUserId(null);
                  }} 
                  className="modern-btn modern-btn-info w-100" 
                  style={{ padding: '12px', fontSize: '16px', fontWeight: '600', borderRadius: '8px' }}
                >
                  <i className="fas fa-arrow-left me-2"></i>Back to Login
                </button>
              </>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <i className="fas fa-key" style={{ fontSize: '48px', color: '#667eea', marginBottom: '10px' }}></i>
                </div>
                <h3 style={{ color: '#1f2937', fontWeight: 'bold', marginBottom: '10px' }}>Verify Your Email</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>
                  Enter the OTP sent to your email address to complete registration.
                </p>
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label" style={{ fontWeight: '600', color: '#1f2937' }}>
                    <i className="fas fa-mobile-alt me-2" style={{ color: '#667eea' }}></i>OTP Code
                  </label>
                  <input
                    type="text"
                    className="modern-input"
                    id="otp"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={{ borderRadius: '8px', padding: '12px', fontSize: '18px', letterSpacing: '2px', textAlign: 'center' }}
                  />
                </div>
                <button onClick={handleVerifyOTP} className="modern-btn modern-btn-success w-100" style={{ padding: '12px', fontSize: '16px', fontWeight: '600', borderRadius: '8px' }}>
                  <i className="fas fa-check me-2"></i>Verify OTP
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Authorization;