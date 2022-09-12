import { useEffect,useState } from "react";
import {useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {api,endpoints} from '../../Lib/Api'
import { getHeaderStructore } from '../../Lib/helpers/helpers';
import {useLocation,useNavigate} from 'react-router-dom'
import './ProfilePage.css'
import ProfileComments from "../Components/ProfileComments/ProfileComments";
import ProfilePosts from "../Components/ProfilePosts/ProfilePosts";

const ProfilePage = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.pathname.split('/')[2];
    console.log(userId);
    const auth = useSelector((state)=>state.auth.data);
    const config = {
        headers: getHeaderStructore(auth.token),
        params:[userId],
       
        
      }
      const [data,setData] = useState();
      const [displayComments, setDisplayComments] = useState(false);
      const [displayPosts,setDisplayPosts] = useState(false);

      
    useEffect(()=>{
        const getUser = async() =>{
            const result = await api.call(endpoints.getUser, config);
            console.log(result);
            setData(result.data);

        }
        getUser();


    },[])
    console.log(data);
    const handleEdit = (e) =>{
        e.preventDefault();
        navigate(`/editProfile/${userId}`,{state:{profileData:data}} )
        

    }
    const handleComments = (e)=>{
        e.preventDefault();
        setDisplayComments(true);
        setDisplayPosts(false);
    }
    const handlePosts = (e) =>{
        e.preventDefault();
        setDisplayPosts(true);
        setDisplayComments(false);
    }
    return <>
    {data &&( 
        <>
    <div className="profile-stats">
        <div>
        <img src="https://imgur.com/WP6Xmtl.png" className="avatar-img"/>
        </div>
        <div>
        <p>{data.firstName} {data.lastName}</p>
        <p>Email: {data.email}</p>
        <p>Account was created at: {data.createdAt.split('T')[0]}</p>
        <p>Age: {data.age}</p>
        </div>
       
        

    </div>
    <button className="edit-btn" onClick={handleEdit}>Edit your profile</button>
    <div className="user-info">
        <div className="move-one">

        <h4>User statistics: </h4>
        </div>
        <div className="move-two">

        
        <button className="comments-btn" onClick={handleComments}>Comments</button>
        <button className="posts-btn" onClick={handlePosts}>Posts</button>
        </div>

    </div>
    <div className="content-info">
        {displayComments && (<ProfileComments userId={userId}/>)}
        {displayPosts && (<ProfilePosts userId={userId}/>)}

    </div>
    
    
    </>
    )}
   
    
    </>

}
export default ProfilePage;