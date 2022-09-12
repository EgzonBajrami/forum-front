import {useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {api,endpoints} from '../../../Lib/Api'
import { getHeaderStructore } from '../../../Lib/helpers/helpers';
import './EditPost.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



const EditPost = () =>{
    const location = useLocation();
    const postId = location.pathname.split('/')[2];
    const auth = useSelector((state)=>state.auth.data);
    const postData = location.state.locationPost;
    const [post,setPost] = useState([]);
    const [title,setTitle] = useState(postData[0].title);
    const [content, setContent] = useState(postData[0].textSubmission);
    const [img,setImg] = useState(postData[0].imageSubmission);
    const config = {
        headers: getHeaderStructore(auth.token),
        params:[postId],
       
        
      }
    useEffect(()=>{
        const getPost = async () =>{
            const result = await api.call(endpoints.getPost,config);
 
            setPost([result.data]);

        }
        getPost();

    },[])
    console.log(post);
    console.log(location.state)

    
    const handleTitle = (e)=>{
        e.preventDefault();
        setTitle(e.currentTarget.value);
    }
    const handleContent = (e) =>{
        e.preventDefault();
        setContent(e.currentTarget.value);

    }
    const handleImg = (e) =>{
        setImg(e.currentTarget.value);
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const editConfig = {...config};
        const postData = [title,content,img];
        editConfig.data = postData;
        const result = await api.call(endpoints.editPost,editConfig);
        console.log(result);
    }
    return <>
    <div className="cont-div">
        {post && 
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Post title:</Form.Label>
        <input
        type="text"
        required
        className="form-control"
        value={title}
        onChange={handleTitle} 
        />
      </Form.Group>
      <Form.Group 
      className="mb-3" 
      controlId="exampleForm.ControlTextarea1">
        <Form.Label>Post content:</Form.Label>
        <textarea
        type="text"
        required
        rows="15"
        className="form-control"
        value={content}
        onChange={handleContent} 
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Post Image:</Form.Label>
        <input
        type="text"
    
        className="form-control"
        value={img}
        onChange={handleImg} 
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
        
    </Form>
}
    </div>
    </>

}
export default EditPost;