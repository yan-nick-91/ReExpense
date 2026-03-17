import { describe, it, expect } from 'vitest';
import {
  Transaction,
  TransactionType,
} from '../../../src/domain/entities/Transaction';
import { getMetadataArgsStorage } from 'typeorm';
import { User } from '../../../src/domain/entities/User';
import { Saving } from '../../../src/domain/entities/Saving';

describe('Transaction entity', () => {
  it('should create a transaction with required fields', () => {
    const transaction = new Transaction();

    transaction.amount = 20.0;
    transaction.category = 'Allowance';
    transaction.type = TransactionType.INCOME;

    expect(transaction.amount).toBe(20.0);
    expect(transaction.category).toBe('Allowance');
    expect(transaction.type).toBe('income');
  });

  it('should have ManyToOne relation to User', () => {
    const relation = getMetadataArgsStorage().relations.find(
      (r) => r.target === Transaction && r.propertyName === 'user',
    );

    expect(relation).toBeDefined();
    expect(relation!.relationType).toBe('many-to-one');

    const relationTypeFn = relation!.type as () => unknown;
    const typeResult = relationTypeFn();
    expect(typeResult).toBe(User);
  });

  it('should have ManyToOne relation to User with inverse side', () => {
    const relation = getMetadataArgsStorage().relations.find(
      (r) => r.target === Transaction && r.propertyName === 'user',
    );

    const inverseSideFn = relation!.inverseSideProperty as (obj: any) => any;
    const mockUser = new User();
    const inverseResult = inverseSideFn(mockUser);
    expect(inverseResult).toBe(mockUser.transactions);
  });

  it('should have ManyToOne relation to Saving', () => {
    const relation = getMetadataArgsStorage().relations.find(
      (r) => r.target === Transaction && r.propertyName === 'saving',
    );

    expect(relation).toBeDefined();
    expect(relation!.relationType).toBe('many-to-one');

    const relationTypeFn = relation!.type as () => unknown;
    const typeResult = relationTypeFn();
    expect(typeResult).toBe(Saving);
  })

  it('should have ManyToOne relation to Saving with inverse side', () => {
    const relation = getMetadataArgsStorage().relations.find(
      (r) => r.target === Transaction && r.propertyName === 'saving',
    );

    const inverseSideFn = relation!.inverseSideProperty as (obj: any) => any;
    const mockSaving = new Saving();
    const inverseResult = inverseSideFn(mockSaving);
    expect(inverseResult).toBe(mockSaving.transactions);
  });

  it('should convert created date to ISO string', () => {
      const transformer = getTransformer('date');
      const date = new Date();
      const result = transformer.from(date);
      expect(result).toBe(date.toISOString());
    });
  
    it('should convert create date to Date', () => {
      const transformer = getTransformer('date');
      const date = new Date();
      const result = transformer.to(date);
      expect(result).toBe(date);
    });
});

const getTransformer = (property: string) => {
  const column = getMetadataArgsStorage().columns.find(
    (c) => c.target === Transaction && c.propertyName === property,
  );
  return (column?.options as any)?.transformer;
};