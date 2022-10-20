import React,{ useState} from 'react'
import { Container, Alert } from 'react-bootstrap';

import {api,endpoints} from '../../Lib/Api'

import ForgotPasswordForm from '../Components/ForgotPasswordForm/ForgotPasswordForm';
const ForgotPassword = () => {
    const [message, setMessage] = useState()
    const [variant, setVariant] = useState()
  
    const submitForm = async (data) => {
      const config = {
        data,
      }
      const result = await api.call(endpoints.forgotPassword, config)
      if (!result.success) {
        setVariant('danger');
        setMessage([result.data])
        return
      }
  
      setVariant('success')
      setMessage('An email was sent to you with further instructions!')
    }
  
    return (
      <>
        <Container>
          <h1>Forgot Password</h1>
         {variant&&  <Alert variant={variant}>{message}</Alert>}
        </Container>
        {variant !== 'success' && <ForgotPasswordForm setMessage={setMessage} submit={submitForm} />}
      </>
    )
  }
  export default ForgotPassword;