export interface Response<T> {
  data?: T | null;
  message: string;
  status: string;
}
