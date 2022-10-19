import './Home.css'

import Subforum from '../Components/Subforums/Subforum'
import Header from '../Components/Header/Header'




function Home() {
  return (<>
  <Header />
   <div className="containner">
    
    <div className="subs">
      <Subforum />

    </div>
   

   </div>

  
    </>
  );
}

export default Home;