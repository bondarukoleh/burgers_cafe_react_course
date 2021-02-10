import React from "react";
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter: new Adapter()})

describe(`<NavigationItems />`, () => {
  let navigationItemsWrapper = null;

  beforeEach(() => {
    navigationItemsWrapper = shallow(<NavigationItems/>)
  })

  it(`should render two <NavigationItem/> if User is not authenticated`, () => {
    expect(navigationItemsWrapper.find(NavigationItem)).toHaveLength(2);
  })

  it(`should render two <NavigationItem/> if User is authenticated`, () => {
    navigationItemsWrapper.setProps({userAuthenticated: true})
    expect(navigationItemsWrapper.find(NavigationItem)).toHaveLength(3);
  })

  it.skip(`should render two <NavigationItem/> if User is authenticated`, () => {
    navigationItemsWrapper.setProps({userAuthenticated: true})
    expect(navigationItemsWrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
  })
});
