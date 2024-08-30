import { IsNotEmpty, IsUUID } from 'class-validator';
import { IUseCase } from '../../../shared/domain/contracts/use-case.interface';
import { MockOutput, MockOutputMapper } from '../shared/mock.output';
import { IMockRepository } from '../../domain/contracts/mock-repository.interface';
import { MockId } from '../../domain/entities/mock.entity';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';

export type GetMockByIdInputProps = {
  id: string;
};

export class GetMockByIdInput {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  constructor(props: GetMockByIdInputProps) {
    if (!props) {
      return;
    }

    this.id = props.id;
  }
}

export class GetMockByIdUseCase
  implements IUseCase<GetMockByIdInput, MockOutput>
{
  constructor(private readonly mockRepository: IMockRepository) {}

  async execute(input: GetMockByIdInput): Promise<MockOutput> {
    const result = await this.mockRepository.getById(new MockId(input.id));

    if (!result) {
      throw new NotFoundError(input.id, this.mockRepository.entity);
    }

    return MockOutputMapper.toOutput(result);
  }
}
