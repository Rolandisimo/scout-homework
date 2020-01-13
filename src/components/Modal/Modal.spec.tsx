import React from "react";
import { shallow } from "enzyme";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("has no render if body is falsy", () => {
    const subject = shallow(<Modal title="foo" body="" />);
    expect(subject.isEmptyRender()).toBeTruthy();
  });
  it("has render if body is present", () => {
    const subject = shallow(<Modal title="foo" body="bar" />);
    expect(subject.find("foo")).toBeTruthy();
    expect(subject.find("bar")).toBeTruthy();
  });
  it("removes the modal if close button is clicked", () => {
    const subject = shallow(<Modal title="foo" body="bar" />);
    expect(subject.isEmptyRender()).toBeFalsy();

    subject.find("button").simulate("click");
    expect(subject.isEmptyRender()).toBeTruthy();
  });
});
