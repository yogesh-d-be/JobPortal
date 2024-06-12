import React, { useEffect, useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faMobile } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/register.css';

function Register(){
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    const handleSignUp = () => {
        setIsSignedUp(!isSignedUp);
    }

    const validation = (elements) => {
      const name = elements.name.value.trim();
      const email = elements.email.value.trim();
      const mobileNumber = elements.MobileNumber.value.trim();
      const password = elements.password.value.trim();
      
      if (name === "") {
        toast.error("Enter Your Name");
        return false;
      } else if (email === "") {
        toast.error("Enter Your Email");
        return false;
      } else if (!email.includes("@") || !email.includes(".")) {
        toast.error("Enter a Valid Email");
        return false;
      } else if (mobileNumber === "") {
        toast.error("Enter Your Mobile Number");
        return false;
      } else if (mobileNumber.length !== 10 || isNaN(mobileNumber)) {
        toast.error("Enter a Valid Mobile Number");
        return false;
      } else if (password === "") {
        toast.error("Enter Your Password");
        return false;
      }
      return true;
    };

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleRegister = async (event) => {
      event.preventDefault();
      const elements = event.target.elements;
      if (!validation(elements)) return;

      const { name, email, MobileNumber, password } = elements;

      try {
        const response = await axios.post(`${apiUrl}/userregister`, {
          name: name.value,
          email: email.value,
          MobileNumber: MobileNumber.value,
          password: password.value,
        });

        if (response.status === 201) {
          toast.success('Registration successful!');
          event.target.reset();  
          handleSignUp();
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          toast.error('User already exists');
        } else {
          toast.error('Registration failed. Please try again.');
        }
        console.error('Error during registration', error);
      }
    };

    const handleLogin = async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      if (!email.value.trim() || !password.value.trim()) {
        toast.error('Please fill in all fields');
        return;
      }
      try {
        const response = await axios.post(`${apiUrl}/userlogin`, {
          email: email.value,
          password: password.value,
        });
        toast.success('Login successful!');
        const receivedToken = response.data.data;
        setToken(receivedToken);  
        localStorage.setItem("token", receivedToken);
        console.log('Login successful', response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error('You are not registered, please register first!');
        } else if (error.response && error.response.status === 401) {
          toast.error('Password doesn\'t match, please try again!');
        } else {
          toast.error('Error during login. Please try again.');
        }
        
        console.error('Login failed', error);
      }
    };

    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        console.log("token",token)
      }
     
    }, [token]);

    return (
        <>
          <ToastContainer />
          <div className={`container ${isSignedUp ? "sign-up-mode" : ''}`}>
              <div className="forms-container">
                  <div className="signin-signup">
                      <form className="sign-in-form" onSubmit={handleLogin}>
                          <div className="form-field">
                              <h2 className="title">Sign In</h2>
                              <div className="input-field">
                                  <span className=""><FontAwesomeIcon icon={faEnvelope} /></span>
                                  <input type="text" name="email" placeholder="Email ID" />
                              </div>
                              <div className="input-field">
                                  <span className=""><FontAwesomeIcon icon={faLock} /></span>
                                  <input type="password" name="password" placeholder="Password" />
                              </div>
                              <div className="text-center">
                                  <input type="submit" value="Login" className="btn"/>
                                  {/* <p className="form-b-content text-gray-600 hover:text-blue-700 hover:font-bold pass">Forgot Password?</p> */}
                                  <p className="form-b-content text-gray-600">Create Account? <span onClick={handleSignUp} className="text-blue-700 font-bold">Sign Up</span></p>
                              </div>
                          </div>
                      </form>

                      <form className="sign-up-form" onSubmit={handleRegister}>
                          <div className="form-field up">
                              <h2 className="title">Sign Up</h2>
                              <div className="input-field">
                                  <span className=""><FontAwesomeIcon icon={faUser} /></span>
                                  <input type="text" name="name" placeholder="Fullname" />
                              </div>
                              <div className="input-field">
                                  <span className=""><FontAwesomeIcon icon={faEnvelope} /></span>
                                  <input type="text" name="email" placeholder="Email ID" />
                              </div>
                              <div className="input-field">
                                  <span className=""><FontAwesomeIcon icon={faMobile} /></span>
                                  <input type="text" name="MobileNumber" placeholder="Mobile Number" />
                              </div>
                              <div className="input-field">
                                  <span className=""><FontAwesomeIcon icon={faLock} /></span>
                                  <input type="password" name="password" placeholder="Password" />
                              </div>
                              <div className="text-center">
                                  <input type="submit" value="Register" className="btn"/>
                                  <p className="form-b-content text-gray-600">Already have an Account? <span onClick={handleSignUp} className="text-blue-700 font-bold">Sign In</span></p>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>

              <div className="panel-container">
                  <div className={`panel left-panel ${isSignedUp ? '' : 'active'}`}>
                      <div className="content">
                          <h2>New Here?</h2>
                          <p>Welcome to our job portal! 🌟 Sign Up and explore a world of possibilities!</p>
                          <button onClick={handleSignUp} className="btn-s" id="sign-up-btn">Sign Up</button>
                      </div>
                      <img src={require('../assets/career_progres.png')} alt="career" className="image" />
                  </div>

                  <div className={`panel right-panel ${isSignedUp ? 'active' : ''}`}>
                      <div className="content">
                          <h2>One Of Us?</h2>
                          <p>Welcome back! 🌟 Explore new opportunities, connect with employers, and take your career to the next level. Let’s find your dream job together!</p>
                          <button onClick={handleSignUp} className="btn-s" id="sign-in-btn">Sign In</button>
                      </div>
                      <img src={require('../assets/Job_hunt.png')} alt="pick career" className="image" />
                  </div>
              </div>
          </div>
        </>
    )
}

export default Register;
