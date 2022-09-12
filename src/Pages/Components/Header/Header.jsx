import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import jwt_decode from 'jwt-decode'
import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom'
import { logout} from '../../../Lib/auth';

import './Header.css'


const Header = () =>{
  const token = useSelector((state)=>state.auth.data);
  console.log(token);
  let decoded;
  
  if(token){

  
   decoded = jwt_decode(token.token);
  console.log(decoded._id);
}

  const dispatch = useDispatch();
  const handleClick = (event) =>{
    event.preventDefault();
    dispatch(logout());
    
  }

    return<>
    <Navbar collapseOnSelect expand="sm" className="color-navbar" variant="dark">

      <Container>
        <Navbar.Brand href="/"><img className="navImage" alt="heeey"  src="https://imgur.com/99XjHxi.png"></img></Navbar.Brand>
       
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="obje" />
        <Navbar.Collapse id="responsive-navbar-nav" >
        {token ?( 
          <Nav className="me-auto">
            
           
       
          <Nav.Link href="/placeholder">Main Page</Nav.Link>
          
            
         <>
            <NavDropdown title="Forums" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/News">News</NavDropdown.Item>
              <NavDropdown.Item href="/Main-Forum">
                Main-Forum
              </NavDropdown.Item>
              <NavDropdown.Item href="/media">Media</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/Rules">
                Rules
              </NavDropdown.Item>
            </NavDropdown>
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
{token &&(
  <Nav>
    <Link to={{pathname:`/profile/${decoded._id}`}}>Profile</Link>
  </Nav>
)}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
}
export default Header;