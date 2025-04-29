import { User } from "./user";

describe("User", () => {
  it("should be able to create a user", () => {
    const createdAt = new Date();
    const user = new User({
      name: "Davi Artur",
      email: "davi@gmail.com",
      password: "123456",
      createdAt: createdAt,
    });

    expect(user).toBeTruthy();
    expect(user.name).toBe("Davi Artur");
    expect(user.email).toBe("davi@gmail.com");
    expect(user.password).toBe("123456");
    expect(user.createdAt).toBe(createdAt);
  });

  it("should be able to update user's name", () => {
    const createdAt = new Date();
    const user = new User({
      name: "Davi Artur",
      email: "davi@gmail.com",
      password: "123456",
      createdAt: createdAt,
    });

    user.name = "Davi Artur Updated";
    expect(user.name).toBe("Davi Artur Updated");
  });

  it("should be able to update user's email", () => {
    const createdAt = new Date();
    const user = new User({
      name: "Davi Artur",
      email: "davi@gmail.com",
      password: "123456",
      createdAt: createdAt,
    });

    user.email = "newemail@gmail.com";
    expect(user.email).toBe("newemail@gmail.com");
  });

  it("should be able to update user's password", () => {
    const createdAt = new Date();
    const user = new User({
      name: "Davi Artur",
      email: "davi@gmail.com",
      password: "123456",
      createdAt: createdAt,
    });

    user.password = "newpassword123";
    expect(user.password).toBe("newpassword123");
  });

  it("should return undefined for updatedAt and deletedAt initially", () => {
    const createdAt = new Date();
    const user = new User({
      name: "Davi Artur",
      email: "davi@gmail.com",
      password: "123456",
      createdAt: createdAt,
    });

    expect(user.updatedAt).toBeUndefined();
    expect(user.deletedAt).toBeNull();
  });

  it("should be able to set updatedAt and deletedAt", () => {
    const createdAt = new Date();
    const user = new User({
      name: "Davi Artur",
      email: "davi@gmail.com",
      password: "123456",
      createdAt: createdAt,
    });

    const updatedAt = new Date();
    const deletedAt = new Date();

    // Setting updatedAt and deletedAt
    user["props"].updatedAt = updatedAt;
    user["props"].deletedAt = deletedAt;

    expect(user.updatedAt).toBe(updatedAt);
    expect(user.deletedAt).toBe(deletedAt);
  });
});
