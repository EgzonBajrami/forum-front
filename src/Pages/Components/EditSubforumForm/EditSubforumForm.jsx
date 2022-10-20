import {api,endpoints} from '../../../Lib/Api'
import { getHeaderStructore } from '../../../Lib/helpers/helpers';
import {useSelector} from 'react-redux'
import {Form,Button} from 'react-bootstrap'
import {useState} from 'react';
import {useLocation} from 'react-router-dom'
const EditSubforumForm = () =>{
    const auth = useSelector((state)=>state.auth.data);
    const location = useLocation();
    console.log(location.state.name)
    const commentId = location.pathname.split('/')[2];
    console.log(commentId);
    const data = location.state.name;
    console.log(data)
    const[subforum,setSubForum] = useState(data.data[0].subforumName);
    const[icon,setIcon] = useState('')
    const[description, setDescription] = useState(data.data[0].description);
    
    const config = {
      headers: getHeaderStructore(auth.token),
      params:[commentId],
     
      
    }
   
    const editSub = async(e) =>{
        e.preventDefault();
        const editConfig ={...config};
        editConfig.data = {subforumName:subforum,description:description,icon:icon};
        const result = await api.call(endpoints.editSubForum,editConfig);
        console.log(result);

    }
    return <> 
    <div className='create-new-sub'>
    <Form className="admin-get" onSubmit={editSub}>
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
    </>
}
export default EditSubforumForm