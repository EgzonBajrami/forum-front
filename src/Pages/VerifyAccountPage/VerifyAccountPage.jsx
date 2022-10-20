import React,{useEffect, useState} from 'react'
import { Container, Row,Alert } from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom'
import {api,endpoints} from '../../Lib/Api'
import { getHeaderStructore } from '../../Lib/helpers/helpers';
const VerifyAccountPage = () =>{
    const [success,setSuccess] = useState();
    const [errorMessage, setErrormessage]= useState('');
    const location = useLocation();
    useEffect(()=>{
        const verifyAccount = async() =>{
            if(location.search){
                const params = new URLSearchParams(location.search);
                console.log(location);
                const token = params.get('token');
                console.log(token);
                const config ={
                    headers: getHeaderStructore(token)
                }
                const result = await api.call(endpoints.verifyAccount,config);
                setSuccess(result.success);
                if(!result.success){
                    setErrormessage(result.data);
                }
            }
        }
        verifyAccount();

    },[location])

    return <>
    <Container>
        <Row>
        {success !== undefined ? (
          success === true ? (
            <Alert variant={'success'}>
              Account is verified! <Link to="/login">Please go to login</Link>
            </Alert>
          ) : (
            <Alert variant={'danger'}>{errorMessage}</Alert>
          )
        ) : null}
        </Row>
    </Container>
    </>

}
export default VerifyAccountPage;