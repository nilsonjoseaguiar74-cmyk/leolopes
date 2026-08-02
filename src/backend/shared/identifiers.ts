import type { Id } from "../types";

export function createId(prefix: string): Id {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}
