import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './CheckoutSummary.module.scss'
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const CheckoutSummary = props => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div className={styles.BurgerWrap}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <div className={styles.Controls}>
        <Button buttonType={'Fail'} clickHandler={props.checkoutCanceled}>Cancel</Button>
        <Button buttonType={'Success'} clickHandler={props.checkoutContinued}>Continue</Button>
      </div>
    </div>
  );
};

CheckoutSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  checkoutContinued: PropTypes.func.isRequired,
  checkoutCanceled: PropTypes.func.isRequired
};

export default withRouter(CheckoutSummary);