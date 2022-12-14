import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
<<<<<<< HEAD
import {useState,useEffect, useMemo} from 'react';
=======
import {useState,useEffect} from 'react';
>>>>>>> 8d35b154378bec18eddecf2a3856a99e28f5307a


import {api,endpoints} from '../../../Lib/Api'
import { getHeaderStructore } from '../../../Lib/helpers/helpers';
import {useSelector} from 'react-redux'
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import './Modal.css'

const VerticalModal =(props)=> {

    const auth = useSelector((state)=>state.auth.data);
  const navigate = useNavigate();
  const [notifications,setNotifications] = useState([])

  let decoded;


  
  if(auth){

  
   decoded = jwt_decode(auth.token);
  console.log(decoded._id);
}
<<<<<<< HEAD
  const config = useMemo(()=>{
    return{

      headers: getHeaderStructore(auth.token),
      params:[decoded._id]
     
    }
   
    
  },[auth,decoded._id])
=======
  const config = {
    headers: getHeaderStructore(auth.token),
    params:[decoded._id]
   
   
    
  }
>>>>>>> 8d35b154378bec18eddecf2a3856a99e28f5307a
  useEffect(()=>{
    const getNotifications = async() =>{
        const result = await api.call(endpoints.getUserNotifications,config);
        setNotifications(result.data);
    }
    getNotifications();

<<<<<<< HEAD
  },[auth,config]) // eslint-disable-next-line

=======
  },[])
>>>>>>> 8d35b154378bec18eddecf2a3856a99e28f5307a
  const handleClick = async(e) =>{
    e.preventDefault();
    const index = e.target.id;
    console.log(index);

   
    navigate(`/subforums/${notifications[index].postId.subforum}/post/${notifications[index].postId._id}`)
    const editConf = {
      headers: getHeaderStructore(auth.token),
      params:[notifications[index]._id]
     
     
      
    }
<<<<<<< HEAD
     await api.call(endpoints.deleteNotification,editConf);
=======
    const result = await api.call(endpoints.deleteNotification,editConf);
>>>>>>> 8d35b154378bec18eddecf2a3856a99e28f5307a
   props.onHide();
    
  }
  const handleClear = async(e) =>{
    e.preventDefault();
    const result = await api.call(endpoints.clearNotifications,config);
    console.log(result);
    
  }
 
  console.log(notifications);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Notifications 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {notifications ? (
            
            <div className="wrapper">
                {notifications.map((elem,index)=>(
                    <div className="notifications-wrapper" onClick={handleClick} id={index} key={index}>
                        {elem.text}</div>

                ))}

            </div>
        ):(
            <div>

            </div>

        )}
       
      </Modal.Body>
      <Modal.Footer className='modal-footer'>
        <Button onClick={handleClear}>Clear</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default VerticalModal;

