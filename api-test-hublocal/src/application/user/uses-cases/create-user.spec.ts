import { BadRequestException } from "@nestjs/common";
import { InMemoryUsersRepository } from "../../../../test/repositories/in-memory-users-repository";
import { CreateUserCase } from "./create-user";

describe("Create user", () => {
  let usersRepository: InMemoryUsersRepository;
  let createUser: CreateUserCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUser = new CreateUserCase(usersRepository);
  });

  it("should be able to create a user", async () => {
    const { user } = await createUser.execute({
      email: "davi@gmail.com",
      name: "Davi Artur",
      password: "123456",
    });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toEqual(user);
  });

  it("should throw an error if user already exists", async () => {
    await createUser.execute({
      email: "davi@gmail.com",
      name: "Davi Artur",
      password: "123456",
    });

    await expect(
      createUser.execute({
        email: "davi@gmail.com",
        name: "Davi Artur",
        password: "123456",
      })
    ).rejects.toThrow(BadRequestException);
  });
});
