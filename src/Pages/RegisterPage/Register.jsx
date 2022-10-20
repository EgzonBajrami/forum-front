import React, { useCallback, useReducer } from 'react';

import {Alert, Container} from 'react-bootstrap';
import {useState} from 'react';
import Input from './RegisterInput.js'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../SharedComponents/Utils/validators';
import './Home.css';
import axios from 'axios';
<<<<<<< HEAD

=======
import {useNavigate} from 'react-router-dom'
>>>>>>> 8d35b154378bec18eddecf2a3856a99e28f5307a
import Header from '../Components/Header/Header'


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

const Register = () => {
  
    const [variant, setVariant] = useState();
    const [message, setMessage] = useState();

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

    async function placeSubmitHandler(event){
    event.preventDefault();
    console.log(formState.inputs);
    const email = formState.inputs.Email.value;
    console.log(email);
    const firstName = formState.inputs.FirstName.value;
    const lastName = formState.inputs.LastName.value;
    const username = formState.inputs.NickName.value;
    const password = formState.inputs.Password.value;
    console.log(password);
    const age = formState.inputs.Age.value;
    const result = await axios.post('http://127.0.0.1:4000/register',{
        email,
        firstName,
        lastName,
        username,
        password,
        age,
    });
    console.log(result);
    console.log(result.status);
    if(result.status===200){
        setVariant('success');
        setMessage('Successfully registered in, please check your email for verification.')
       
    }
    else{
        setVariant('danger');
        setMessage('Something went wrong');
    }


  };

  return (
    <> 
    <Header/>
    <Container>
        {variant && <Alert variant={variant}>{message}</Alert>}
    <form className="place-form" onSubmit={placeSubmitHandler}>
          <Input
        id="FirstName"
        element="input"
        type="text"
        label="First Name"
        validators={[VALIDATOR_MINLENGTH(5),VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid first name."
        onInput={inputHandler}
      />
         <Input
        id="LastName"
        element="input"
        type="text"
        label="Last Name"
        validators={[VALIDATOR_MINLENGTH(5),VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid last name."
        onInput={inputHandler}
      />
         <Input
        id="NickName"
        element="input"
        type="text"
        label="Username"
        validators={[VALIDATOR_MINLENGTH(5),VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid username."
        onInput={inputHandler}
      />
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
         <Input
        id="CPassword"
        element="input"
        type="password"
        label="Confirm Password"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid password."
        onInput={inputHandler}
      />
         <Input
        id="Age"
        element="input"
        type="number"
        label="Age"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid password."
        onInput={inputHandler}
      />
 
      <button className="button-submit" type="submit" onClick={placeSubmitHandler}>
        Register
      </button>
    </form>
    </Container>
    </>
  );
};

export default Register;
