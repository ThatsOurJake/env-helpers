# Env Helpers
[![npm version](https://badge.fury.io/js/env-helpers.svg)](https://badge.fury.io/js/env-helpers)

Functions to to help retrieving values from `process.env`.

## Install
```
npm install --save env-helpers
yarn add env-helpers
pnpm add env-helpers 
```

## Functions
The functions are as follows:

### envStr
**Types**
```
function envStr(key: string, defaultValue: string): string;
function envStr(key: string, defaultValue?: string): string | undefined;
```

**Usage**
```
envStr('FOO')               // string | undefined
envStr('FOO', 'Fallback')   // string
```

### envInt
**Types**
```
function envInt(key: string, defaultValue: number, radix?: number = 10): number;
function envInt(key: string, defaultValue?: number, radix?: number = 10): number | undefined;
```

**Usage**
```
envInt('FOO'): number | undefined
envInt('FOO', 10, 16): number
```

### envBoolean
**Types**
```
function envBool(key: string, defaultValue?: boolean): // boolean;
```

**Usage**
```
envBoolean('FOO'): boolean
envBoolean('FOO', false): boolean
```

### envList
**Types**
```
function envList(key: string, defaultValue: string[]): string[];
function envList(key: string, defaultValue?: string[]): string[] | [];
```

**Usage**
```
envList('FOO'): string[] | []
envList('FOO', ['a','b','c']): string[]
```

### envJSON
**Types**
```
function envJSON<T extends object>(key: string, defaultValue: T): T;
function envJSON<T extends object>(key: string, defaultValue?: T): T | undefined;
```

**Usage**
```
envJSON<{ [key: string]: string }>('FOO'): { [key: string]: string } | undefined
envJSON<{ biz: string }>('FOO', { biz: 'baz' }): { biz: string }
```
