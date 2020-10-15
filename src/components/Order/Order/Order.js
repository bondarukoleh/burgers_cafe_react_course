import React from 'react';
import PropTypes from 'prop-types';
import styles from './Order.module.scss';

const Order = (props) => {
  return (
    <div className={styles.Order}>
      <p>{`Ingredients: ${Object.entries(props.ingredients)
        .map(([key, value]) => `${key}: ${value}`).join(', ')}`}</p>
      <p>{`Price: ${props.price}`}</p>
    </div>
  );
}

Order.propTypes = {
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired
};

export default Order;