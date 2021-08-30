import React, { useState } from 'react';
import {
  HeroBg,
  HeroContainer,
  VideoBg,
  HeroContent, 
  HeroH1, 
  HerorP, 
  HeroBtnWrapper, 
  ArrowForward, 
  ArrowRight, 
} from './HeroElements';
import {
  Button, 
} from '../ButtonElements'; 
import Video from '../../assets/pachastore.mp4';

const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => setHover(!hover);

  return (
    <HeroContainer id="home">
      <HeroBg>
        <VideoBg autoPlay loop src={Video} type='video/mp4' />
      </HeroBg>
      <HeroContent>
        <HeroH1>PachaStore by DRIJET</HeroH1>
        <HeroBtnWrapper>
          <Button 
            to="signup" 
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            primary="true"
            dark="true"
          >
            Website oficial de DRIJET {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
