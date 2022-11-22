import { apiBusiness } from "../../api/apiBusiness";

describe("CreateUsers", () => {
  it("should return a user", async () => {
    const user = {
      name: "test",
      email: "test",
      password: "test",
    };

    const response = await apiBusiness.post("/users", user);

    expect(response.status).toBe(200);
  });
});
