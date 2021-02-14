import React from "react";
import {configure, mount, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import BurgerBuilder from  './BurgerBuilder'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import {Provider} from "react-redux";
import { createStore } from 'redux';
import {rootReducer} from '../../store/reducers';

configure({adapter: new Adapter()})

describe(`<BurgerBuilder />`, () => {
  let burgerBuilderWrapper = null;

  beforeEach(() => {
    burgerBuilderWrapper = mount(<Provider store={createStore(rootReducer,{})}>
      <BurgerBuilder/>
    </Provider>)
  })

  it(`should render two <BuildControls/> when receiving ingredients`, () => {
    burgerBuilderWrapper.setProps({ingredients: {salad: 0}})
    expect(burgerBuilderWrapper.contains(BuildControls)).toEqual(true);
  })
});
