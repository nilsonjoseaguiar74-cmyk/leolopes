import type { Id } from "../types";

export interface BaseEntity {
  id: Id;
  createdAt: string;
  updatedAt: string;
}

export interface UserEntity extends BaseEntity {
  email: string;
  name: string;
  role: string;
  isActive: boolean;
}

export interface StudentEntity extends BaseEntity {
  userId: Id;
  plan: string;
  streak: number;
  adherence: number;
  goal: string;
}

export interface CompanyEntity extends BaseEntity {
  name: string;
  ownerId: Id;
  status: string;
}

export interface ContentBlockEntity extends BaseEntity {
  slug: string;
  type: string;
  payload: Record<string, unknown>;
}
