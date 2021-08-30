import React, { Component } from 'react';
import firebase from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';
import './table.style.scss';
import { withRouter } from "react-router-dom";
import 'firebase/storage';
import Header from '../../components/headersign-n/headersign-in.component';
class Create extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('Products');
        this.state = {
            category: '',
            description: '',
            id: '',
            name: '',
            price: '',
            imagestore: null,
            progress: 0,
            downloadURL: null
        };
    }
    handleChangeimage = (e) => {
        if (e.target.files[0]) {
            this.setState({
                imagestore: e.target.files[0]
            })
        }
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    onChangeprice = (e) => {
        const state = this.state
        state["price"] = e;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { category, description, id, name, price } = this.state;
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
                    console.log("url working????");
                    console.log(url);
                    const image = url;
                    this.ref.add({
                        category,
                        description,
                        id,
                        image,
                        name,
                        price
                    }).then((docRef) => {
                        this.setState({
                            category: '',
                            description: '',
                            id: '',
                            image: '',
                            name: '',
                            price: ''
                        });
                        this.props.history.push("/productos")
                    })
                        .catch((error) => {
                            console.error("Error adding document: ", error);
                        });
                })
            }
        )
    }

    render() {
        const { category, description, id, name } = this.state;
        const prefix = '$';
        return (
            <div>
            <Header />
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            Añadir Producto
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to="/productos" class="btn btn-primary">Regresar</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="id">Id:</label>
                                <input type="text" class="form-control" name="id" value={id} onChange={this.onChange} placeholder="Id" />
                            </div>
                            <div class="form-group">
                                <label for="name">Nombre:</label>
                                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Nombre" />
                            </div>
                            <div class="form-group">
                                <label for="category">Categoría:</label>
                                <input type="text" class="form-control" name="category" value={category} onChange={this.onChange} placeholder="Categoría" />
                            </div>
                            <div class="form-group">
                                <label for="price">Precio:</label>
                                <CurrencyInput
                                    id="price"
                                    class="form-control"
                                    name="price"
                                    placeholder="Ingrese el precio (kg/u)"
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
                            </div>
                            <div class="form-group">
                                <label for="description">Decripción:</label>
                                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
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

export default withRouter(Create);
