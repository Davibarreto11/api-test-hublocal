import { User } from "./user";

describe("User", () => {
  it("should be able to create a user", () => {
    const user = new User({
      name: "Davi Artur",
      email: "davi@gmail.com",
      password: "123456",
      createdAt: new Date(),
    });

    expect(user).toBeTruthy();
  });
});
