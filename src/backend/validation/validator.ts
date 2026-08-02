export interface Validator<T> {
  validate(value: T): void;
}

export class ValidationResult {
  static success(): ValidationResult {
    return new ValidationResult();
  }

  static failure(message: string): ValidationResult {
    return new ValidationResult(message);
  }

  private constructor(public readonly message?: string) {}

  get isValid(): boolean {
    return this.message == null;
  }
}

export function assertValid<T>(validator: Validator<T>, value: T): void {
  validator.validate(value);
}
