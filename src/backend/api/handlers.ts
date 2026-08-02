import type { CreateUserRequest } from "./contracts";
import type { ApiResponse } from "./contracts";

/**
 * Architectural transport boundary for backend handlers.
 * Concrete request processing is deferred to a future epic.
 */
export interface BackendHandler {
  /** TODO: Add transport behavior in a future epic. */
  health(): Promise<ApiResponse<unknown>>;

  /** TODO: Add transport behavior in a future epic. */
  createUser(input: CreateUserRequest): Promise<ApiResponse<unknown>>;
}
