import React from 'react';
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon, 
  ServicesH2,
  ServicesP,
} from './ServicesElements'
import almacena from '../../assets/almacena.svg';
import vende from '../../assets/vende.svg'; 
import estadistica from '../../assets/estadistica.svg';

const Services = () => {
  return (
    <ServicesContainer id="services">
      <ServicesH1>Our Services</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={almacena} />
          <ServicesH2>Reduce expenses</ServicesH2>
          <ServicesP>We hellp reduce your fess and increase your overall revenue.</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={vende} />
          <ServicesH2>Virtual Office</ServicesH2>
          <ServicesP>You can access our platform online anywhre in the world.</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={estadistica} />
          <ServicesH2>Premium Benefits</ServicesH2>
          <ServicesP>Unlock our special membership card that returns 5% cash back.</ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;
