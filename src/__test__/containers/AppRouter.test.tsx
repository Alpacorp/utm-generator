import { render } from "@testing-library/react";
import AppRouter from "../../containers/AppRouter";

describe("AppRouter", () => {
  test("renders AppRouter component to match with snapshot", () => {
    const { container } = render(<AppRouter />);
    expect(container).toMatchSnapshot();
  });
});
