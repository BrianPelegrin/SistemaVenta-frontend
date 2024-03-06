interface IRequestService<T> {
  getList: Promise<T[]>;
  getById: Promise<T>;
}
