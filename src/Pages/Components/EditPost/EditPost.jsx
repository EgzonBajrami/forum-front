import {useState,useEffect} from 'react'
import {useLocation,useNavigate} from 'react-router-dom';
<<<<<<< HEAD

=======
import axios from 'axios';
>>>>>>> 8d35b154378bec18eddecf2a3856a99e28f5307a
import {useSelector} from 'react-redux';

import {api,endpoints} from '../../../Lib/Api'
import { getHeaderStructore } from '../../../Lib/helpers/helpers';
import './EditPost.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Alert} from 'react-bootstrap';



const EditPost = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const postId = location.pathname.split('/')[2];
    const auth = useSelector((state)=>state.auth.data);
    const postData = location.state.locationPost;
    const [post,setPost] = useState([]);
    const [title,setTitle] = useState(postData[0].title);
    const [content, setContent] = useState(postData[0].textSubmission);
    const [img,setImg] = useState(postData[0].imageSubmission);
    const [variant,setVariant] = useState('');
    const [message,setMessage] = useState('');
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

    })
    console.log(post);
    console.log(location.state)
    const sub = location.state.locationPost[0].subforum;
    console.log(sub);
    const pid = location.state.locationPost[0]._id;

    
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
        setVariant('success');
        setMessage('Your post has been edited!')

        setTimeout(()=>{
            console.log(result);
            navigate(`/subforums/${sub}/post/${pid}`)
          },3000);
      

        
    }
    return <>
    {variant ?(<Alert variant={variant}>{message}</Alert>) : 
    ( 
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
    ) }
    </>

}
export default EditPost;