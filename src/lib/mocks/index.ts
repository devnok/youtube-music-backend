import { Repository } from 'typeorm';

export const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
});

export type MockRepository<T> = Partial<Record<keyof Repository<T>, jest.Mock>>;
