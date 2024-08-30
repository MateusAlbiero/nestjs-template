import { getModelToken } from '@nestjs/sequelize';
import MockModel from '../../core/mock/infrastructure/database/sequelize/models/mock.model';
import { MockRepository } from '../../core/mock/infrastructure/database/sequelize/repositories/model.repository';
import UnitOfWork from '../../core/shared/infrastructure/database/sequelize/unit-of-work';
import { StoreMockUseCase } from '../../core/mock/application/use_case/store-mock.use-case';
import { ApplicationService } from '../../core/shared/application/application.service';
import { IMockRepository } from '../../core/mock/domain/contracts/mock-repository.interface';
import { GetAllMockUseCase } from '../../core/mock/application/use_case/get-all-mock.use-case';
import { GetMockByIdUseCase } from '../../core/mock/application/use_case/get-mock-by-id.use-case';
import { UpdateMockUseCase } from '../../core/mock/application/use_case/update-mock.use-case';
import { DeleteMockUseCase } from '../../core/mock/application/use_case/delete-mock.use-case';

export const REPOSITORIES = {
  MOCK_REPOSITORY: {
    provide: 'MockRepository',
    useExisting: MockRepository,
  },
  MOCK_SEQUELIZE_REPOSITORY: {
    provide: MockRepository,
    useFactory: (uow: UnitOfWork, mockModel: typeof MockModel) =>
      new MockRepository(uow, mockModel),
    inject: ['UnitOfWork', getModelToken(MockModel)],
  },
};

export const USE_CASES = {
  GET_ALL_MOCK_USE_CASE: {
    provide: GetAllMockUseCase,
    useFactory: (mockRepository: IMockRepository) =>
      new GetAllMockUseCase(mockRepository),
    inject: [REPOSITORIES.MOCK_REPOSITORY.provide],
  },
  STORE_MOCK_USE_CASE: {
    provide: StoreMockUseCase,
    useFactory: (
      applicationService: ApplicationService,
      mockRepository: IMockRepository,
    ) => new StoreMockUseCase(applicationService, mockRepository),
    inject: [ApplicationService, REPOSITORIES.MOCK_REPOSITORY.provide],
  },
  GET_MOCK_BY_ID_USE_CASE: {
    provide: GetMockByIdUseCase,
    useFactory: (mockRepository: IMockRepository) =>
      new GetMockByIdUseCase(mockRepository),
    inject: [REPOSITORIES.MOCK_REPOSITORY.provide],
  },
  UPDATE_MOCK_USE_CASE: {
    provide: UpdateMockUseCase,
    useFactory: (
      applicationService: ApplicationService,
      mockRepository: IMockRepository,
    ) => new UpdateMockUseCase(applicationService, mockRepository),
    inject: [ApplicationService, REPOSITORIES.MOCK_REPOSITORY.provide],
  },
  DELETE_MOCK_USE_CASE: {
    provide: DeleteMockUseCase,
    useFactory: (
      applicationService: ApplicationService,
      mockRepository: IMockRepository,
    ) => new DeleteMockUseCase(applicationService, mockRepository),
    inject: [ApplicationService, REPOSITORIES.MOCK_REPOSITORY.provide],
  },
};

export const MOCK_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};
