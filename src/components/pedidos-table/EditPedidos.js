import React, { Component } from 'react';
import firebase from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import est from "date-fns/locale/es";
import Header from '../../components/headersign-n/headersign-in.component';
registerLocale("est", est);

class EditPedidos extends Component {

  constructor(props) {
    super(props);

    this.state = {
      key: '',
      category: '',
      description: '',
      id: '',
      image: '',
      name: '',
      price: '',
      cosechacloud: new Date(),
      expiracioncloud: new Date(),
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('Oferta').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          id: board.id,
          tipo: board.tipo,
          cantidad: board.cantidad,
          medicion: board.medicion,
          precio: board.precio,
          preciokg: board.preciokg,
          clase: board.clase,
          disponibilidad: board.disponibilidad,
          cosechacloud: new Date(doc.data().cosecha.toDate()),
          expiracioncloud: new Date(doc.data().expiracion.toDate()),
          //startDate: Date(board.cosecha.toDate())
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({ board: state });
  }
  onChangeprice = (e) => {
    const state = this.state
    state["price"] = e;
    this.setState(state);
  }
  handleChange(date) {
    this.setState({
      cosechacloud: date
    })
  }
  handleChange1(date) {
    this.setState({
      expiracioncloud: date
    })
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.startDate)
  }
  onSubmit = (e) => {
    e.preventDefault();

    const { id, cantidad, clase, medicion, precio, preciokg, tipo } = this.state;
    const cosecha =this.state.cosechacloud;
    const expiracion = this.state.expiracioncloud;
    let disponibilidad = true;
    const updateRef = firebase.firestore().collection('Oferta').doc(this.state.key);
    var fchecked = document.getElementById("flexRadioDefault1").checked;
    fchecked ? disponibilidad = false: disponibilidad=true;
    updateRef.set({
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
    }).then((docRef) => {
      this.setState({
        key: '',
        id: '',
        tipo: '',
        cantidad: '',
        medicion: '',
        precio: '',
        preciokg: '',
        cosecha: '',
        expiracion: '',
        clase: '',
        disponibilidad: '',
      });
      this.props.history.push("/showpedidos/" + this.props.match.params.id)
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
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
            <h4><Link to={`/showpedidos/${this.state.key}`} class="btn btn-primary">Regresar</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="tipo">Producto:</label>
                <input type="text" class="form-control" name="tipo" value={this.state.tipo} onChange={this.onChange} placeholder="Producto" />
              </div>
              <div class="form-group">
                <label for="cantidad">Cantidad:</label>
                <input type="text" class="form-control" name="cantidad" value={this.state.cantidad} onChange={this.onChange} placeholder="Cantidad" />
              </div>
              <div class="form-group">
                <label for="medicion">Medición:</label>
                <input type="text" class="form-control" name="medicion" value={this.state.medicion} onChange={this.onChange} placeholder="Medición" />
              </div>
              <div class="form-group">
                <label for="precio">Precio total:</label>
                <CurrencyInput
                  id="precio"
                  class="form-control"
                  name="precio"
                  placeholder="Precio total"
                  value={this.state.precio}
                  decimalsLimit={2}
                  prefix={prefix}
                  onValueChange={this.onChangeprice}
                />
              </div>
              <div class="form-group">
                <label for="precio">Precio total:</label>
                <CurrencyInput
                  id="preciokg"
                  class="form-control"
                  name="preciokg"
                  placeholder="Precio (kg/u))"
                  value={this.state.preciokg}
                  decimalsLimit={2}
                  prefix={prefix}
                  onValueChange={this.onChangeprice}
                />
              </div>
              <div class="form-group">
                <label for="tipo">Tipo:</label>
                <input type="text" class="form-control" name="tipo" value={this.state.clase} onChange={this.onChange} placeholder="Tipo" />
              </div>
              <div class="form-group">
                <label for="cosecha">Cosecha:</label>
              </div>
              <DatePicker
                selected={this.state.cosechacloud}
                onChange={this.handleChange}
                name="cosecha"
                dateFormat="MM/dd/yyyy"
                locale='est'
              />
              <div class="form-group">
                <label for="expiracion">Expiración:</label>
              </div>
              <DatePicker
                selected={this.state.expiracioncloud}
                onChange={this.handleChange1}
                name="expiracion"
                dateFormat="MM/dd/yyyy"
                locale='est'
              />

              <div class="form-group">
                <label for="disponibilidad">Disponibilidad:</label>
                {this.state.disponibilidad ?
                  <div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" value={"fchecked"}  name="flexRadioDefault" id="flexRadioDefault1" />
                      <label class="form-check-label" for="flexRadioDefault1">
                        Falso
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input"  value={"vchecked"} type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                      <label class="form-check-label" for="flexRadioDefault2">
                        Verdadero
                      </label>
                    </div>
                  </div>
                  :
                  <div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" value={"fchecked"}  name="flexRadioDefault" id="flexRadioDefault1" checked />
                      <label class="form-check-label" for="flexRadioDefault1">
                        Falso
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" value={"vchecked"} name="flexRadioDefault" id="flexRadioDefault2" />
                      <label class="form-check-label" for="flexRadioDefault2">
                        Verdadero
                      </label>
                    </div>
                  </div>}
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

export default EditPedidos;
