import { InMemoryUsersRepository } from "../../../../test/repositories/in-memory-users-repository";
import { CreateUserCase } from "./create-user";
import { GetProfileUseCase } from "./get-profile";
import { NotFoundException } from "@nestjs/common";

describe("Get Profile", () => {
  let usersRepository: InMemoryUsersRepository;
  let createUser: CreateUserCase;
  let getProfile: GetProfileUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUser = new CreateUserCase(usersRepository);
    getProfile = new GetProfileUseCase(usersRepository);
  });

  it("should return the user profile when user exists", async () => {
    const { user } = await createUser.execute({
      name: "Davi Artur",
      email: "davi@gmail.com",
      password: "123456",
    });

    const fetchedUser = await getProfile.execute(user.id!);
    expect(fetchedUser).toEqual(user);
  });

  it("should throw an error if user does not exist", async () => {
    await expect(getProfile.execute("non-existing-id")).rejects.toThrow(
      NotFoundException
    );
  });
});
