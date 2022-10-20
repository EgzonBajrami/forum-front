import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import {useNavigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import VerticalModal from '../Modal/Modal';
import { logout} from '../../../Lib/auth';
import {useState,useEffect} from 'react';


import {api,endpoints} from '../../../Lib/Api'
import { getHeaderStructore } from '../../../Lib/helpers/helpers';
import {EnvelopeFill,EnvelopeDashFill} from 'react-bootstrap-icons'


import './Header.css'



const Header = () =>{
  const token = useSelector((state)=>state.auth.data);

  const [open, setOpen] = useState(false);
  console.log(token);
  let decoded;
  const navigate=useNavigate();

  const auth = useSelector((state)=>state.auth.data);
  
  if(token){

  
   decoded = jwt_decode(token.token);
  console.log(decoded._id);
}
const config = {
  headers: getHeaderStructore(auth.token),
  params:[decoded._id]
 
 
  
}

useEffect(()=>{
  const getUserNotific = async () =>{
     
    const result = await api.call(endpoints.getUserNotifications,config);
   
    console.log(result);
  }
getUserNotific();

})


  const dispatch = useDispatch();
  const handleClick = (event) =>{
    event.preventDefault();
    dispatch(logout());
    
  }
  const handleNotificationClick = (event) =>{
    event.preventDefault();
    console.log("Clicked me");
  }
  const navigateHandler= (e) =>{
    e.preventDefault();
    navigate(`/profile/${decoded._id}`)
  }

    return<>
    <Navbar collapseOnSelect expand="sm" className="color-navbar" variant="dark">

      <Container>
        <Navbar.Brand href="/"><img className="navImage" alt="heeey"  src="https://imgur.com/99XjHxi.png"></img></Navbar.Brand>
       
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="obje" />
        <Navbar.Collapse id="responsive-navbar-nav" >
        {token ?( 
          <Nav className="me-auto">
            
           
       
          <Nav.Link href="/">Home</Nav.Link>
          
            
         <>
            
            <Nav.Link onClick={handleClick}>Log out</Nav.Link>
            
             </> 
          
           

          </Nav> )
          
          
    :( 
          <Nav>
          
         
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
            
          </Nav>
          )
}
{token &&(<div className="putinline">


  <Nav>
    <Nav.Link> 

  <div onClick={handleNotificationClick} className="addBorder">
{open ? (
  <EnvelopeDashFill onClick={()=> setOpen(!open)}
  aria-controls="example-collapse-text" 
  aria-expanded={open}
  color="royalblue"
  size={30}
  />
) :(
  <EnvelopeFill onClick={()=> setOpen(!open)}
  aria-controls="example-collapse-text" 
  aria-expanded={open}
  color="royalblue"
  size={30}
  />
  
)

}

</div>
    </Nav.Link>
    <Nav.Link onClick={navigateHandler}> Profile</Nav.Link>
  </Nav>
  
  </div>
)}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <VerticalModal show={open}
    onHide={()=>setOpen(false)}/>
    </>
}
export default Header;