import type { Id } from "../types";
import type { UserEntity } from "./entities";

export interface AuthService {
  signIn(email: string, password: string): Promise<UserEntity>;
  signOut(userId: Id): Promise<void>;
  getSession(userId: Id): Promise<UserEntity | null>;
}

export interface UserService {
  createUser(input: Omit<UserEntity, "id" | "createdAt" | "updatedAt">): Promise<UserEntity>;
  getUserById(id: Id): Promise<UserEntity | null>;
}
