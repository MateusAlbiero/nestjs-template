import { Entity } from '../../../shared/domain/entities/entity';
import NotImplementedError from '../../../shared/domain/errors/not-implemented.error';
import { Uuid } from '../../../shared/domain/value-objects/uuid.vo';
import { faker } from '@faker-js/faker/locale/af_ZA';

export type MockEntityProps = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class MockId extends Uuid {}

export class MockEntity extends Entity {
  id: MockId;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(props: MockEntityProps) {
    super();

    this.id = new MockId(props.id);
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }

  static create(props: MockEntityProps) {
    return new this(props);
  }

  toJSON() {
    return {
      id: this.id.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  validate(): void {
    throw new NotImplementedError();
  }

  static mock() {
    return new this({
      id: faker.string.uuid(),
    });
  }
}
