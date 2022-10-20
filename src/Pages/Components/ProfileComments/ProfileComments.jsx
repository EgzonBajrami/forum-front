import Table from 'react-bootstrap/Table'
import {useEffect,useState} from 'react';
import {api,endpoints} from '../../../Lib/Api'
import { getHeaderStructore } from '../../../Lib/helpers/helpers';
import {useSelector} from 'react-redux'

const ProfileComments = ({userId}) =>{
    console.log(userId);
    const auth = useSelector((state)=>state.auth.data);
    const config = {
        headers: getHeaderStructore(auth.token),
        params:[userId],
       
        
      }
      const [comments,setComments] = useState([])
      useEffect(()=>{
        const getUserComments = async() =>{
            const result = await api.call(endpoints.getProfileComments,config);
            setComments(result.data)
        }
        getUserComments();

      })
      console.log(comments);
     
   
 return <>
 <Table striped bordered hover>
      <thead>
        <tr>
          <th>Comments Id</th>
        
          <th>Content:</th>
          <th>Posted at:</th>
          
        </tr>
      </thead>

      <tbody>
      {comments &&comments.map((elem,index)=>( 
         
        <tr key={elem._id}>

          <td>{index++}</td>
          
          <td>{elem.content}</td>
          <td>{elem.createdAt.split('T')[0]}</td>
         
        </tr>
         
          ))}
     
      </tbody>
    
    </Table>
 </>

}
export default ProfileComments;