import React, { useState,useCallback, useReducer } from 'react';

import Input from './LoginInputs.js'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../SharedComponents/Utils/validators';
import './Home.css';
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux'
import {login} from '../../Lib/auth.js'
import {Container,Alert} from 'react-bootstrap';


const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};

const LoginPage = () => {
  const [variant,setVariant] = useState();
  const [message,setMessage] = useState();
  const token = useSelector((state) => state.auth.token)
  const d= useDispatch();
  const [logged,setLogged] = useState(false);

    const navigate = useNavigate();
   
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    isValid: false
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

    const placeSubmitHandler = async(event)=>{
    event.preventDefault();
    const email = formState.inputs.Email.value;
    const password = formState.inputs.Password.value;

    const result = await axios.post('http://127.0.0.1:4000/login',{
      email:email,
      password:password
    }
    
    );
   
    console.log(result.data);
    axios.defaults.headers.common['Authorization'] =`Bearer ${result.data.data}`
   if(result.data.success){
    const res = result.data.data;
    setLogged(true);
    setVariant('success');
    setMessage('Successfully logged in!')

    
    
 
    d(login(res));
    setTimeout(()=>{
      navigate('/');
    },3000);

    
   }
     if(logged){
      setVariant('danger');
      setMessage('Please check your email or password!');
     }
  };
  const clickHandler = (e)=>{
    e.preventDefault();
    navigate('/forgot-password')
  }

  return (<Container>
    {variant && <Alert variant={variant}>{message}</Alert>}
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="Email"
        element="input"
        type="text"
        label="Email"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid email."
        onInput={inputHandler}
      />
      <Input
        id="Password"
        element="input"
        type="password"
        label="Password"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid password."
        onInput={inputHandler}
      />
      
 
      <button className="button-submit" type="submit" onClick={placeSubmitHandler}>
        Log In
      </button>
      <p onClick={clickHandler}>
                ForgotPassword?
              </p>
   
    </form>
   
    </Container>
  );
};

export default LoginPage;
