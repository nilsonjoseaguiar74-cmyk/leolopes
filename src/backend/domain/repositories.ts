import type { Id, PaginatedResult } from "../types";
import type { CompanyEntity, ContentBlockEntity, StudentEntity, UserEntity } from "./entities";

export interface Repository<T, TKey = Id> {
  findById(id: TKey): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: T): Promise<T>;
  update(id: TKey, entity: Partial<T>): Promise<T>;
  delete(id: TKey): Promise<void>;
}

export interface UserRepository extends Repository<UserEntity> {
  findByEmail(email: string): Promise<UserEntity | null>;
}

export interface StudentRepository extends Repository<StudentEntity> {
  findByUserId(userId: Id): Promise<StudentEntity | null>;
}

export interface CompanyRepository extends Repository<CompanyEntity> {
  findByOwnerId(ownerId: Id): Promise<CompanyEntity[]>;
}

export interface ContentBlockRepository extends Repository<ContentBlockEntity> {
  findBySlug(slug: string): Promise<ContentBlockEntity | null>;
  findPaginated(page: number, pageSize: number): Promise<PaginatedResult<ContentBlockEntity>>;
}
