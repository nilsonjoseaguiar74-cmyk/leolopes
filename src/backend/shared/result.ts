export type Result<T, TError = Error> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      error: TError;
    };

export function ok<T>(data: T): Result<T, never> {
  return { ok: true, data };
}

export function fail<TError>(error: TError): Result<never, TError> {
  return { ok: false, error };
}
