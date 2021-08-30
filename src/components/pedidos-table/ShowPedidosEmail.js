import React, { Component } from 'react';
import firebase from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';
import Header from '../../components/headersign-n/headersign-in.component';
class ShowPedidosEmail extends Component {

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('Oferta');
    this.unsubscribe = null;
    this.state = {
      products: {},
      key: '',
      filterboards: []
    };
  }
  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { id, cantidad, clase, cosecha, disponibilidad, expiracion, medicion, precio, preciokg, tipo } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        id,
        tipo,
        cantidad,
        medicion,
        precio,
        preciokg,
        cosecha,
        expiracion,
        clase,
        disponibilidad

      });
    });
    const filterboards = boards.filter(
      x => x.id === this.props.match.params.id);
    this.setState({
      filterboards
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

  delete(id) {
    firebase.firestore().collection('Oferta').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/productos")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
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
            <table className='table table-stripe spacebetween'>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Medición</th>
                  <th>Precio Total</th>
                  <th>Precio (kg/u)</th>
                  <th>Cosecha</th>
                  <th>Expiración</th>
                  <th>Tipo</th>
                  <th>Disponibilidad</th>
                </tr>
              </thead>
              <tbody>
                {this.state.filterboards.map(board =>
                  <tr>
                    <td>
                      <Link to={`/showpedidos/${board.key}`}>
                        {board.tipo}
                      </Link>
                    </td>
                    <td>{board.cantidad}</td>
                    <td>{board.medicion}</td>
                    <td>{board.precio}</td>
                    <td>{board.preciokg}</td>
                    <td>{String(new Date(board.cosecha.toDate()).toLocaleDateString())}</td>
                    <td>{String(new Date(board.expiracion.toDate()).toLocaleDateString())}</td>
                    <td>{board.clase}</td>
                    <td>{board.disponibilidad.toString()}</td>
  
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

export default ShowPedidosEmail;
