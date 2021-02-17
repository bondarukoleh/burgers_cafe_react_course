import React from 'react';

import classes from './Pizza.css';
import PizzaImg from '../../assets/pizza.jpg';

/* Super dumb - but we are trying the webpack */
const pizzaImage = (props) => (
  <div className={classes.Pizza}>
    <img src={PizzaImg} className={classes.PizzaImg} alt="pizza.img" />
  </div>
);

export default pizzaImage;