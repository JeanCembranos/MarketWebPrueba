import React, { useEffect, lazy, Suspense, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Sidebar from './components/Sidebar';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
import Footer from './components/Footer';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Productos from './pages/productos/productos.component';
import Create from './components/table/create';
import Edit from './components/table/Edit';
import Show from './components/table/Show';
import EditPedidos from './components/pedidos-table/EditPedidos';
import ShowPedidosEmail from './components/pedidos-table/ShowPedidosEmail';
import ShowPedidos from './components/pedidos-table/ShowPedidos';
import  Almacenar  from './pages/almacen/almacen.component';
import  Categorias  from './pages/Categorias/categorias.component';
import  CreateCategory  from './pages/Categorias/CreateCategory';
const SignInAndSignUpPage = lazy(() =>
  import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const Mainbody = lazy(() => import('./mainbody'));
const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession])
  return (
    <div>
      <Switch>
        <ErrorBoundary> 
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={Mainbody} />
            <Route
              exact
              path='/signin'
              render={() =>
                currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
              }
            />
            <Route exact path='/productos' render={() =>
              <Productos />
            }
            />
            <Route exact path='/almacenar' render={() =>
              <Almacenar />
            }
            />
            <Route exact path='/create' render={() =>
              <Create />
            }
            />
            <Route exact path='/categorias' render={() =>
              <Categorias />
            }
            />
             <Route exact path='/createcateg' render={() =>
              <CreateCategory />
            }
            />
            <Route path='/edit/:id' component={Edit}/>
            <Route path='/show/:id' component={Show}/>
            <Route path='/showpedidosemail/:id' component={ShowPedidosEmail}/>
            <Route path='/editpedidos/:id' component={EditPedidos}/>
            <Route path='/showpedidos/:id' component={ShowPedidos}/>
          </Suspense>
        </ErrorBoundary>
      </Switch>
      <Footer />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
