import { useEffect,useState } from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios'
import './EditComment.css'
import {api,endpoints} from '../../../Lib/Api'
import { getHeaderStructore } from '../../../Lib/helpers/helpers';
import {useSelector} from 'react-redux'

const EditComment = () =>{
  const auth = useSelector((state)=>state.auth.data);
  const location = useLocation();
  const commentId = location.pathname.split('/')[2];
  console.log(commentId);
  
  const config = {
    headers: getHeaderStructore(auth.token),
    params:[commentId],
   
    
  }
  console.log(config.headers);
  
  const [data, setData] = useState();
  const [newReply, setNewReply] = useState();
  useEffect(()=>{
    const getComment = async () =>{
        const response = await axios.get(`http://127.0.0.1:4000/comments/${commentId}`)
        console.log(response);
        setData(response.data.result);
    }
    getComment();

  },[])
  console.log(data);
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const editConfig = {...config};
    editConfig.data = {content:newReply}
    const result = await api.call(endpoints.editComment,editConfig)
    console.log(result);
  }
  const handleChange = (e) =>{
    setNewReply(e.target.value);

  }
  return<>
  {data &&(
    <div className="content-div">
        <div className="former-content">
            <h5>Pre-edit comment:</h5>
           {data[0].content}
        </div>
        <div className="new-comment">
            <form onSubmit={handleSubmit}>
                <textarea type="text" value={newReply} onChange={handleChange}></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>

    </div>

  )}
  </>
}
export default EditComment;