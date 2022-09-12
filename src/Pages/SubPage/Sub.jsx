import { useEffect,useState } from 'react';
import {useLocation,Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {api,endpoints} from '../../Lib/Api'
import { getHeaderStructore } from '../../Lib/helpers/helpers';
import {useSelector} from 'react-redux'

import './Sub.css'

const Sub = () =>{
    const location = useLocation();
    const navigate = useNavigate();
   const sub = location.pathname.split('/')[2];
   console.log(sub);
   const auth = useSelector((state)=>state.auth.data);
   const config = {
    headers: getHeaderStructore(auth.token),
    params:[sub],
   
    
  }
  

   const [currentSub,setCurrentSub] = useState();
   const [dummyPosts, setDummyPosts] = useState();
   const [postArray, setPostArray] = useState([]);
   const [newArray,setNewArray] = useState();
   useEffect(()=>{
    const getSub = async () =>{
        const result = await api.call(endpoints.getForumPosts,config)
        console.log(result.data);
        setCurrentSub(result.data);
       

       
    }
 
  
    getSub();
   
 

   },[])
   console.log(currentSub);
 
  

  

   const createPostHandler = (e)=>{
    e.preventDefault();
    if(currentSub){

        navigate(`/subforums/${sub}/createPost/`,{state:{subforum:sub}})
    }

    
   }
   
 
  
   
    return<>
    
    <div className="subheader">
        {currentSub &&
             (<ul className="subUl">
            <h3>{currentSub.subforumName}</h3>
            <h3>{currentSub.description}</h3>
            </ul>)
        
            
        }
        </div>
        {currentSub &&( 
        <div className="add-post" onClick={createPostHandler}>
            <FontAwesomeIcon size="lg" icon={faPlus} />
            <h4>Create a new post</h4>
        </div>
        )}
        {currentSub &&( 
        <div className="subcontent">
            {
currentSub.posts && currentSub.posts.map((elem)=>{
                return ( 
                    <Link to={{pathname:`/subforums/${sub}/post/${elem._id}`}}>
                <ul className="posts">
                    <div className="contains-posts">
                        
                      
                    
                 
                    <div className="info-post">

                    <li className="listforPost">{elem.title}</li>
                    </div>
        
                   
                    <div className="under-info">
                      <li className="get-info">
                     {elem.textSubmission.slice(0,50)}</li>
                  
                     
                    </div>
                    </div>
                    
                    
                </ul>
                </Link>)
            })
        } 
     
            </div>) }</>

}
export default Sub;