import { InMemoryUsersRepository } from "../../../../test/repositories/in-memory-users-repository";
import { CreateUserCase } from "./create-user";
import { DeleteUserCase } from "./delete-user";
import { NotFoundException } from "@nestjs/common";

describe("Delete User", () => {
  let usersRepository: InMemoryUsersRepository;
  let createUser: CreateUserCase;
  let deleteUser: DeleteUserCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUser = new CreateUserCase(usersRepository);
    deleteUser = new DeleteUserCase(usersRepository);
  });

  it("should be able to delete a user", async () => {
    const { user } = await createUser.execute({
      name: "Davi Artur",
      email: "davi@gmail.com",
      password: "123456",
    });

    await deleteUser.execute(user.id!);

    const deletedUser = await usersRepository.findById(user.id!);
    expect(deletedUser).toBeNull();
  });

  it("should throw an error if user does not exist", async () => {
    await expect(deleteUser.execute("non-existing-id")).rejects.toThrow(
      NotFoundException
    );
  });
});
