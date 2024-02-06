function env(key: string, defaultValue: string): string;
function env(key: string, defaultValue?: string): string | undefined;
function env(key: string, defaultValue?: string): string | undefined {
  const value = process.env[key];

  if (!value) {
    return defaultValue;
  }

  return value;
};

export function envStr(key: string, defaultValue: string): string;
export function envStr(key: string, defaultValue?: string): string | undefined;
export function envStr(key: string, defaultValue?: string) {
  return env(key, defaultValue)
};

export function envInt(key: string, radix: number, defaultValue: number): number;
export function envInt(key: string, radix?: number, defaultValue?: number): number | undefined;
export function envInt(key: string, radix: number = 10, defaultValue?: number) {
  const value = env(key, defaultValue?.toString());

  if (!value) {
    return defaultValue;
  }

  const parsed = parseInt(value, radix);

  if (isNaN(parsed)) {
    return defaultValue;
  }

  return parsed;
};

export function envBool(key: string, defaultValue?: boolean): boolean;
export function envBool(key: string, defaultValue: boolean = false) {
  const value = env(key, String(defaultValue));
  return value === 'true';
};

export function envList(key: string, defaultValue: string[]): string[];
export function envList(key: string, defaultValue?: string[]): string[] | [];
export function envList(key: string, defaultValue?: string[]) {
  const value = env(key);

  if (!value) {
    return defaultValue || [];
  }

  return value.split(',');
};

export function envJSON<T extends object>(key: string, defaultValue: T): T;
export function envJSON<T extends object>(key: string, defaultValue?: T): T | undefined;
export function envJSON<T extends object>(key: string, defaultValue?: T) {
  const value = env(key, JSON.stringify(defaultValue));

  try {
    if (!value) {
      return defaultValue;
    }

    return JSON.parse(value) as T;
  } catch (err) {
    throw new Error('Invalid JSON');
  }
};

