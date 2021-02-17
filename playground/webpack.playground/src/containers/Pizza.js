import React, { Component } from 'react';

import PizzaComponent from '../components/Pizza/PizzaComponent';

class Pizza extends Component {
  render () {
    return (
      <div>
        <h1>The Pizza</h1>
        <PizzaComponent />
      </div>
    );
  }
}

export default Pizza;