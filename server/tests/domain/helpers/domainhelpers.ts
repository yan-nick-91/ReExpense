import { getMetadataArgsStorage } from 'typeorm';

export const getTransformer = <T extends object>(
  targetType: T,
  property: string,
) => {
  const column = getMetadataArgsStorage().columns.find(
    (c) => c.target === targetType && c.propertyName === property,
  );
  return (column?.options as any)?.transformer;
};

export const getRelations = <T extends object>(
  targetType: T,
  property: string,
) =>
  getMetadataArgsStorage().relations.find(
    (r) => r.target === targetType && r.propertyName === property,
  );

export const getJoinColumns = <T extends object>(
  targetType: T,
  property: string,
) =>
  getMetadataArgsStorage().joinColumns.find(
    (j) => j.target === targetType && j.propertyName === property,
  );
