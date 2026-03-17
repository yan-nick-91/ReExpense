import { describe, it, expect } from 'vitest';
import { User } from '../../../src/domain/entities/User';
import { getMetadataArgsStorage } from 'typeorm';
import { Saving } from '../../../src/domain/entities/Saving';
import { Transaction } from '../../../src/domain/entities/Transaction';
import { Goal } from '../../../src/domain/entities/Goal';

describe('User entity', () => {
  it('should create user with required fields', () => {
    const user = new User();
    user.email = 'john.testing@test.com';
    user.password = 'fofsodfofrfadf';

    expect(user.email).toBe('john.testing@test.com');
    expect(user.password).toBe('fofsodfofrfadf');
  });

  it('should have OneToMany relation to Saving', () => {
    const relation = getMetadataArgsStorage().relations.find(
      (r) => r.target === User && r.propertyName === 'savings',
    );

    expect(relation).toBeDefined();
    expect(relation!.relationType).toBe('one-to-many');

    const relationTypeFn = relation!.type as () => unknown;
    const typeResult = relationTypeFn();
    expect(typeResult).toBe(Saving);
  });

  it('should have ManyToOne relation to Saving with inverse side', () => {
    const relation = getMetadataArgsStorage().relations.find(
      (r) => r.target === User && r.propertyName === 'savings',
    );

    const inverseSideFn = relation!.inverseSideProperty as (obj: any) => any;
    const mockSaving = new Saving();
    const inverseResult = inverseSideFn(mockSaving);
    expect(inverseResult).toBe(mockSaving.user);
  });

  it('should have OneToMany relation to Transaction', () => {
    const relation = getMetadataArgsStorage().relations.find(
      (r) => r.target === User && r.propertyName === 'transactions',
    );

    expect(relation).toBeDefined();
    expect(relation!.relationType).toBe('one-to-many');

    const relationTypeFn = relation!.type as () => unknown;
    const typeResult = relationTypeFn();
    expect(typeResult).toBe(Transaction);
  });

  it('should have ManyToOne relation to Transaction with inverse side', () => {
    const relation = getMetadataArgsStorage().relations.find(
      (r) => r.target === User && r.propertyName === 'transactions',
    );

    const inverseSideFn = relation!.inverseSideProperty as (obj: any) => any;
    const mockTransaction = new Transaction();
    const inverseResult = inverseSideFn(mockTransaction);
    expect(inverseResult).toBe(mockTransaction.user);
  });

  it('should have OneToMany relation to Goal', () => {
    const relation = getMetadataArgsStorage().relations.find(
      (r) => r.target === User && r.propertyName === 'goals',
    );

    expect(relation).toBeDefined();
    expect(relation!.relationType).toBe('one-to-many');

    const relationTypeFn = relation!.type as () => unknown;
    const typeResult = relationTypeFn();
    expect(typeResult).toBe(Goal);
  });

    it('should have ManyToOne relation to Transaction with inverse side', () => {
    const relation = getMetadataArgsStorage().relations.find(
      (r) => r.target === User && r.propertyName === 'goals',
    );

    const inverseSideFn = relation!.inverseSideProperty as (obj: any) => any;
    const mockGoal = new Goal();
    const inverseResult = inverseSideFn(mockGoal);
    expect(inverseResult).toBe(mockGoal.user);
  });
});
