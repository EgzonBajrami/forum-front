import {useState, useEffect} from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import axios from 'axios';
import ReplyComment from '../ReplyComment/ReplyComment.jsx'
import { getHeaderStructore } from '../../../Lib/helpers/helpers';

import './Comments.css'
import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {api,endpoints} from '../../../Lib/Api'


const Comments = () =>{
  const auth = useSelector((state)=>state.auth.data);
  const decoded = jwt_decode(auth.token);
  console.log(decoded);
  const navigate = useNavigate();
 
 
    const location = useLocation();
    const postId = location.pathname.split('/')[4];
    const [rerender, setRerender] = useState(false);
    const [comments,setComments] = useState([]);
    const [commentId, setCommentId]= useState([])
    const [editId, setEditId] = useState();
    const [show,setShow] = useState(false);
    const[show2,setShow2] = useState(false);
    const[show3,setShow3] = useState(false);
    const[show4,setShow4] = useState(false);
    const[show5,setShow5] = useState(false);
    const [firstComment, setFirstComment] = useState("");
    const config = {
      headers: getHeaderStructore(auth.token),
      params:[postId],
     
      
    }
    console.log(config);
    
  
    useEffect(()=>{
        const fetchData = async () =>{ 
          const response = await api.call(endpoints.getComments,config);
            
            console.log(response);
            setComments(response);
        }
        fetchData();
 

    },[])
   
  
      const handleReply = (e) =>{
        e.preventDefault();
        console.log(e.currentTarget.id);
        setCommentId(e.currentTarget.id);
     
      }
      const handleEdit = (e)=>{
        e.preventDefault();
        setEditId(e.currentTarget.id);
        navigate(`/editcomments/${e.currentTarget.id}`,{state:{id:e.currentTarget.id}})

      }

     const handleChange = (e) =>{
      setFirstComment(e.target.value);

     }
  
     const handleCommentSubmit = async(e)=>{
      e.preventDefault();
      const data = firstComment;

      
      const editConfig = {
        headers: getHeaderStructore(auth.token),
        params:[postId],
        

      }
      editConfig.data ={content:data};
      console.log(editConfig);
      console.log(data);
    
     
      const result = await api.call(endpoints.postComment,editConfig);
      console.log(result);
      window.location.reload();
     }
     const handleRemove = async (e) =>{
      e.preventDefault();
      const removeId = e.currentTarget.id;
      console.log(removeId);
    
      const editConfig = {
        headers: getHeaderStructore(auth.token),
        params:[removeId],

      }
      const result = await api.call(endpoints.removeComment,editConfig);
      console.log(result);
      window.location.reload();
     }
     const handleShow = async(e)=>{
      setShow(!show);

     }
     const handleShow2 = async(e) =>{
      setShow2(!show2);
     }
     const handleShow3= async(e) =>{
      setShow3(!show3);
     }
     const handleShow4 = async(e) =>{
      setShow4(!show4);
     }
     const handleShow5= async(e) =>{
      setShow5(!show5);
     }


    
    
     

    
      return <>
      <div className="first-comment">
        <input type="text-area" onChange={handleChange} value={firstComment} />
        <input className="button-reply" type="submit" onClick={handleCommentSubmit} value="Comment" />

      </div> 
      { 
      comments ? (
        <Stack spacing={2}>
        
          {comments.length > 0 ? (
            <Box pb={4}>
              {comments.map((comment, i) => (
             <div className="parent-div" key={i}>
              <div className="parent-name"><p>{comment.commenter.username}</p>
              <p>Posted at: {comment.createdAt.split('T')[0]}</p></div>
              <p className="parent-element">{comment.content}</p>
              <div className="button-container">
              <button className="button-reply" onClick={handleReply} id={comment._id}>Reply</button>
              {commentId===comment._id && <ReplyComment commentId={comment._id} poster={comment.commenter._id}/>}
              
              {(decoded._id===comment.commenter._id)&&(<button className="button-reply" onClick={handleEdit} id={comment._id}>Edit</button>)}
              {decoded && (decoded._id===comment.commenter._id || auth.role==='ADMIN')&&(<button className="button-remove" onClick={handleShow} id={comment._id}>Remove</button>)}
              {show &&(<div className="buttons-remove">Are you sure you want to delete this comment? 
              <button className="button-remove" onClick={handleRemove} id={comment._id}>Yes</button>
              <button className="button-noremove" onClick={handleShow}>No</button>
              </div>)}
              </div>

            
   
       
  
                  {comment.children.map((elem,c)=>( 

                
            <div className="children-div" key={c}>
              <div className="parent-name"><p>{elem.commenter.username}</p>
              <p>Posted at: {comment.createdAt.split('T')[0]}</p></div>
          
              <p className="text-color">{elem.content}</p>
              <div className="button-container">
              <button className="button-reply" onClick={handleReply} id={elem._id}>Reply</button>
              {commentId===elem._id && <ReplyComment commentId={elem._id} poster={elem.commenter._id}/>}
              {decoded && (decoded._id===elem.commenter._id)&&(<button className="button-reply" onClick={handleEdit} id={elem._id}>Edit</button>)}
              { ((decoded._id)==elem.commenter._id || auth.role==='ADMIN')&&(<button className="button-remove" onClick={handleShow2} id={elem._id}>Remove</button>)}
              {show2 &&(<div className="buttons-remove">Are you sure you want to delete this comment? 
              <button className="button-remove" onClick={handleRemove} id={elem._id}>Yes</button>
              <button className="button-noremove" onClick={handleShow2}>No</button>
              </div>)}
              </div>


  
         
                {
                  elem.children.map((child, k)=>( 
                    <div className="third-child" key={k}>
                                   <div className="parent-name"><p>{child.commenter.username}</p>
              <p>Posted at: {child.createdAt.split('T')[0]}</p></div>
                      <p className="text-color">{child.content}</p>
                      <div className="button-container">
              <button className="button-reply" onClick={handleReply} id={child._id}>Reply</button>
              {commentId===child._id && <ReplyComment commentId={child._id} poster={child.commenter._id}/>}
              {decoded && (decoded._id===child.commenter._id)&&(<button className="button-reply" onClick={handleEdit} id={child._id}>Edit</button>)}
              {decoded && (decoded._id===child.commenter._id || auth.role==='ADMIN')&&(<button className="button-remove" onClick={handleShow3} id={child._id}>Remove</button>)}
              {show3 &&(<div className="buttons-remove">Are you sure you want to delete this comment? 
              <button className="button-remove" onClick={handleRemove} id={child._id}>Yes</button>
              <button className="button-noremove" onClick={handleShow3}>No</button>
              </div>)}
              </div>

                      {
                        child.children.map((fourth, f)=>(
                          <div className="fourth-child" key={f}>
                            <div className="parent-name">{fourth.commenter.username}
 
                               <p>Posted at: {fourth.createdAt.split('T')[0]}</p></div>
                               <p className="text-color">{fourth.content}</p>
                               <div className="button-container">
                       <button className="button-reply" onClick={handleReply} id={fourth._id}>Reply</button>
                       {commentId===fourth._id && <ReplyComment commentId={fourth._id} poster={fourth.commenter._id}/>}
                       {decoded && (decoded._id===fourth.commenter._id)&&(<button className="button-reply" onClick={handleEdit} id={fourth._id}>Edit</button>)}
                       {decoded && (decoded._id===fourth.commenter._id || auth.role==='ADMIN')&&(<button className="button-remove" onClick={handleShow4} id={fourth._id}>Remove</button>)}
                       {show4 &&(<div className="buttons-remove">Are you sure you want to delete this comment? 
              <button className="button-remove" onClick={handleRemove} id={fourth._id}>Yes</button>
              <button className="button-noremove" onClick={handleShow4}>No</button>
              </div>)}
                       </div>
                       {
                        fourth.children.map((fifth,five)=>(
                          <div className="fifth-child" key={five}>
                          <div className="parent-name">{fifth.commenter.username}

                             <p>Posted at: {fifth.createdAt.split('T')[0]}</p></div>
                             <p className="text-color">{fifth.content}</p>
                             <div className="button-container">
                     <button className="button-reply" onClick={handleReply} id={fifth._id}>Reply</button>
                     {commentId===fifth._id && <ReplyComment commentId={fourth._id} poster={fifth.commenter._id}/>}
                     {decoded && (decoded._id===fifth.commenter._id)&&(<button className="button-reply" onClick={handleEdit} id={fifth._id}>Edit</button>)}
                     {decoded && (decoded._id===fifth.commenter._id || auth.role==='ADMIN')&&(<button className="button-remove" onClick={handleShow5} id={fifth._id}>Remove</button>)}
                     {show5 &&(<div className="buttons-remove">Are you sure you want to delete this comment? 
              <button className="button-remove" onClick={handleRemove} id={fifth._id}>Yes</button>
              <button className="button-noremove" onClick={handleShow5}>No</button>
              </div>)}
                     </div>
                     </div>

                        ))
                       }
                                    </div>
                          

                        ))
                      }
                  
                      </div>
                      
                  ))

                }
           
            

            </div>
              ))}

             </div>
              ))}
              
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              textAlign="center"
              paddingY={3}
            >
              <Box>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  No comments yet...
                </Typography>
                <Typography variant="body" color="text.secondary">
                  Be the first one to comment!
                </Typography>
              </Box>
            </Box>
          )}
        </Stack>
      ) : (
        <div>Loading</div>
      )}

 
    
      </>
    
      }




export default Comments;