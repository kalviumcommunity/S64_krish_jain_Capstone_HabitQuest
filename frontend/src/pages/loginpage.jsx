import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.png"
import { loginUser } from '../utils/api';


const LoginPage = () => {
  const navigate = useNavigate();
  // State to track which form is currently active
  const [activeForm, setActiveForm] = useState('login');
  // Form data states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const modalRefs = useRef({});

  // Check if passwords match whenever they change
  useEffect(() => {
    if (newPassword || confirmPassword) {
      setPasswordsMatch(newPassword === confirmPassword);
    }
  }, [newPassword, confirmPassword]);

  // Reset all password-related fields
  const resetPasswordFields = () => {
    setNewPassword('');
    setConfirmPassword('');
    setResetCode('');
    setPasswordsMatch(true);
  };

  // Handle form transitions
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setActiveForm('recover');
  };

  const handleSendRecovery = (e) => {
    e.preventDefault();
    setActiveForm('resetCode');
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setActiveForm('resetPassword');
  };

  const handleReturnToLogin = (e) => {
    e.preventDefault();
    setActiveForm('login');
    resetPasswordFields();
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!passwordsMatch) return;
    // Here you would typically handle the password update logic
    setActiveForm('login');
    resetPasswordFields();
  };

  const handleContinueQuest = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginUser(email, password);
      // Redirect to dashboard on successful login
      navigate('/dashboard');
    } catch (error) {
      // Display the error message directly from the backend
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueWithGoogle = (e) => {
    e.preventDefault();
    // Handle Google login logic here
    console.log('Continuing with Google');
  };

  // Determine if we should show the overlay with blur effect
  const showOverlay = activeForm !== 'login';

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // If we have an active form other than login and the click is outside the modal
      if (activeForm !== 'login' && 
          modalRefs.current[activeForm] && 
          !modalRefs.current[activeForm].contains(event.target)) {
        setActiveForm('login');
        resetPasswordFields();
      }
    };

    if (showOverlay) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [activeForm]);

  return (
    <>
    
      <header className={`fixed top-0 left-0 right-0 container mx-auto px-4 py-4 flex justify-between items-center ${showOverlay ? 'filter blur-[2px] pointer-events-none' : ''}`}>
        <Link to="/">
  <div className="flex items-center">
    <div className="w-8 h-8 flex items-center justify-center mr-2">
      <img src={Logo} alt="HabitQuest Logo" />
    </div>
    <span className="text-purple-600 font-bold text-xl">HabitQuest</span>
  </div>
  </Link>
</header>
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      
      <div className="w-full max-w-md">
        
        {/* Main login form */}
        <div className={`bg-white rounded-[24px] shadow-lg p-8 relative ${showOverlay ? 'filter blur-[3px] pointer-events-none' : ''} hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300`}>
          <h2 className="text-2xl font-bold text-center mb-2">Welcome back, Hero!</h2>
          <p className="text-center text-gray-600 mb-6">Continue your quest for better habits</p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleContinueQuest}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Quest Scroll (Email)</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Secret Spell (Password)</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            <button 
              type="submit" 
              className={`w-full bg-purple-600 text-white py-2 px-4 rounded-full font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700 hover:shadow-md active:transform active:scale-95 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Embarking...' : 'Continue Quest'}
            </button>
            
            <button 
              type="button" 
              className="w-full text-purple-600 text-sm text-center hover:underline mb-6"
              onClick={handleForgotPassword}
            >
              Forgot your password?
            </button>
            
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <button 
              type="button" 
              className="w-full border border-gray-300  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center rounded-full py-2 px-4 text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-300"
              onClick={handleContinueWithGoogle}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z" />
                <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z" />
                <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z" />
                <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z" />
              </svg>
              Continue with Google
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              New to HabitQuest? 
              <Link to="/signup" className="ml-1 text-purple-600 hover:underline">
                Start your journey
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Overlay forms for password recovery flow */}
      {activeForm === 'recover' && (
        <div className="fixed inset-0 flex items-center justify-center z-10 p-4">
          <div 
              ref={el => modalRefs.current['recover'] = el}
              className="bg-white rounded-[24px] shadow-lg p-8 w-full max-w-md"
            >
            <h2 className="text-2xl font-bold text-center mb-2">Recover Your Quest</h2>
            <p className="text-center text-gray-600 mb-6">Enter your quest scroll to receive recovery instructions</p>
            
            <form onSubmit={handleSendRecovery}>
              <div className="mb-6">
                <label htmlFor="recovery-email" className="block text-sm font-medium text-gray-700 mb-1">Quest Scroll (Email)</label>
                <input 
                  type="email" 
                  id="recovery-email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mb-4"
              >
                Send Recovery Instructions
              </button>
              
              <button 
                type="button" 
                className="w-full text-purple-600 text-sm text-center hover:underline"
                onClick={handleReturnToLogin}
              >
                Return to Login
              </button>
            </form>
          </div>
        </div>
      )}

      {activeForm === 'resetCode' && (
        <div className="fixed inset-0 flex items-center justify-center z-10 p-4">
          <div 
              ref={el => modalRefs.current['resetCode'] = el}
              className="bg-white rounded-[24px] shadow-lg p-8 w-full max-w-md"
            >
            <h2 className="text-2xl font-bold text-center mb-2">Enter Reset Code</h2>
            <p className="text-center text-gray-600 mb-6">Enter the 6-digit code sent to your quest scroll</p>
            
            <form onSubmit={handleVerifyCode}>
              <div className="mb-6">
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-center tracking-widest text-lg"
                  placeholder="• • • • • •"
                  maxLength="6"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value.replace(/[^0-9]/g, ''))}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mb-4"
              >
                Verify Code
              </button>
              
              <button 
                type="button" 
                className="w-full text-purple-600 text-sm text-center hover:underline"
              >
                Resend Code
              </button>
            </form>
          </div>
        </div>
      )}

      {activeForm === 'resetPassword' && (
        <div className="fixed inset-0 flex items-center justify-center z-10 p-4">
          <div 
              ref={el => modalRefs.current['resetPassword'] = el}
              className="bg-white rounded-[24px] shadow-lg p-8 w-full max-w-md"
            >
            <h2 className="text-2xl font-bold text-center mb-2">Reset Your Password</h2>
            <p className="text-center text-gray-600 mb-6">Choose a strong password for your quest</p>
            
            <form onSubmit={handleUpdatePassword}>
  <div className="mb-4 relative"> 
    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">New Secret Spell (Password)</label>
    <input 
      type={showNewPassword ? "text" : "password"} 
      id="new-password" 
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      placeholder="Enter new password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      required
    />
    <button 
      type="button"
      className="absolute inset-y-11 right-0 pr-3 flex items-center"
      onClick={() => setShowNewPassword(!showNewPassword)}
    >
      {showNewPassword ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  </div>
  
  <div className="mb-6 relative"> 
  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm Secret Spell</label>
  <input 
    type={showConfirmPassword ? "text" : "password"} 
    id="confirm-password" 
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
    placeholder="Confirm new password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
  />
  <button 
    type="button"
    className="absolute inset-y-11 right-0 pr-3 flex items-center"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  >
    {showConfirmPassword ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
      </svg>
    )}
  </button>
  {!passwordsMatch && newPassword && confirmPassword && (
    <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
  )}
</div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h3>
                <ul className="space-y-1">
                  <li className="flex items-center text-sm">
                    <svg className="h-4 w-4 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    At least 8 characters
                  </li>
                  <li className="flex items-center text-sm">
                    <svg className="h-4 w-4 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    One uppercase letter
                  </li>
                  <li className="flex items-center text-sm">
                    <svg className="h-4 w-4 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    One number
                  </li>
                  <li className="flex items-center text-sm">
                    <svg className="h-4 w-4 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    One special character (!@#$%^&*)
                  </li>
                </ul>
              </div>
              
              <button 
                type="submit" 
                className={`w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${!passwordsMatch ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!passwordsMatch}
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default LoginPage;