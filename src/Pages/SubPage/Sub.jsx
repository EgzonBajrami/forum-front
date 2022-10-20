import { useEffect,useState,useMemo } from 'react';
import {useLocation,Link,useNavigate} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {api,endpoints} from '../../Lib/Api'
import { getHeaderStructore } from '../../Lib/helpers/helpers';
import {useSelector} from 'react-redux'
import Header from '../Components/Header/Header'
import './Sub.css'

const Sub = () =>{
    const location = useLocation();
    const navigate = useNavigate();
   const sub = location.pathname.split('/')[2];
   console.log(sub);
   const auth = useSelector((state)=>state.auth.data);
   const config = useMemo(()=>{
    return{

        headers: getHeaderStructore(auth.token),
        params:[sub],
       
    }
    
  },[auth,sub])
  

   const [currentSub,setCurrentSub] = useState();

   const [postArray, setPostArray] = useState([]);

   useEffect(()=>{
    const getSub = async () =>{
        const result = await api.call(endpoints.getForumPosts,config)
        console.log(result.data);
        setCurrentSub([result.data]);
       

       
    }
    const getForum = async () =>{
        const result = await api.call(endpoints.getSubPosts,config)
        console.log(result);
        setPostArray(result.data)
    
       

       
    }
  
 
  
    getSub();
    getForum();
   
 

   },[config])
 
   console.log(currentSub);

   console.log(postArray);
   
   
 
  

  

   const createPostHandler = (e)=>{
    e.preventDefault();
    if(currentSub){

        navigate(`/subforums/${sub}/createPost/`,{state:{subforum:sub}})
    }

    
   }
   
 
  
   
    return<>
    <Header />
    
    <div className="subheader">
        {currentSub &&
             (<ul className="subUl">
            <h3>{currentSub[0].subforumName}
            <br></br>
            <br></br>
            {currentSub[0].description}</h3>
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
postArray && postArray.map((elem)=>{
                return ( 
                
                    <Link to={{pathname:`/subforums/${sub}/post/${elem._id}`}}>
                            {elem.author &&( 
                  <div className="posts">
                    <div className="contains-image">
                     {elem.author && (
                        <img src={elem.author.avatar} alt="" />
                     )}
                    </div>
                    <div className="info-container">
                        <div>
                           <h4 className="remove-space"> {elem.title}</h4>
                        </div>
                        <div className="postContainer" dangerouslySetInnerHTML={{__html:elem.textSubmission}} />
                        <div className="info-post">
                            <div className="author-info">
                                <p>Posted by:{elem.author.username}</p>

                            </div>
                            <div className="post-info">
                                <p>Upvotes:{elem.upvotedBy.length - elem.downvotedBy.length}</p>
                                <p className="created-date">Posted at:{elem.createdAt.split('T')[0]} </p>
             
                            </div>

       
                        </div>
                    </div>
                  </div>
                  )}
                </Link>)
            })
        } 
     
            </div>) }</>

}
export default Sub;