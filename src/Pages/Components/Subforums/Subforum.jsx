
import './subforum.css'
import {useState,useEffect,useMemo} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import {api,endpoints} from '../../../Lib/Api'
import {useSelector} from 'react-redux';
import { getHeaderStructore } from '../../../Lib/helpers/helpers';
const Subforum = () =>{
    const navigate = useNavigate();
    const params = useParams();
    console.log(params.params);
    const auth = useSelector((state)=>state.auth.data);

    const config = useMemo(()=> {
      return{

        headers: getHeaderStructore(auth.token),
      }
       
       
        
      },[auth])
    const [subscribed,setSubscribed] = useState([])
    useEffect(() =>{
        const getForums = async() =>{
            const result = await api.call(endpoints.getSub,config)
            console.log(result);
          
            
            setSubscribed(result.message);
            
        }
        getForums();
    },[config]);
    if(!Array.isArray(subscribed)){
       
    }
   console.log(subscribed);
<<<<<<< HEAD
=======
   const clickHandler = (event) =>{
    event.preventDefault();
    console.log(event.target.id);
    const loc = event.target.id;
  
 
    
   }
>>>>>>> 8d35b154378bec18eddecf2a3856a99e28f5307a

    return <>
   
    
      
 
      <div id="wrapper">
      <div id="content-wrapper">
        <div id="content">
          <h4>Sub Forums </h4>
          <dl id="mobile-responsive">
          {subscribed &&subscribed.map((elem)=>{ 
            return( 
            <div className="get-id" key={elem._id} id={elem._id}  onClick={(e)=>{navigate(`/subforums/${elem._id}`)}}>
         
            <dt>{elem.subforumName}</dt>
            <dd>{elem.description} </dd>
            
            </div>

            )
           
})}
          </dl>

        </div>
      </div>
      <div id="sidebar-wrapper">
        <div id="sidebar">
          <h3>Forum Rules</h3>
          <ul id="mobile-respons" >
            <li>Spamming is not allowed.</li>
            <li>Be respectful towards other forum members.</li>
            <li>Don’t be offensive, abusive or cause harassment.</li>
            <li>Do not post content that is unsafe for work.</li>
            <li>This includes sexual, hateful, racist, homophobic, sexist, provocative or vulgar content.</li>

          </ul>
          
        </div>
      </div>

 

   
     
   
      


    </div>
    </>

}
export default Subforum;