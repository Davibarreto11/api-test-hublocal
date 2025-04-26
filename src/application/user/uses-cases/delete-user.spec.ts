import { InMemoryUsersRepository } from "@test/repositories/in-memory-users-repository";
import { CreateUserCase } from "./create-user";
import { DeleteUserCase } from "./delete-user";

describe("Delete User", () => {
  it("should be able to delete a user", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUserCase(usersRepository);
    const deleteUser = new DeleteUserCase(usersRepository);

    const { user } = await createUser.execute({
      name: "Davi Artur",
      email: "davi@gmail.com",
      password: "123456",
    });

    await deleteUser.execute(user.id!);

    const deletedUser = await usersRepository.findById(user.id!);
    expect(deletedUser).toBeNull();
  });
});
