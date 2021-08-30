import React, { Component } from 'react';
import firebase from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';
import Header from '../../components/headersign-n/headersign-in.component';
class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      category: '',
      description: '',
      id: '',
      name: '',
      price: '',
      image: '',
      imagestore: null,
      progress: 0,
      downloadURL: null
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('Products').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          category: board.category,
          description: board.description,
          id: board.id,
          image: board.image,
          name: board.name,
          price: board.price
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  handleChangeimage = (e) => {
    if (e.target.files[0]) {
      this.setState({
        imagestore: e.target.files[0]
      })
    }
  }
  onChangeprice = (e) => {
    const state = this.state
    state["price"] = e;
    this.setState(state);
}
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({ board: state });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { category, description, id, image,name, price } = this.state;

    const updateRef = firebase.firestore().collection('Products').doc(this.state.key);
    if (this.state.imagestore !== null) {
      let file = this.state.imagestore;
      var storage = firebase.storage();
      var storageRef = storage.ref();
      var uploadTask = storageRef.child('Products/' + file.name).put(file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 100
          this.setState({ progress })
        }, (error) => {
          throw error
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            const image = url;
            updateRef.set({
              category,
              description,
              id,
              image,
              name,
              price
            }).then((docRef) => {
              this.setState({
                key: '',
                category: '',
                description: '',
                id: '',
                image: '',
                name: '',
                price: ''
              });
              this.props.history.push("/show/" + this.props.match.params.id)
            })
              .catch((error) => {
                console.error("Error adding document: ", error);
              });

          })
        }
      )
    }
    else {
      updateRef.set({
        category,
        description,
        id,
        name,
        image,
        price
      }).then((docRef) => {
        this.setState({
          key: '',
          category: '',
          description: '',
          id: '',
          image: '',
          name: '',
          price: ''
        });
        this.props.history.push("/show/" + this.props.match.params.id)
      })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  }

  render() {
    const prefix = '$';
    return (
      <div>
      <Header />
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Editar Producto
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Regresar</Link></h4>
            <form onSubmit={this.onSubmit}>
            <div class="form-group">
            <label for="id">ID:</label>
            <input type="text" class="form-control" name="id" value={this.state.id} onChange={this.onChange} placeholder="ID" />
          </div>
              <div class="form-group">
                <label for="name">Nombre:</label>
                <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Nombre" />
              </div>
              <div class="form-group">
                <label for="category">Categoría:</label>
                <input type="text" class="form-control" name="category" value={this.state.category} onChange={this.onChange} placeholder="Categoría" />
              </div>
              <div class="form-group">
                <label for="price">Precio:</label>
                <CurrencyInput
                  id="price"
                  class="form-control"
                  name="price"
                  placeholder="Ingrese el precio (kg/u)"
                  value={this.state.price}
                  decimalsLimit={2}
                  prefix={prefix}
                  onValueChange={this.onChangeprice}
                />
              </div>
              <div class="form-group">
                <label for="file">
                  Escojer archivo:
                </label>
                <input type="file" class="form-control-file" id="file" onChange={this.handleChangeimage} />
                <img
                  className="ref"
                  src={this.state.image || "https://via.placeholder.com/400x300"}
                  alt="Uploaded Images"
                  height="75"
                />
              </div>
              <div class="form-group">
                <label for="description">Decripción:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{this.state.description}</textArea>
              </div>
              <button type="submit" class="btn btn-success">Finalizar</button>
            </form>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Edit;
