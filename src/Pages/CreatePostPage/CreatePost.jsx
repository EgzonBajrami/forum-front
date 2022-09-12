import {useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom';

import {useSelector} from 'react-redux';

import {api,endpoints} from '../../Lib/Api'
import { getHeaderStructore } from '../../Lib/helpers/helpers';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Alert } from 'react-bootstrap';
import './CreatePost.css';



const CreatePost = () =>{
    const location = useLocation();
    const[title,setTitle] = useState('');
    const[content,setContent] = useState('');
    const[variant,setVariant] = useState();
    const[message,setMessage] = useState();

    const [img,setImg] = useState('');
    const auth = useSelector((state)=>state.auth.data);



    const config = {
        headers: getHeaderStructore(auth.token),
        params:[location.state.subforum],
       
        
      }
  
  
    console.log(location.state)

    
    const handleTitle = (e)=>{
        e.preventDefault();
        setTitle(e.currentTarget.value);
    }
    const handleContent = (e) =>{
        e.preventDefault();
        setContent(e.currentTarget.value);

    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const editConfig = {...config};
        const createData = [title,content,img];
        editConfig.data = createData;
        const result = await api.call(endpoints.createPost,editConfig);
        console.log(result);
        if(result.success){ 
    
          setVariant('success');
          setMessage('Post has been successfully created!')
        }
        if(!result.success){
          console.log('failed');
          setVariant('danger');
          setMessage('Post has not been created, something went wrong.')
        }
      
     

    }
    const handleImg = async (e) =>{
      e.preventDefault();
      setImg(e.currentTarget.value);
    }
    return <>
        {variant &&(<Alert variant={variant}>{message}</Alert>)}
    <div className="cont-div">
  
  
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

    </div>
    </>

}
export default CreatePost;