import fs from 'fs';
import path from 'path';

export const readJSON = <T>(filename: string): T => {
  const filePath = path.join(process.cwd(), 'src', 'json', filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    return [] as unknown as T;
  }
  const raw = fs.readFileSync(filePath, 'utf-8');

  if (!raw) return [] as unknown as T;

  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? (data as T) : ([] as unknown as T);
  } catch (err) {
    console.error('Error parsing JSON file:', filePath, err);
    return [] as unknown as T;
  }
};

export const writeJSON = <T>(filename: string, data: T) => {
  const filePath = path.join(process.cwd(), 'src', 'json', filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
