import React from "react";
import { shallow } from "enzyme";
import { App } from "./App";
import { MainConnected } from "./components/Main/Main";

describe("App", () => {
  it("renders app", () => {
    const subject = shallow(<App />);
    expect(subject).toMatchSnapshot();
  });
  it("renders MainConnected", () => {
    const subject = shallow(<App />);
    expect(subject.find(MainConnected)).toHaveLength(1);
  });
});
