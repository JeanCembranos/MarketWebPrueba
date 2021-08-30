import React from 'react';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import { SignInAndSignUpContainer } from './sign-in-and-sign-up.styles';
import Header from '../../components/header/header.component';
import '../../pages/productos/productos.styles.scss';
const SignInAndSignUpPage = () => (
  <div className= "pushsignin">
  <Header />
  <SignInAndSignUpContainer>
    <SignIn />
    <SignUp />
  </SignInAndSignUpContainer>
  </div>
);

export default SignInAndSignUpPage;
