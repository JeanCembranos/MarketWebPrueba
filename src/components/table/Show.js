import React, { Component } from 'react';
import firebase from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';
import Header from '../../components/headersign-n/headersign-in.component';
class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: {},
      key: ''
    };
  }

  componentDidMount() {
    console.log(this.props);
    const ref = firebase.firestore().collection('Products').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          products: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      } 
    });
  }

  delete(id){
    firebase.firestore().collection('Products').doc(id).delete().then(() => {
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
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/productos" className='btn btn-primary'>Regresar</Link></h4>
            <h3 class="panel-title">
              {this.state.products.name}
            </h3>
          </div>
          <div class="panel-body">
            <dl> 
              <dt>Id:</dt>
              <dd>{this.state.products.id}</dd>
              <dt>Categoría:</dt>
              <dd>{this.state.products.category}</dd>
              <dt>Precio:</dt>
              <dd>{this.state.products.price}</dd>
              <dt>Imagen:</dt>
              <dd>{<img
                className="ref"
                src={this.state.products.image || "https://via.placeholder.com/400x300"}
                alt="Uploaded Images"
                height="75"
              />}</dd>
              <dt>Descripción:</dt>
              <dd>{this.state.products.description}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Editar</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Borrar</button>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Show;
