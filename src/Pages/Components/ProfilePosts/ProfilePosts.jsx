import Table from 'react-bootstrap/Table'
import {useEffect,useState} from 'react';
import {api,endpoints} from '../../../Lib/Api'
import { getHeaderStructore } from '../../../Lib/helpers/helpers';
import {useSelector} from 'react-redux'
const ProfilePosts = ({userId}) =>{
  const auth = useSelector((state)=>state.auth.data);
  const [posts,setPosts] = useState([]);
  const config = {
      headers: getHeaderStructore(auth.token),
      params:[userId],
     
      
    }
    useEffect(()=>{
      const getUserPosts = async() =>{
        const result = await api.call(endpoints.getUserPosts,config);
       
        setPosts(result.data)
      }
      getUserPosts();

    },[])
    console.log(posts);
 return <>
 <Table striped bordered hover>
      <thead>
        <tr>
          <th>Post Id</th>
          <th>Title</th>
          <th>Content:</th>
          <th>Posted at:</th>
        </tr>
      </thead>
      <tbody>
        {posts &&posts.map((elem,index)=>(

      
        <tr key={index}>
          <td>{index++}</td>
          <td>{elem.title}</td>
          <td>{elem.textSubmission}</td>
          <td>{elem.createdAt.split('T')[0]} {elem.createdAt.split('T')[1].split('.')[0]}</td>
        </tr>
          ))}
     
      </tbody>
    </Table>
 </>

}
export default ProfilePosts;