export interface Logger {
  debug(message: string, metadata?: Record<string, unknown>): void;
  info(message: string, metadata?: Record<string, unknown>): void;
  warn(message: string, metadata?: Record<string, unknown>): void;
  error(message: string, metadata?: Record<string, unknown>): void;
}

export class ConsoleLogger implements Logger {
  debug(message: string, metadata?: Record<string, unknown>): void {
    console.debug(message, metadata);
  }

  info(message: string, metadata?: Record<string, unknown>): void {
    console.info(message, metadata);
  }

  warn(message: string, metadata?: Record<string, unknown>): void {
    console.warn(message, metadata);
  }

  error(message: string, metadata?: Record<string, unknown>): void {
    console.error(message, metadata);
  }
}
