import type { Id } from "../types";
import type { UserEntity } from "../domain";

/**
 * Architectural contract for user-oriented use cases.
 * Concrete orchestration is deferred to a future epic.
 */
export interface CreateUserUseCase {
  /** TODO: Define orchestration in a future epic. */
  execute(input: Omit<UserEntity, "id" | "createdAt" | "updatedAt">): Promise<UserEntity>;
}

/**
 * Architectural contract for retrieving a user.
 * Concrete orchestration is deferred to a future epic.
 */
export interface GetUserUseCase {
  /** TODO: Define orchestration in a future epic. */
  execute(id: Id): Promise<UserEntity | null>;
}
