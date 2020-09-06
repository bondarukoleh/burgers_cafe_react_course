import React, {Component} from "react";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
  state =  {
      ingredients: {
        bacon: 1,
        salad: 1,
        cheese: 2,
        meat: 2,
      }
  }

  render() {
    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <div>Burger build controls</div>
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;