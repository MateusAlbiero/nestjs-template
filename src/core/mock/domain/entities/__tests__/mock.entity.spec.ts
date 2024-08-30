import { MockEntity } from '../mock.entity';

describe('Mock entity unit tests', () => {
  it('Should create a mock', () => {
    const mock = MockEntity.mock();

    expect(mock).toBeDefined();
    expect(mock.id).toBeDefined();
  });
});
