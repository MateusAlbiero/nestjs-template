import {
  PaginationOutput,
  PaginationOutputMapper,
} from '../../../shared/application/pagination.output';
import { InputParamsDirection } from '../../../shared/domain/contracts/base-repository.interface';
import { IUseCase } from '../../../shared/domain/contracts/use-case.interface';
import {
  IMockRepository,
  MockFilter,
  MockInputParams,
} from '../../domain/contracts/mock-repository.interface';
import { MockOutput, MockOutputMapper } from '../shared/mock.output';

export type GetAllMockInput = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: InputParamsDirection | null;
  filter?: MockFilter | null;
  type?: string | null;
};

export class GetAllMockUseCase
  implements IUseCase<GetAllMockInput, PaginationOutput<MockOutput>>
{
  constructor(private readonly mockRepository: IMockRepository) {}

  async execute(input: GetAllMockInput): Promise<PaginationOutput<MockOutput>> {
    const result = await this.mockRepository.getAll(new MockInputParams(input));

    const items = [...result.items].map((item) =>
      MockOutputMapper.toOutput(item),
    );

    return PaginationOutputMapper.toOutput(items, result);
  }
}
