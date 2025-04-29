import { InMemoryUsersRepository } from "../../../../test/repositories/in-memory-users-repository";
import { CreateUserCase } from "./create-user";
import { UpdateProfileCase } from "./update-profile";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe("Update Profile", () => {
  let usersRepository: InMemoryUsersRepository;
  let createUser: CreateUserCase;
  let updateProfile: UpdateProfileCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUser = new CreateUserCase(usersRepository);
    updateProfile = new UpdateProfileCase(usersRepository);
  });

  it("should update the user profile", async () => {
    const { user } = await createUser.execute({
      name: "Davi Artur",
      email: "davi@gmail.com",
      password: "123456",
    });

    const { user: updatedUser } = await updateProfile.execute({
      id: user.id!,
      name: "Davi Artur Updated",
      email: "davi.updated@gmail.com",
      password: "newpassword",
    });

    expect(updatedUser.name).toBe("Davi Artur Updated");
    expect(updatedUser.email).toBe("davi.updated@gmail.com");
    expect(updatedUser.password).toBe("newpassword");
  });

  it("should throw an error if email already exists", async () => {
    const { user: user1 } = await createUser.execute({
      name: "Davi Artur",
      email: "davi@gmail.com",
      password: "123456",
    });

    const { user: user2 } = await createUser.execute({
      name: "Carlos Silva",
      email: "carlos@gmail.com",
      password: "123456",
    });

    await expect(
      updateProfile.execute({
        id: user1.id!,
        name: "Davi Artur Updated",
        email: "carlos@gmail.com",
        password: "newpassword",
      })
    ).rejects.toThrow(BadRequestException);
  });

  it("should throw an error if user does not exist", async () => {
    await expect(
      updateProfile.execute({
        id: "non-existing-id",
        name: "Non Existing User",
        email: "nonexisting@gmail.com",
        password: "newpassword",
      })
    ).rejects.toThrow(NotFoundException);
  });
});
