import React, { Component } from 'react';
import firebase from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';
import '../../components/table/table.style.scss';
import { withRouter } from "react-router-dom";
import 'firebase/storage';
import Header from '../../components/headersign-n/headersign-in.component';
class CreateCategory extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('Categorias');
        this.state = {
            name: '',
            key: '',
            gridimage: ''
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
    /*onChangeprice = (e) => {
        const state = this.state
        state["price"] = e;
        this.setState(state);
    }*/

    onSubmit = (e) => {
        /*e.preventDefault();

        const { name, key, gridimage } = this.state;
        let file = this.state.imagestore;
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var uploadTask = storageRef.child('Categories/' + file.name).put(file);

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
                        name,
                        key,
                        gridimage
                    }).then((docRef) => {
                        this.setState({
                            name: '',
                            key: '',
                            gridimage: ''
                        });
                        this.props.history.push("/productos")
                    })
                        .catch((error) => {
                            console.error("Error adding document: ", error);
                        });
                })
            }
        )*/
    }

    render() {
        const { name, key, gridimage } = this.state;
        const prefix = '$';
        return (
            <div>
            <Header />
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            Añadir Categoría
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to="/categorias" class="btn btn-primary">Regresar</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="id">Id:</label>
                                <input type="text" class="form-control" name="id" value={name} onChange={this.onChange} placeholder="Id" />
                            </div>
                            <div class="form-group">
                                <label for="name">Nombre:</label>
                                <input type="text" class="form-control" name="name" value={key} onChange={this.onChange} placeholder="Nombre" />
                            </div>
                            <div class="form-group">
                                <label for="file">
                                    Escojer archivo:
                                </label>
                                <input type="file" class="form-control-file" id="file" onChange={this.handleChangeimage} />
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

export default withRouter(CreateCategory);
