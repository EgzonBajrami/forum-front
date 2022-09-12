import './Dashboard.css'
import {api,endpoints} from '../../Lib/Api'
import { getHeaderStructore } from '../../Lib/helpers/helpers';
import {useSelector} from 'react-redux';
import {Form,Button,Table} from 'react-bootstrap'
import {useState} from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useNavigate} from 'react-router-dom'

const Dashboard = () =>{
  const navigate = useNavigate();
    const auth = useSelector((state)=>state.auth.data);
    const [username,setUserName] = useState('');
    const [user,setUser] = useState([])
    const [subforum,setSubForum] = useState('');
    const [variant,setVariant] = useState('');
    const [deleted,setDeleted] = useState('');
    const [message,setMessage] = useState();
    const [confirmation,setConfirmation] = useState();
    const[icon,setIcon] = useState('')
    const[description, setDescription] = useState('');
    const config = {
        headers: getHeaderStructore(auth.token),
        
       
        
      }
      
      const handleSubmit = async(e) =>{
        e.preventDefault();
        const editConfig = {headers:getHeaderStructore(auth.token),
        params:[username]}
        console.log(editConfig)
        const result = await api.call(endpoints.findUser,editConfig);
       
        setUser(result.data);
    
        

      }
      console.log(user);
      const removeUser = async(e) =>{
        e.preventDefault();
        console.log(e.currentTarget.id)
        const editConfig = {headers:getHeaderStructore(auth.token),
            params:[e.currentTarget.id]}

            const result = await api.call(endpoints.removeUser,editConfig);
            console.log(result);
          
            
      }
    
    const createSub = async(e) =>{
        e.preventDefault();
        const editConfig = {...config};
        editConfig.data = {subforum:subforum,description:description,icon:icon}
        const result = await api.call(endpoints.createSub,editConfig);
        console.log(result);
    }
    const handleEdit = async(e) =>{
      e.preventDefault();
      const editConfig = {headers:getHeaderStructore(auth.token),
        params:[subforum]}
        const result = await api.call(endpoints.findSubByName,editConfig);
        console.log(result);
        const subId = result.data[0]._id;
        console.log(subId);
        navigate(`/editSub/${subId}`,{state:{name:result}})
      
      
    }

    return <>
    <div className="dashboard-title">
        <h1>Dashboard</h1>
    </div>
    <div className='create-new-sub'>
    <Form className="admin-get" onSubmit={createSub}>
            <Form.Group className="mb-3">
              <Form.Label>Subforum Name:</Form.Label>
              <input
                type="text"
                required
                className="form-control"
                value={subforum}
                onChange={(e) => {
                  setSubForum(e.target.value)
                }}
                placeholder="Create new subforum"
              />
                        <Form.Label>Subforum Description:</Form.Label>
                 <input
                type="text"
                required
                className="form-control"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                placeholder="Create new subforum"
              />
                      <Form.Label>Subforum Icon:</Form.Label>
                 <input
                type="text"
                required
                className="form-control"
                value={icon}
                onChange={(e) => {
                  setIcon(e.target.value)
                }}
                placeholder="Create new subforum"
              />
              <Button type="submit">Submit</Button>
               
            </Form.Group>
            
            </Form>



    </div>
    <Form className="admin-get" onSubmit={handleEdit}>
            <Form.Group className="mb-3">
              <Form.Label>Subforum:</Form.Label>
              <input
                type="text"
                required
                className="form-control"
                value={subforum}
                onChange={(e) => {
                  setSubForum(e.target.value)
                }}
                placeholder="Find subforum Id"
              />
              <Button type="submit">Submit</Button>
               
            </Form.Group>
            
            </Form>
     
    <div className="user-data-input">
    <Form className="admin-get" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username:</Form.Label>
              <input
                type="text"
                required
                className="form-control"
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value)
                }}
                placeholder="Get userdata"
              />
              <Button type="submit">Submit</Button>
               
            </Form.Group>
            
            </Form>


   
    {user.length>0 ?(<>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>User id</th>
        
          <th>Full Name</th>
          
          <th>Username</th>
          <th>Total posts</th>
      
          <th>Created at</th>
          <th> </th>
          
        </tr>
      </thead>

      <tbody>
      {user &&user.map((elem,index)=>( 
         
        <tr key={elem._id}>

          <td>{elem._id}</td>
          
          <td>{elem.firstName} {elem.lastName}</td>
         
          <td>{elem.username}</td>
          <td>{elem.posts.length}</td>
       
          <td>{elem.createdAt.split('T')[0]}</td>
          <td onClick={removeUser} id={elem._id}><FontAwesomeIcon icon={faTrash} /></td>
         
        </tr>
         
          ))}
     
      </tbody>
    
    </Table>
     
    </>):(<>
    
    </>)}
    </div>
    
    </>
}
export default Dashboard;