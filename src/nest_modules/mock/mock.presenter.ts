import { Transform } from 'class-transformer';
import { MockOutput } from '../../core/mock/application/shared/mock.output';
import { PaginationOutput } from '../../core/shared/application/pagination.output';
import { CollectionPresenter } from '../shared/collection.presenter';

export class MockPresenter {
  id: string;

  @Transform(({ value }: { value: Date }) => value?.toISOString() ?? value)
  createdAt?: Date;

  @Transform(({ value }: { value: Date }) => value?.toISOString() ?? value)
  updatedAt?: Date;

  @Transform(({ value }: { value: Date }) => value?.toISOString() ?? value)
  deletedAt?: Date;

  constructor(output: MockOutput) {
    this.id = output.id;

    this.createdAt = output.createdAt;
    this.updatedAt = output.updatedAt;
    this.deletedAt = output.deletedAt;
  }
}

export class MockPresenterCollection extends CollectionPresenter {
  data: MockPresenter[];

  constructor(output: PaginationOutput<MockOutput>) {
    const { items, ...paginationProps } = output;

    super(paginationProps);

    this.data = items.map((item) => new MockPresenter(item));
  }
}
