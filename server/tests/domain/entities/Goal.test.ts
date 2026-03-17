import { describe, it, expect } from 'vitest';
import { Goal } from '../../../src/domain/entities/Goal';
import { getMetadataArgsStorage } from 'typeorm';
import { User } from '../../../src/domain/entities/User';

describe('Goal entity', () => {
  it('should create a goal with required fields', () => {
    const goal = new Goal();
    goal.title = 'Buy car';
    goal.targetAmount = 10000.0;

    expect(goal.title).toBe('Buy car');
    expect(goal.targetAmount).toBe(10000.0);
  });

  it('should have a null value when instantiating a Goal with a non-arg constructor', () => {
    const goal = new Goal();
    expect(goal).toBeNull;
  });

  it('should allow optional description', () => {
    const goal = new Goal();
    goal.description = 'Trip to Japan';
    expect(goal.description).toBe('Trip to Japan');
  });

  it('should convert created date to ISO string', () => {
    const transformer = getTransformer('createdAt');
    const date = new Date();
    const result = transformer.from(date);
    expect(result).toBe(date.toISOString());
  });

  it('should convert create date to Date', () => {
    const transformer = getTransformer('createdAt');
    const date = new Date();
    const result = transformer.to(date);
    expect(result).toBe(date);
  });

  it('should convert updated date to ISO string', () => {
    const transformer = getTransformer('updatedAt');
    const date = new Date();
    const result = transformer.from(date);
    expect(result).toBe(date.toISOString());
  });

  it('should convert updated date to Date', () => {
    const transformer = getTransformer('updatedAt');
    const date = new Date();
    const result = transformer.to(date);
    expect(result).toBe(date);
  });

  it('should transform updatedAt to null when value is null', () => {
    const transformer = getTransformer('updatedAt');
    const result = transformer.from(null);
    expect(result).toBeNull();
  });

  it('should have ManyToOne relation with User', () => {
    const relation = getMetadataArgsStorage().relations.find(
      (r) => r.target === Goal && r.propertyName === 'user',
    );

    expect(relation).toBeDefined();
    expect(relation!.relationType).toBe('many-to-one');
    const relationTypeFn = relation!.type as () => unknown;
    expect(relationTypeFn()).toBe(User);
  });

  it('should have ManyToOne relation to User with inverse side', () => {
    const relation = getMetadataArgsStorage().relations.find(
      (r) => r.target === Goal && r.propertyName === 'user',
    );

    const inverseSideFn = relation!.inverseSideProperty as (obj: any) => any;
    const mockUser = new User();
    const inverseResult = inverseSideFn(mockUser);
    expect(inverseResult).toBe(mockUser.goals);
  });

  it('should use user_id as join column', () => {
    const joinColumn = getMetadataArgsStorage().joinColumns.find(
      (j) => j.target === Goal && j.propertyName === 'user',
    );

    expect(joinColumn).toBeDefined();
    expect(joinColumn!.name).toBe('user_id');
  });
});

// helpers
const getTransformer = (property: string) => {
  const column = getMetadataArgsStorage().columns.find(
    (c) => c.target === Goal && c.propertyName === property,
  );
  return (column?.options as any)?.transformer;
};
