import React, { Component } from 'react';
import firebase from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';
import Header from '../../components/headersign-n/headersign-in.component';
class ShowPedidos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: {},
      key: '',
      cosecha:'',
      expiracion:''
    };
  }
 
  componentDidMount() {
    console.log(this.props);
    const ref = firebase.firestore().collection('Oferta').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          products: doc.data(),
          key: doc.id,
          isLoading: false,
          cosecha:String(new Date(doc.data().cosecha.toDate()).toLocaleDateString()),
          expiracion:String(new Date(doc.data().expiracion.toDate()).toLocaleDateString()),
        });
        
        console.log(String(new Date(doc.data().expiracion.toDate()).toLocaleDateString()));
      } else {
        console.log("No such document!");
      } 
    });
  }

  delete(id){
    firebase.firestore().collection('Oferta').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/almacenar")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    console.log("asda");
    //console.log(String(this.state.myproducts.cosecha.toDate()));

    //console.log(new Date(this.state.products.cosecha.seconds * 1000).toLocaleDateString("en-US"));
    //console.log(new Date(this.state.products.cosecha * 1000).toLocaleDateString("en-US"));
    return (
      <div>
      <Header />
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/almacenar" className='btn btn-primary'>Regresar</Link></h4>
            <h3 class="panel-title">
              {this.state.products.name}
            </h3>
          </div>
          <div class="panel-body">
            <dl> 
              <dt>Cantidad:</dt>
              <dd>{this.state.products.cantidad}</dd>
              <dt>Medición:</dt>
              <dd>{this.state.products.medicion}</dd>
              <dt>Precio Total:</dt>
              <dd>{this.state.products.precio}</dd>
              <dt>Precio (kg/u):</dt>
              <dd>{this.state.products.preciokg}</dd>
              <dt>Cosecha:</dt>
              <dd>{this.state.cosecha}</dd>
              <dt>Expiración:</dt>
              <dd>{this.state.expiracion}</dd>
              <dt>Tipo:</dt>
              <dd>{this.state.products.clase}</dd>
              <dt>Disponibilidad:</dt>
              <dd>{this.state.products.disponibilidad+""}</dd>
            </dl>
            <Link to={`/editpedidos/${this.state.key}`} class="btn btn-success">Editar</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Borrar</button>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default ShowPedidos;
