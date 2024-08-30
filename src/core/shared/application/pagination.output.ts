import { OutputParams } from '../domain/contracts/base-repository.interface';

export type PaginationOutput<Item = any> = {
  items: Item[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};

export class PaginationOutputMapper {
  static toOutput<Item = any>(
    items: Item[],
    props: Omit<OutputParams, 'items'>,
  ): PaginationOutput<Item> {
    return { ...props, items };
  }
}
