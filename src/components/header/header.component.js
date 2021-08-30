import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { signOutStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import { IconContext } from 'react-icons/lib';
import { animateScroll as scroll } from 'react-scroll';

import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks, 
  NavBtn, 
  NavBtnLink, 
  WebLinks
} from '../headersign-n/headersign-in.style';
const Header = ({
  toggle,
  currentUser,
  signOutStart
}) => {
  const [scrollNav, setScrollNav] = useState(false);
  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  }
  return (
    <IconContext.Provider value={{ color: '#fff' }}>
    <Nav scrollNav={scrollNav}>
    <NavbarContainer>
      <NavLogo to="/" onClick={toggleHome}>
      <div><img className= "sizelogo" src={require('../../assets/logo.svg').default} alt='logo' /></div>
      <div className= "push">PachaStore</div>   
      </NavLogo>
      <MobileIcon onClick={toggle}>
        <FaBars />
      </MobileIcon>
      <NavMenu> 
        {currentUser?(
          <NavItem >
            <WebLinks 
              to="/productos"
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
            >
              {'Productos'}
            </WebLinks>
          </NavItem>
        )
        :null}
        {currentUser?(
          <NavItem >
          <WebLinks 
            to="/almacenar"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
          >
            {'Almacenar'}
          </WebLinks>
        </NavItem>
        )
        :null}
         {currentUser?(
          <NavItem >
          <WebLinks 
            to="/categorias"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
          >
            {'Categorías'}
          </WebLinks>
        </NavItem>
        )
        :null}
        
      </NavMenu>
      <NavBtn>
        {currentUser?(
        <NavBtnLink onClick={signOutStart}>Salir </NavBtnLink>
        ):(
          <NavBtnLink to="/signin">Ingresar</NavBtnLink>
        )}
      </NavBtn>
    </NavbarContainer>
  </Nav>
  </IconContext.Provider>
  )
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})
const mapDispatchToProps = dispatch =>({
  signOutStart: ()=> dispatch(signOutStart())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);