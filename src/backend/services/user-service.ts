import type { Id } from "../types";
import type { UserEntity, UserService as UserServiceContract } from "../domain";

/**
 * Architectural contract for user management services.
 * Concrete user lifecycle behavior is deferred to a future epic.
 */
export abstract class UserServicePort implements UserServiceContract {
  /** TODO: Introduce user creation in a future epic. */
  abstract createUser(input: Omit<UserEntity, "id" | "createdAt" | "updatedAt">): Promise<UserEntity>;

  /** TODO: Introduce user retrieval in a future epic. */
  abstract getUserById(id: Id): Promise<UserEntity | null>;
}
