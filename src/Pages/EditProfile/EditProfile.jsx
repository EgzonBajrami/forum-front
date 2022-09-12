import { useEffect,useState } from "react";
import {useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {api,endpoints} from '../../Lib/Api'
import { getHeaderStructore } from '../../Lib/helpers/helpers';
import {useLocation,useNavigate} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'


const EditProfile = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.pathname.split('/')[2];
    const userData = location.state.profileData
    const [firstName, setFirstName] = useState(userData.firstName)
    const [lastName, setLastName] = useState(userData.lastName)
    const [age, setAge] = useState(userData.age)
    const [username, setUsername] = useState(userData.username);
    const[avatar,setAvatar] = useState('');
    const auth = useSelector((state)=>state.auth.data);
    const config = {
        headers: getHeaderStructore(auth.token),
        params:[userId],
       
        
      }
  
    const handleSubmit =  async (e) => {
      e.preventDefault()
      const editConfig = {...config};
      const userData = [firstName,lastName,age,username,avatar];
      editConfig.data = userData;
      const result = await api.call(endpoints.editUser,editConfig);
      console.log(result);
      if(result.success){
        navigate('/')
        
      }
  
      
  
      
    }
  
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <input
            type="text"
            required
            className="form-control"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
            placeholder="First Name"
          />
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <input
            type="text"
            required
            className="form-control"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value)
            }}
            placeholder="Last Name"
          />
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <input
            type="number"
            required
            className="form-control"
            value={age}
            onChange={(e) => {
              setAge(e.target.value)
            }}
            placeholder="Age"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            placeholder="Username"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Avatar</Form.Label>
          <input
            type="text"
            required
            className="form-control"
            value={avatar}
            onChange={(e) => {
              setAvatar(e.target.value)
            }}
            placeholder="Avatar"
          />
        </Form.Group>
  
        <div className="submit">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    )
  }
export default EditProfile;