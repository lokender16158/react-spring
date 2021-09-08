import {React, useEffect, useState} from 'react';
import './App.css';
import Header from './Header';
import AppsAdmin from './myAppsAdmin/AppsAdmin';
import AppsWeb from './myapps/AppsWeb';



const App = () => {

  


  const isAdmin = true;

  const adminContent = <AppsAdmin/>;

  const webContent = <AppsWeb/>;


  return (

  <><Header/><br/><br/>{isAdmin ? adminContent : webContent}</>
  
  );
  
};

export default App;

