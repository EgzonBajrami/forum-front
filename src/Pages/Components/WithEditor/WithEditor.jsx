import {EditorState, convertToRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {useSelector} from 'react-redux';
import {useLocation,useNavigate} from 'react-router-dom'
import {useState} from 'react';

import {api,endpoints} from '../../../Lib/Api'
import { getHeaderStructore } from '../../../Lib/helpers/helpers';
import Header from '../Header/Header'

const WithEditor = () =>{
    const navigate = useNavigate();

    const location = useLocation();
    const auth = useSelector((state)=>state.auth.data);
    

    
    const config = {
        headers: getHeaderStructore(auth.token),
        params:[location.state.subforum],
        
       
        
      }
    
    const [userInfo, setUserInfo] = useState({
        title:'',
      })
      const onChangeValue = (e) =>{
        setUserInfo({
          ...userInfo,
          [e.target.name]:e.target.value
        })
      }
      let editorState = EditorState.createEmpty();
      const [description,setDescription] = useState(editorState);
      const onEditorStateChange = (editorState) =>{
        setDescription(editorState);
      }
      const [isError,setError] = useState(null);
      const addDetails = async (e) =>{
        try{
          e.preventDefault();
          e.persist();
          if(userInfo.description.value.length <50){
            setError('Required, Add description minimum length 50 characters');
          }
          const editConfig = {...config};
          const createData = [userInfo.title,userInfo.description.value];
          console.log(userInfo.title);
          console.log(userInfo.description.value)
          editConfig.data = createData;
          const result = await api.call(endpoints.createPost,editConfig);
          console.log(result);
          if(result.success){ 
  
            setTimeout(()=>{
           
            
              navigate(`/subforums/${result.data.subforum}/post/${result.data._id}`)
            },3000);
  
        }
    }
        catch(err){
  
        }
      }
      return( 
        <>
        <Header />
          <div className="App">
    <div className="container">
      <div className="row"> 
        <form onSubmit={addDetails} className="update__forms">
          <h3 className="myaccount-content"> Add  </h3>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label className="font-weight-bold"> Title <span className="required"> * </span> </label>
              <input type="text" name="title" value={userInfo.title} onChange={onChangeValue}  className="form-control" placeholder="Title" required />
            </div>
            <div className="form-group col-md-12 editor">
              <label className="font-weight-bold"> Description <span className="required"> * </span> </label>
                <Editor 
                  editorState={description}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChange}
                />
                


              <textarea style={{display:'none',border:"1px solid black"}} disabled ref={(val) => userInfo.description = val} value={draftToHtml(convertToRaw(description.getCurrentContent())) } />
               
            </div>
            {isError !== null && <div className="errors"> {isError} </div>}
            <div className="form-group col-sm-12 text-right">
              <button type="submit" className="btn btn__theme"> Submit  </button>
            </div> 
          </div> 
        </form>
      </div>
    </div>
  </div>
        </>
       )
}
export default WithEditor;