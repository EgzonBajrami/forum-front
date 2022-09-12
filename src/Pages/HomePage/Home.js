import './Home.css'
import {Link} from 'react-router-dom'
import Subforum from '../Components/Subforums/Subforum'




function Home() {
  return (<>
  <div className="hmImg">
  <img className="homeImage"  src="https://imgur.com/99XjHxi.png"></img>
  </div>
   

    <div className="hmImg">
    <h3>Subforums</h3>
    </div>
    <div className="subs">
      <Subforum />

    </div>
   
  
    </>
  );
}

export default Home;