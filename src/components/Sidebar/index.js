import React from 'react';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper, 
  SidebarMenu, 
  SidebarLink, 
  SideBtnWrap, 
  SidebarRoute, 
} from './SidebarElement'

const Sidebar = ({
  isOpen, 
  toggle,
  currentUser 
}) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="comercializacion" onClick={toggle}>
          Comercialización
          </SidebarLink>
          <SidebarLink to="equilibrio" onClick={toggle}>
          Analiza el mercado
          </SidebarLink>
          <SidebarLink to="ganancias" onClick={toggle}>
          Visualización
          </SidebarLink>
          {currentUser?(
          <SidebarRoute to="/productos" onClick={toggle}>
            Almacén
          </SidebarRoute>
          )
          :null}

        </SidebarMenu>

        <SideBtnWrap>
        {currentUser?(
          <SidebarRoute to="/signout">Salir</SidebarRoute>
          ):(
            <SidebarRoute to="/signin">Ingresar</SidebarRoute>
          )}
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})
export default connect(
  mapStateToProps
)(Sidebar);
