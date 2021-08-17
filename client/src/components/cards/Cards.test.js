import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Cards from "./Cards";
import Card from "../card/Card";

configure({ adapter: new Adapter() });

describe("<Cards />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Cards />);
  });

  it("deberia renderizar 40 componentes <Card />", () => {
    expect(wrapper.find(Card)).toHaveLength(40);
  });
});
