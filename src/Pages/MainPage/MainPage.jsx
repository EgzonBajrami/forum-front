import './MainPage.css'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
const MainPage = () =>{ 
  const auth = useSelector((state)=>state.auth.data);
    console.log(auth);
    const navigate = useNavigate();
   
    useEffect(()=>{
      if(auth){
        setTimeout(()=>{navigate('/home')},4000);
      }

    },[auth,navigate])
    
    const handleLogin = (e) =>{
        e.preventDefault();
        navigate(`/login`)
    }
    const handleRegister = (e) =>{
        e.preventDefault();
        navigate(`/register`)
    }

    return(<>
    <div className="container-fluid">

    <div className="background">
    <div className="logo"><span>E</span></div>
<header>
<div className="header-content">
   <h1>Welcome</h1>
  <p> Welcome to my forum. This is my attempt at making a forum with nested comments,<br />
     which make reading through comments a lot easier.</p>
  <button onClick={handleLogin}>Sign in</button>
  <button onClick={handleRegister}>Sign up</button>
</div>
</header>
       <div className="cube"></div>
       <div className="cube"></div>
       <div className="cube"></div>
       <div className="cube"></div>
      <div className="cube"></div>
    </div>

  </div>

    </>)
}
export default MainPage;