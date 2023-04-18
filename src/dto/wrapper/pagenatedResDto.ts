export class PagenatedResDto<T> {
  total: number;
  per_page: number;
  current_page: number;
  data: Array<T>;
}