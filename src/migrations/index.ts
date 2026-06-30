import * as migration_20260630_070607_v3_initial from './20260630_070607_v3_initial';

export const migrations = [
  {
    up: migration_20260630_070607_v3_initial.up,
    down: migration_20260630_070607_v3_initial.down,
    name: '20260630_070607_v3_initial'
  },
];
