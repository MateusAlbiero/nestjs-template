import { Column, DataType, IsUUID } from 'sequelize-typescript';
import { IUseCase } from '../../../shared/domain/contracts/use-case.interface';
import { IsNotEmpty } from 'class-validator';
import { MockOutput, MockOutputMapper } from '../shared/mock.output';
import { ApplicationService } from '../../../shared/application/application.service';
import { IMockRepository } from '../../domain/contracts/mock-repository.interface';
import { MockEntity } from '../../domain/entities/mock.entity';
import { EntityValidationError } from '../../../shared/domain/errors/entity-validation.error';

export type UpdateMockInputProps = {
  id: string;
};

export class UpdateMockInput {
  @IsUUID('4')
  @IsNotEmpty()
  @Column(DataType.STRING)
  id: string;

  constructor(props: UpdateMockInputProps) {
    if (!props) {
      return;
    }

    this.id = props.id;
  }
}

export class UpdateMockUseCase
  implements IUseCase<UpdateMockInput, MockOutput>
{
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly mockRepository: IMockRepository,
  ) {}

  async execute(input: UpdateMockInput): Promise<MockOutput> {
    return await this.applicationService.run(async () => {
      const mock = MockEntity.create({ id: input.id });

      if (mock.notification.hasErrors()) {
        throw new EntityValidationError(mock.notification.toJSON());
      }

      await this.mockRepository.update(mock);

      return MockOutputMapper.toOutput(
        await this.mockRepository.getById(mock.id),
      );
    });
  }
}
