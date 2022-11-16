// create a test suite for the menu tab

import { render, screen } from "@testing-library/react";
import { MenuTab } from "../components/MenuTab";
import { BrowserRouter } from "react-router-dom";

describe("Menu Tab", () => {
  // create a test case for the menu tab
  it("should render the menu tab", () => {
    // render the menu tab
    render(
      <BrowserRouter>
        <MenuTab />
      </BrowserRouter>
    );
    // check if the menu tab is rendered
    expect(screen.getByText("UTMs")).toBeInTheDocument();
  });
});
