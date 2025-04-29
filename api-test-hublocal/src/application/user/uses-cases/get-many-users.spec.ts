import { InMemoryUsersRepository } from "../../../../test/repositories/in-memory-users-repository";
import { CreateUserCase } from "./create-user";
import { GetManyUsersCase } from "./get-many-users";

describe("Get Many Users", () => {
  let usersRepository: InMemoryUsersRepository;
  let createUser: CreateUserCase;
  let getManyUsers: GetManyUsersCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUser = new CreateUserCase(usersRepository);
    getManyUsers = new GetManyUsersCase(usersRepository);
  });

  it("should return an empty array when there are no users", async () => {
    const users = await getManyUsers.execute();
    expect(users).toEqual([]);
  });

  it("should return all users", async () => {
    await createUser.execute({
      name: "Davi Artur",
      email: "davi@gmail.com",
      password: "123456",
    });

    await createUser.execute({
      name: "Carlos Silva",
      email: "carlos@gmail.com",
      password: "123456",
    });

    const users = await getManyUsers.execute();
    expect(users).toHaveLength(2);
    expect(users[0].email).toBe("davi@gmail.com");
    expect(users[1].email).toBe("carlos@gmail.com");
  });
});
