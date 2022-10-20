import {useState} from 'react';
import { getHeaderStructore } from '../../../Lib/helpers/helpers';

import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {api,endpoints} from '../../../Lib/Api'


const ReplyComment = ({commentId,poster}) =>{
  const location = useLocation();
  const postId = location.pathname.split('/')[4];
  const auth = useSelector((state)=>state.auth.data);

  console.log(commentId);
  const comment_id = commentId;
 
  
  const decoded = jwt_decode(auth.token);


  const config = {
    headers: getHeaderStructore(auth.token),
    params:[postId]
  }
  const [reply, setReply] = useState([]);


  const handleSubmit = async (e) =>{
    e.preventDefault();

 
   console.log(comment_id);
  config.data = {content:reply,
  parent:comment_id,
post:postId,
commenter:decoded};
 
    const result = await api.call(endpoints.postComment,config)
    console.log(result);
    window.location.reload();
   
     
  }
  
  const handleChange = (e) =>{
    setReply(e.target.value)

  }
return <div >
  <form className="reply-fix" onSubmit={handleSubmit}>
    
    <textarea className="reply-fix" value={reply} onChange={handleChange} />
    
    <button type="submit">Submit</button>
  </form>
  
</div>


}
export default ReplyComment;