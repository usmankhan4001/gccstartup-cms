import * as migration_20260627_185945_initial from './20260627_185945_initial';

export const migrations = [
  {
    up: migration_20260627_185945_initial.up,
    down: migration_20260627_185945_initial.down,
    name: '20260627_185945_initial'
  },
];
