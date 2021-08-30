import React, { useEffect, lazy, Suspense, useState } from 'react';
import HeroSection from './components/HeroSection'; 
import Sidebar from './components/Sidebar'; 
import './App.css';
import InfoSection from './components/InfoSection';
import Header from './components/header/header.component';
import {
  homeObjeOne, 
  homeObjeTwo, 
  homeObjeThree
} from './components/InfoSection/Data';
const Mainbody = ({}) => {
  const [state, setstate] = useState(false)
  const toggle = () => setstate(!state);
  return (
    <div>
    <Sidebar isOpen={state} toggle={toggle} />
    <Header toggle={toggle} />
    <HeroSection />
    <InfoSection {...homeObjeOne} />
    <InfoSection {...homeObjeTwo} />
    <InfoSection {...homeObjeThree} />
    </div>
  );
}; 

export default Mainbody;
