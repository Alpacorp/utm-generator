// create a test file in the CreateUsers test folder

// Path: src/__test__/CreateUsers.test.ts

import { apiBusiness } from "../api/apiBusiness";

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
