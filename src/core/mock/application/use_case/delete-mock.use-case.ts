import { IsNotEmpty, IsUUID } from 'class-validator';
import { IUseCase } from '../../../shared/domain/contracts/use-case.interface';
import { IMockRepository } from '../../domain/contracts/mock-repository.interface';
import { ApplicationService } from '../../../shared/application/application.service';
import { MockId } from '../../domain/entities/mock.entity';

export type DeleteMockInputProps = {
  id: string;
};

export class DeleteMockInput {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  constructor(props: DeleteMockInputProps) {
    if (!props) {
      return;
    }

    this.id = props.id;
  }
}

export class DeleteMockUseCase implements IUseCase<DeleteMockInput, void> {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly mockRepository: IMockRepository,
  ) {}

  async execute(input: DeleteMockInput): Promise<void> {
    await this.applicationService.run(async () => {
      await this.mockRepository.delete(new MockId(input.id));
    });
  }
}
