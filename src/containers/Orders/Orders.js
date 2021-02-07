import React, {Fragment, useEffect, useState} from 'react';
import Order from "../../components/Order/Order/Order";
import {axiosRequest} from "../../helpers/api";
import styles from './Orders.module.scss';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

function Orders(props) {
  const [state, setState] = useState({orders: {}});

  useEffect(() => {
    const query = `auth=${props?.user?.idToken}&orderBy="userID"&equalTo="${props.user.localId}"`
    axiosRequest.get(`/orders.json?${query}`) // Here we will get only needed orders
      .then(r => {
        /* if(r.data && Object.keys(r.data).length) { // THIS is filtering on frontend, but we don't want to get all the orders
          const ordersByUser = Object.entries(r.data)
            .filter(([orderID, orderObject]) => orderObject.userID === props.user.localId)
            .reduce((acc, cur) => {
              acc[cur[0]] = cur[1];
              return acc;
            }, {})
          setState({orders: ordersByUser})
        } else {} */
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

const mapStateToProps = (store) => {
  return {
    user: store.auth.user
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axiosRequest));
export default connect(mapStateToProps)(Orders);

