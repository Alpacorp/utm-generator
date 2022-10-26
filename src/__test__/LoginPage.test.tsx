// create a test suite for the login page

import { render, screen } from "@testing-library/react";
import { LoginPage } from "../components/LoginPage";

describe("Login Page", () => {
  // create a test case for the login page
  it("should render the login page", () => {
    // render the login page
    render(<LoginPage />);
    // check if the login page is rendered
    expect(screen.getByText("Inicia Sesión")).toBeInTheDocument();
  });
});

describe("Login Page 2", () => {
  it("should render the login page", () => {
    render(<LoginPage />);
    expect(screen.getByText("Inicia Sesión")).toBeInTheDocument();
  });
  // create a test case for the login form
  it("should render the login form", () => {
    // render the login page
    render(<LoginPage />);
    // check if the login form is rendered
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
});
