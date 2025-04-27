import { User } from "../entities/user";

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract update(user: Partial<User>): Promise<User>;
  abstract findManyUsers(): Promise<User[]>;
  abstract delete(id: string): Promise<void>;
}
