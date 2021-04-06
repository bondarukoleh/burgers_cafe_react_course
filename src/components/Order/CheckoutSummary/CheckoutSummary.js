import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './CheckoutSummary.module.scss'
import Burger from "../../Burger/Burger";

const CheckoutSummary = props => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div className={styles.BurgerWrap}>
        <Burger ingredients={props.ingredients}/>
      </div>
    </div>
  );
};

CheckoutSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
};

export default withRouter(CheckoutSummary);
