import React, {Component} from "react";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
  state = {
    modalShow: true
  };

  toggleShowModal() {
    this.setState((prevState) => {
      return {
        modalShow: !prevState.modalShow
      };
    });
  }

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <Modal closed={() => this.toggleShowModal()} show={this.state.modalShow}/>
        <Backdrop show={this.state.modalShow}/>
        <button className="Button" onClick={() => this.toggleShowModal()}>Open Modal</button>
        <h3>Animating Lists</h3>
        <List/>
      </div>
    );
  }
}

export default App;
