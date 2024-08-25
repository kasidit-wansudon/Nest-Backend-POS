export interface BaseServiceModel<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  create(createDto: any): Promise<T>;
  update(id: string, updateDto: Partial<T>): Promise<T>;
  delete(id: string): Promise<T>;
}