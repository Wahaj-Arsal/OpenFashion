/** @format */

import "@testing-library/jest-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Mens from "../../pages/mens/Mens";

Enzyme.configure({ adapter: new Adapter() });

describe("Testing Mens Component", () => {
  test("Renders Mens Component", () => {
    const heading = Mens.find("h3");
    expect(heading).toBeTruthy();
  });
});
