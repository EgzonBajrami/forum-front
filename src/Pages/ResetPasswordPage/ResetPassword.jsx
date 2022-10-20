import React,{useEffect, useState} from 'react'
import { Container,Alert } from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom'
import {api,endpoints} from '../../Lib/Api'
import { getHeaderStructore } from '../../Lib/helpers/helpers';
import ResetPasswordForm from '../Components/ResetPasswordForm/ResetPasswordForm';

const ResetPassword = () =>{
    const [message, setMessage] = useState('')
  const [variant, setVariant] = useState('danger')
  const [token, setToken] = useState()
  const location = useLocation()

  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search)
      setToken(params.get('token'))
    }
  }, [location.search])

  const submitRestPassword = async (data) => {
    const config = {
      headers: getHeaderStructore(token),
      data,
    }
    const result = await api.call(endpoints.resetPassword, config)
    if (!result.success) {
      setMessage(result.data)
      return
    }
    setVariant('success')
    setMessage('Your password has been successfully changed!')
  }

  return (
    <>
      <Container>
        <h1>Reset Password</h1>
        <Alert variant={variant}>{message}</Alert>
      </Container>
      {variant !== 'success' ? <ResetPasswordForm setMessage={setMessage} submit={submitRestPassword} /> : <Container><Link to="/login">Go to login</Link></Container>}
    </>
  )
}



export default ResetPassword;