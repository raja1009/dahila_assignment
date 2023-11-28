import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { AES, enc } from 'crypto-js';
import CryptoJS from 'crypto-js'
import * as Yup from 'yup';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleLogin = async (e) => {

    const payload = {
      email: email,
      password: password
    }


    // navigate('/home')
    console.log(payload)
    const plaintextString = JSON.stringify(payload)

    const apiUrl = 'https://devadmin.altabooking.com/api/v2/auth/login';
    const apiKey = 'indusAltaR2PSM';
    const encryptionKey = 'aLtAeNCrypT';
    const cipherText = CryptoJS.AES.encrypt(plaintextString
      , encryptionKey);

    console.log("cipherText", cipherText.toString())

    // Set up headers
    const headers = {
      apikey: apiKey,
      currency: 'U2FsdGVkX1/O0sFe9FnokQdTBRP/rRIlcPZEWbzHL9ncZwZzp/Fu/2Jnt0z8ukCA LQNDRknKwa5WdmjDRC2XA2a0gz/ZfvHeYTIq7fBZi9P4kQ7KvQYueLB2Rl4puqOTSQyBs bLGPc8cQ9KDZLMVapCruTsJcGzRnaOo1CZksLPMzmNOPqe+ePZk6UJiAUmoDS6p4JvL Cmpe0RATiqDh7g==',
    };

    try {
      const response = await axios.post(apiUrl, {
        request_data: cipherText.toString(),
      }, { headers });
      console.log("response", response)
      if (response.data.main_data.res_code === 200) {
        navigate('/home')
      }
      else {

      }

    } catch (error) {
      // Handle errors
      return toast.error("This trailer has already been dedicated for these dates", "Error");


    }
    // 
  }



  return (
    <>
      <ToastContainer position="top-right" theme="colored" />

      <div className="container">
        <div className='loginpage'>
          <div class="col-lg-8">
            <div class="card-body py-5 px-md-5">
              <h2>Login</h2>

              <form>

                <div class="form-outline mb-4">
                  <input type="email" id="form2Example1" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <label class="form-label" for="form2Example1">Email address</label>
                </div>


                <div class="form-outline mb-4">
                  <input type="password" id="form2Example2" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <label class="form-label" for="form2Example2">Password</label>
                </div>
                < Button variant="primary" size="lg" onClick={(e) => handleLogin(e)} >
                  login
                </Button>

              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login