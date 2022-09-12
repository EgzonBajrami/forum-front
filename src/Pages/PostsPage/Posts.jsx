import axios from 'axios';
import {useEffect,useState} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import Comments from '../Components/AllComments/Comments'
import './Posts.css';
import {useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {api,endpoints} from '../../Lib/Api'
import { getHeaderStructore } from '../../Lib/helpers/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regFaHeart } from '@fortawesome/free-regular-svg-icons'

import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';
import {faThumbsDown} from '@fortawesome/free-regular-svg-icons'

const Posts = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const requestedPostId = location.pathname.split('/')[4];
    console.log(requestedPostId);
    const auth = useSelector((state)=>state.auth.data);
    const decoded = jwt_decode(auth.token);
    console.log(decoded);
    const [img,setImg] = useState();
    const [heart,setHeart] = useState();
    const config = {
        headers: getHeaderStructore(auth.token),
        params:[requestedPostId],
       
        
      }
    

    const [post, setPost] = useState([]);
    useEffect(()=>{
        const getPost = async () =>{
         const result = await axios.get(`http://127.0.0.1:4000/posts/${requestedPostId}`)
         console.log(result);
         setPost([result.data.data]);
         if(result.data.data.upvotedBy.includes(decoded._id)){
            setHeart(true);
         }
         
         setImg(result.data.data.imageSubmission);
        }
        getPost();
    },[])
    console.log(post);
    console.log(img);
    const handleEdit = (e) =>{
        e.preventDefault();
        navigate(`/edit/${requestedPostId}`,{state:{locationPost:post}})
    }
    const handleRemove = async(e) =>{
        e.preventDefault();
        const editConfig = {...config};
        const result = await api.call(endpoints.removePost,editConfig);
        console.log(result);



    }
    const handleUpvote = async(e)=>{
        e.preventDefault();
        const result = await api.call(endpoints.upVote,config);
        console.log(result);

    }
    const handleDownVote = async(e) =>{
        e.preventDefault();
        const result = await api.call(endpoints.downVote,config);
        console.log(result);

    }
    return <>
    {post &&post.map((elem,index)=>{ 
        return( <>
         <div className="avatar">
         <img src={`${elem.author.avatar}`} alt="avatar" />
         </div>
    <div key={elem._id} className="postInfo">
        <div  className="elemContainer">
            <h3 >{elem.title}</h3>

        </div>
        <div className="postContainer">
            <p>Posted by: {elem.author.username}</p>
            <p>{elem.textSubmission}</p>

        </div>
        {img && ( 
        <div className="image-here">
            <img src={img} className="image-onpost" alt="here" />
            
        </div>)}
        <div  className="buttons">
        <div className="post-date">
            <small >Date:{elem.createdAt.split('T')[0]}</small>

        </div>
        <div className="hearts">
       
            <FontAwesomeIcon size="lg" icon={elem.upvotedBy.includes(decoded._id) ? faHeart : regFaHeart} onClick={handleUpvote}/>
            {elem.points}
            <FontAwesomeIcon size="lg" icon={elem.downvotedBy.includes(decoded._id) ? faHeartCrack : faThumbsDown } onClick={handleDownVote}/>

        

      {(decoded._id===elem.author._id) && (<button onClick={handleEdit} id={elem._id}>Edit</button>) }
      {(decoded._id===elem.author._id || auth.role==='ADMIN') && (<button onClick={handleRemove} id={elem._id}>Remove</button>) }
      </div>
        </div>
    

    </div>
    <Comments key={elem._id}/>
    
    </>)})}
    </>


}
export default Posts;