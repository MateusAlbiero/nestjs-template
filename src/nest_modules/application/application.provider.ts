import { ApplicationService } from '../../core/shared/application/application.service';
import { IUnitOfWork } from '../../core/shared/domain/contracts/unit-of-work.interface';

export const REPOSITORIES = {
  APPLICATION_SERVICE_REPOSITORY: {
    provide: 'ApplicationService',
    useExisting: ApplicationService,
  },
  APPLICATION_SERVICE_SEQUELIZE_REPOSITORY: {
    provide: ApplicationService,
    useFactory: (uow: IUnitOfWork) => {
      return new ApplicationService(uow);
    },
    inject: ['UnitOfWork'],
  },
};

export const APPLICATION_PROVIDERS = {
  REPOSITORIES,
};
