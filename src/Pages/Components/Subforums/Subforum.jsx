import axios from 'axios'
import './subforum.css'
import {useState,useEffect} from 'react';
import {useParams,useNavigate,Link} from 'react-router-dom';
import {api,endpoints} from '../../../Lib/Api'
import {useSelector} from 'react-redux';
import { getHeaderStructore } from '../../../Lib/helpers/helpers';
const Subforum = () =>{
    const navigate = useNavigate();
    const params = useParams();
    console.log(params.params);
    const auth = useSelector((state)=>state.auth.data);

    const config = {
        headers: getHeaderStructore(auth.token),
       
       
        
      }
    const [subscribed,setSubscribed] = useState([])
    useEffect(() =>{
        const getForums = async() =>{
            const result = await api.call(endpoints.getSub,config)
            console.log(result);
            const data = result.data;
            
            setSubscribed(result.message);
            
        }
        getForums();
    },[]);
    if(!Array.isArray(subscribed)){
       
    }
   console.log(subscribed);
   const clickHandler = (event) =>{
    event.preventDefault();
    const loc = event.target.id;
    navigate(`/subforums/${loc}`)
 
    console.log(event.target.id);
    
   }

    return <>
    <div className="subforum">
    {subscribed &&subscribed.map((elem)=>{
      
 
    return ( <ul key={elem._id} id={elem._id} onClick={clickHandler}><> <li id={elem._id}>{elem.subforumName}</li>
       <li id={elem._id}>{elem.description}</li></>
       </ul>
    )

      })}
     
   
      


    </div>
    </>

}
export default Subforum;