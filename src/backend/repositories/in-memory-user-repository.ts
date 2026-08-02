import type { UserEntity } from "../domain";
import type { UserRepository } from "../domain";
import type { Id } from "../types";

/**
 * Example infrastructure adapter for the backend foundation.
 * It remains minimal and does not encapsulate business behavior.
 */
export class InMemoryUserRepository implements UserRepository {
  private readonly users = new Map<Id, UserEntity>();

  async findById(_id: Id): Promise<UserEntity | null> {
    return null;
  }

  async findAll(): Promise<UserEntity[]> {
    return [];
  }

  async findByEmail(_email: string): Promise<UserEntity | null> {
    return null;
  }

  async create(entity: UserEntity): Promise<UserEntity> {
    return entity;
  }

  async update(_id: Id, _entity: Partial<UserEntity>): Promise<UserEntity> {
    throw new Error("Not implemented");
  }

  async delete(_id: Id): Promise<void> {
    return undefined;
  }
}
