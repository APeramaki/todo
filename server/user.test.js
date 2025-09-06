import { expect } from "chai";
import { insertTestUser } from "./test.js";

describe("Testing user management", () => {
  const user = { email: "foo2@test.com", password: "password123" };
  before(() => {
    insertTestUser(user);
  });

  it("should sign up", async () => {
    const newUser = { email: "foo@test.com", password: "password123" };
    const response = await fetch("http://localhost:3001/user/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: newUser }),
    });
    const data = await response.json();
    expect(response.status).to.equal(201);
    expect(data).to.include.all.keys(["id", "email"]);
    expect(data.email).to.equal(newUser.email);
  });
});
