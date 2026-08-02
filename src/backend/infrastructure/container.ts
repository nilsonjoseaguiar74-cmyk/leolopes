import type { CreateUserUseCase } from "../application";
import type { BackendHandler } from "../api";
import { ConsoleLogger } from "../logging";
import { getBackendEnvironment } from "../config";
import type { AuthServicePort, UserServicePort } from "../services";

/**
 * Minimal infrastructure container for the backend foundation.
 * Concrete wiring is deferred to a future epic.
 */
export class BackendContainer {
  private readonly logger = new ConsoleLogger();
  private readonly environment = getBackendEnvironment();

  readonly authService: AuthServicePort | null = null;
  readonly userService: UserServicePort | null = null;
  readonly createUserUseCase: CreateUserUseCase | null = null;
  readonly backendHandler: BackendHandler | null = null;

  getLogger() {
    return this.logger;
  }

  getEnvironment() {
    return this.environment;
  }
}
