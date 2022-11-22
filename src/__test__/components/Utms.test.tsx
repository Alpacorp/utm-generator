// create a test suite for the utms page

import { render, screen } from "@testing-library/react";
import Utms from "../../components/Utms";
import { BrowserRouter } from "react-router-dom";

describe("Utms Page", () => {
  // create a test case for the utms page
  it("should render the utms page", () => {
    // render the utms page
    render(
      <BrowserRouter>
        <Utms />
      </BrowserRouter>
    );
    // check if the utms page is rendered
    expect(screen.getByText("UTMs")).toBeInTheDocument();
  });

  // create a test case for the utms form
  it("should render the utms form", () => {
    // render the utms page
    render(
      <BrowserRouter>
        <Utms />
      </BrowserRouter>
    );
    // check if the utms form is rendered
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
});
