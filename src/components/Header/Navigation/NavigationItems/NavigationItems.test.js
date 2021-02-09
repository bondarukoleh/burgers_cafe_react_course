import React from "react";
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter: new Adapter()})

describe(`<NavigationItems />`, () => {
  it(`should render two <NavigationItem/> if User is not authenticated`, () => {
    const navigationItemsWrapper = shallow(<NavigationItems/>)
    expect(navigationItemsWrapper.find(NavigationItem)).toHaveLength(2);
  })
});
