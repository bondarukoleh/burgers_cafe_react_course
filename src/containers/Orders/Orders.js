import React, {Fragment, useEffect, useState} from 'react';
import Order from "../../components/Order/Order/Order";
import {axiosRequest} from "../../helpers/api";
import styles from './Orders.module.scss';
import {Link} from "react-router-dom";

function Orders(props) {
  const [state, setState] = useState({orders: {}});

  useEffect(() => {
    axiosRequest.get('/orders.json')
      .then(r => {
        // TODO: filter by user
        setState({orders: r.data})
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderOrders = () => {
    const orders = Object.entries(state.orders).map(([key, value]) => {
      return (<Order
        key={key}
        ingredients={value.ingredients}
        price={value.price}
      />);
    });

    return (
      <Fragment>
        <h1>Here is your order list:</h1>
        {orders}
      </Fragment>
    )
  };

  const userHasOrders = Object.entries(state.orders).length;
  const noOrders = () => <h1>You have no orders made. Maybe you <Link to={'/'}>want something now?</Link></h1>;

  return (
    <div className={styles.Orders}>
      {userHasOrders ? renderOrders() : noOrders()}
    </div>
  );
}

export default Orders;