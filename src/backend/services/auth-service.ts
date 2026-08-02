import type { Id } from "../types";
import type { AuthService as AuthServiceContract, UserEntity } from "../domain";

/**
 * Architectural contract for authentication services.
 * Concrete authentication behavior is deferred to Epic 3.
 */
export abstract class AuthServicePort implements AuthServiceContract {
  /** TODO: Introduce authentication flow in Epic 3. */
  abstract signIn(email: string, password: string): Promise<UserEntity>;

  /** TODO: Introduce sign-out lifecycle in Epic 3. */
  abstract signOut(userId: Id): Promise<void>;

  /** TODO: Introduce session retrieval in Epic 3. */
  abstract getSession(userId: Id): Promise<UserEntity | null>;
}
