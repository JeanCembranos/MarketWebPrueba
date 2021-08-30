import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './almacen.styles.scss';
import firebase from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';
import Header from '../../components/headersign-n/headersign-in.component';
class Almacenar extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;
    this.state = {
      boards: [],
      filterboards:[]
    };
  } 
   myFunction=() => {
    var input = document.getElementById("myInput");
    const filterboards = this.state.boards.filter(
        x => x.email ===input.value &&x.tipo ==='Vendedor');
    console.log(filterboards);
    this.setState({
        filterboards
    });
  }
  

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { email,tipo } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        email,
        tipo
      });
    });
    this.setState({
      boards
    });
  }

  componentDidMount() {
    try {
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }
    catch (error) {
      console.log(error);
      console.log("test");
    }
  }
  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          <h3 className='panel-title'>
            Lista de Vendedores Disponibles
          </h3>
          <input type="text" id="myInput" onChange={this.myFunction}
          placeholder="Busca el email del vendedor" title="Type in a name">
          </input>
          <div className='panel-body'>
            <table className='table table-stripe spacebetween'>
              <thead>
                <tr>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {this.state.filterboards.map(board =>
                  <tr>
                    <td>
                      <Link to={`/showpedidosemail/${board.key}`}>
                        {board.email}
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
}
export default Almacenar;