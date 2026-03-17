import { describe, it, expect } from 'vitest';
import { Saving } from '../../../src/domain/entities/Saving';
import { getMetadataArgsStorage } from 'typeorm';
import { User } from '../../../src/domain/entities/User';
import { Transaction } from '../../../src/domain/entities/Transaction';

describe('Saving entity', () => {
  it('should create a saving with required fields', () => {
    const saving = new Saving();

    saving.name = 'General';
    saving.balance = 0.00;

    expect(saving.name).toBe('General');
    expect(saving.balance).toBe(0.00);
  });

  it('should have ManyToOne relation with User', () => {
    const relation = getMetadataArgsStorage().relations.find(
      (r) => r.target === Saving && r.propertyName === 'user',
    );

    expect(relation).toBeDefined();
    expect(relation!.relationType).toBe('many-to-one');
    const relationTypeFn = relation!.type as () => unknown;
    expect(relationTypeFn()).toBe(User);
  });

  it('should have ManyToOne relation to User with inverse side', () => {
    const relation = getMetadataArgsStorage().relations.find(
      (r) => r.target === Saving && r.propertyName === 'user',
    );

    const inverseSideFn = relation!.inverseSideProperty as (obj: any) => any;
    const mockUser = new User();
    const inverseResult = inverseSideFn(mockUser);
    expect(inverseResult).toBe(mockUser.savings);
  });

  it('should have OneToMany relation with Transaction', () => {
    const relation = getMetadataArgsStorage().relations.find(
      (r) => r.target === Saving && r.propertyName === 'transactions',
    );

    expect(relation).toBeDefined();
    expect(relation!.relationType).toBe('one-to-many');
    const relationTypeFn = relation!.type as () => unknown;
    expect(relationTypeFn()).toBe(Transaction);
  });

  it('should have ManyToOne relation to User with inverse side', () => {
    const relation = getMetadataArgsStorage().relations.find(
      (r) => r.target === Saving && r.propertyName === 'transactions',
    );

    const inverseSideFn = relation!.inverseSideProperty as (obj: any) => any;
    const mockTransaction = new Transaction();
    const inverseResult = inverseSideFn(mockTransaction);
    expect(inverseResult).toBe(mockTransaction.saving);
  });
});
