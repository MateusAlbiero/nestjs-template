import { Entity } from '../entities/entity';
import { ValueObject } from '../value-objects/value-object';

export interface IBaseRepository<
  TEntity extends Entity,
  TEntityId extends ValueObject,
  TFilter = string,
  TInput = InputParams<TFilter>,
  TOutput = OutputParams,
> {
  sortableFields: string[];

  getAll(props: TInput): Promise<TOutput>;
  store(entity: TEntity): Promise<void | TEntity>;
  getById(
    entity_id: TEntityId,
    ...args: ValueObject[]
  ): Promise<TEntity | null>;
  update(entity: TEntity): Promise<void>;
  delete(entity_id: TEntityId): Promise<void>;

  get entity(): new (...args: any[]) => TEntity;
}

export type InputParamsDirection = 'asc' | 'desc';

export type InputParamsConstructorProps<Filter = string> = {
  page?: number;
  perPage?: number;
  sort?: string | null;
  sortDir?: InputParamsDirection | null;
  filter?: Filter | null;
};

export class InputParams<Filter = string> {
  protected _page: number;
  protected _perPage: number = 15;
  protected _sort: string | null;
  protected _sortDir: InputParamsDirection | null;
  protected _filter: Filter | null;

  constructor(props: InputParamsConstructorProps<Filter> = {}) {
    this.page = props.page;
    this.perPage = props.perPage;
    this.sort = props.sort;
    this.sortDir = props.sortDir;
    this.filter = props.filter;
  }

  get page(): number {
    return this._page;
  }

  private set page(value: number) {
    let _page = +value;

    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page)
      _page = 1;

    this._page = _page;
  }

  get perPage(): number {
    return this._perPage;
  }

  private set perPage(value: number) {
    let _per_page = value === (true as any) ? this._perPage : +value;

    if (
      Number.isNaN(_per_page) ||
      (_per_page <= 0 && _per_page != -1) ||
      parseInt(_per_page as any) !== _per_page
    )
      _per_page = this._perPage;

    this._perPage = _per_page;
  }

  get sort(): string | null {
    return this._sort;
  }

  private set sort(value: string) {
    this._sort =
      value === null || value === undefined || value === '' ? null : `${value}`;
  }

  get sortDir(): InputParamsDirection | null {
    return this._sortDir;
  }

  private set sortDir(value: InputParamsDirection | null) {
    if (!this.sort) {
      this._sortDir = null;
      return;
    }

    const dir = `${value}`.toLowerCase();

    this._sortDir = dir !== 'asc' && dir !== 'desc' ? 'asc' : dir;
  }

  get filter(): Filter | null {
    return this._filter;
  }

  protected set filter(value: Filter | null) {
    this._filter =
      value === null || value === undefined || (value as unknown) === ''
        ? null
        : (`${value}` as any);
  }
}

export type OutputParamsConstructorProps<TEntity extends Entity> = {
  items: TEntity[];
  total: number;
  currentPage: number;
  perPage: number;
};

export class OutputParams<TEntity extends Entity = Entity> {
  readonly items: TEntity[];
  readonly total: number;
  readonly currentPage: number;
  readonly perPage: number;
  readonly lastPage: number;

  constructor(props: OutputParamsConstructorProps<TEntity>) {
    this.items = props.items;
    this.total = props.total;
    this.currentPage = props.currentPage;
    this.perPage = props.perPage;
    this.lastPage = Math.ceil(this.total / this.perPage);
  }

  toJSON(forceAggregate = false) {
    return {
      items: forceAggregate
        ? this.items.map((item) => item.toJSON())
        : this.items,
      total: this.total,
      current_page: this.currentPage,
      per_page: this.perPage,
      last_page: this.lastPage,
    };
  }
}
