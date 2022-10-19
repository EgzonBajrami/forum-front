import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import { Provider } from 'react-redux';
import store from './Lib/store';
import { routeData } from './Lib/Routes/RouteData'
import PrivateRoutes from './Lib/Routes/PrivateRoutes'
import PublicRoutes from './Lib/Routes/PublicRoutes'



function App() {

  

  return <>
<Provider store={store}>
  <Router>


   
  



<Routes>

  {routeData.public.map((elem, index) => (
            <Route key={index} path={elem.path} element={<PublicRoutes>{elem.element}</PublicRoutes>} />
          ))}
          {routeData.admin.map((elem, index) => (
            <Route key={index} path={elem.path} element={<PrivateRoutes role="ADMIN">{elem.element}</PrivateRoutes>} />
          ))}
            {routeData.user.map((elem, index) => (
            <Route key={index} path={elem.path} element={<PrivateRoutes role="USER">{elem.element}</PrivateRoutes>} />
          ))}
          {routeData.exposed.map((elem, index) => (
            <Route key={index} path={elem.path} element={elem.element} />
          ))}


  </Routes>


          
 
</Router>
</Provider>
</>
}

export default App;