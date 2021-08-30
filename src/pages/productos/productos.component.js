import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './productos.styles.scss';
import firebase from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';
import Header from '../../components/headersign-n/headersign-in.component';
class Productos extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('Products');
    this.unsubscribe = null;
    this.state = {
      boards: [],
      filterboards:[]
    };
  }
  myFunction=() => {
    var input = document.getElementById("myInput");
    const filterboards = this.state.boards.filter(
        x => x.name.toLowerCase() ===input.value.toLowerCase())
    console.log(filterboards);
     
    this.setState({
     filterboards
     
    });
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      console.log("Inside");
      console.log(doc);
      const { category, description, id, image, name, price } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        category,
        description,
        id,
        image,
        name,
        price
      });
    });
    this.setState({
      boards
    });
  }

  componentDidMount() {
    try {
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
      console.log("test1");
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
            Lista de Productos Disponibles
          </h3>
          <div className='panel-body'>
            <h4>
              <RouterLink to='/create' className='btn btn-primary '>Añadir Producto
              </RouterLink>
            </h4>
            <input type="text" id="myInput" onChange={this.myFunction}
          placeholder="Busca el producto" title="Type in a name">
          </input>
            <table className='table table-stripe spacebetween'>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>ImagenURL</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.filterboards.map(board =>
                    <tr>
                      <td>
                        <Link to={`/show/${board.key}`}>
                          {board.id}
                        </Link>
                      </td>
                      <td>{board.name}</td>
                      <td>{board.category}</td>
                      <td>{board.price}</td>
                      <td>{<img
                      className="ref"
                      src={board.image || "https://via.placeholder.com/400x300"}
                      alt="Uploaded Images"
                      height="75"
                      class="center"
                    />}</td>
                      <td>{board.description}</td>
  
                    </tr>
                  )
               }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
}
export default Productos;