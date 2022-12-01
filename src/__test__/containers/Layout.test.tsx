import React from "react";
import { render } from "@testing-library/react";
import Layout from "../../containers/Layout";

describe("Layout", () => {
  test("renders Layout component to match with snapshot", () => {
    const { container } = render(<Layout />);
    expect(container).toMatchSnapshot();
  });
});
