import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Config } from './config';
import { join } from 'path';
import { glob } from 'glob';

export function setupSequelize(options: SequelizeOptions = {}) {
  let _sequelize: Sequelize;

  const dbConfig = Config.db();

  beforeAll(async () => {
    if ('models' in options) delete options['models'];

    _sequelize = new Sequelize({
      ...dbConfig,
      ...options,
      models: await glob(
        join(__dirname, '..', '..', '..', '..', '..') + '/**/*.model.ts',
        {
          ignore: '**/shared/**',
        },
      ),
    });
  });

  if (dbConfig.dialect == 'sqlite') {
    beforeEach(async () => {
      await _sequelize.sync({ force: true });
    });
  }

  afterAll(async () => {
    if (_sequelize) {
      await _sequelize.close();
    }
  });

  return {
    get sequelize() {
      return _sequelize;
    },
  };
}
