import { envBool, envInt, envJSON, envList, envStr } from './index';

describe('envStr', () => {
  const originalEnv = { ...process.env };

  beforeAll(() => {
    process.env = {
      ...originalEnv,
      TEST: 'test',
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns undefined when the key is not found in process', () => {
    const value = envStr('unknown');

    expect(value).toBeUndefined();
  });

  it('returns default value when passed if the key is not found in process', () => {
    const value = envStr('unknown', 'default');

    expect(value).toEqual('default');
  });

  it('returns the value found in the env', () => {
    const value = envStr('TEST');

    expect(value).toEqual('test');
  });
});

describe('envInt', () => {
  const originalEnv = { ...process.env };

  beforeAll(() => {
    process.env = {
      ...originalEnv,
      TEST: '10',
      TEST_2: '0xF',
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns undefined when the key is not found in process', () => {
    const value = envInt('unknown');

    expect(value).toBeUndefined();
  });

  it('returns default value when passed if the key is not found in process', () => {
    const value = envInt('unknown', 20);

    expect(value).toEqual(20);
  });

  it('returns the parsed value using the radix', () => {
    const value = envInt('TEST_2', undefined, 16);

    expect(value).toEqual(15);
  });

  it('returns the value found in the env', () => {
    const value = envInt('TEST');

    expect(value).toEqual(10);
  });
});

describe('envBool', () => {
  const originalEnv = { ...process.env };

  beforeAll(() => {
    process.env = {
      ...originalEnv,
      TEST: 'true',
      TEST_2: 'false',
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns false when the key is not found in process', () => {
    const value = envBool('unknown');

    expect(value).toBeFalsy();
  });

  it('returns default value when passed if the key is not found in process', () => {
    const value = envBool('unknown', true);

    expect(value).toBeTruthy();
  });

  it('returns true', () => {
    const value = envBool('TEST');

    expect(value).toBeTruthy();
  });

  it('returns false', () => {
    const value = envBool('TEST_2');

    expect(value).toBeFalsy();
  });
});

describe('envJSON', () => {
  const originalEnv = { ...process.env };

  beforeAll(() => {
    process.env = {
      ...originalEnv,
      TEST: JSON.stringify({ foo: 'bar' }),
      TEST_2: 'test_2',
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns undefined when the key is not found in process', () => {
    const value = envJSON('unknown');

    expect(value).toBeUndefined();
  });

  it('returns default value when passed if the key is not found in process', () => {
    const value = envJSON('unknown', { fiz: 'buzz' });

    expect(value).toEqual({ fiz: 'buzz' });
  });

  it('returns the value found in the env', () => {
    const value = envJSON('TEST');

    expect(value).toEqual({ foo: 'bar' });
  });

  it('throws an error if the string is not valid json', () => {
    expect(() => envJSON('TEST_2')).toThrow('Invalid JSON');
  });
});

describe('envList', () => {
  const originalEnv = { ...process.env };

  beforeAll(() => {
    process.env = {
      ...originalEnv,
      TEST: 'a,b,c,d',
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns an empty array when the key is not found in process', () => {
    const value = envList('unknown');

    expect(value).toEqual([]);
  });

  it('returns default value when passed if the key is not found in process', () => {
    const value = envList('unknown', ['z', 'y', 'x']);

    expect(value).toEqual(['z', 'y', 'x']);
  });

  it('returns the value found in the env', () => {
    const value = envList('TEST');

    expect(value).toEqual(['a', 'b', 'c', 'd']);
  });
});
