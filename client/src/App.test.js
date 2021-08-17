import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Card from "./components/card/Card";
import Cards from "./components/cards/Cards";

configure({ adapter: new Adapter() });

describe("<Cards />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Cards />);
  });

  it("deberia renderizar 1 componente <Card />", () => {
    expect(wrapper.find(Card)).toHaveLength(1);
  });
});
