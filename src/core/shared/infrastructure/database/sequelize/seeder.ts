import { Sequelize } from 'sequelize';
import { SequelizeStorage, Umzug } from 'umzug';

export function seeder(sequelize: Sequelize) {
  return new Umzug({
    migrations: {
      glob: [
        './seeders/*.{js,ts}',
        {
          cwd: __dirname,
        },
      ],
    },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });
}
