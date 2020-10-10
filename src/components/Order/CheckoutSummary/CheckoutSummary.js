import React from 'react';
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
      <Button buttonType={'Fail'} clickHandler={}>Cancel</Button>
      <Button buttonType={'Success'} clickHandler={}>Continue</Button>
    </div>
  );
};

CheckoutSummary.propTypes = {
  ingredients: PropTypes.object.isRequired
};

export default CheckoutSummary;