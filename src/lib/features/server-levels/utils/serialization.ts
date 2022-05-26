import { parse, stringify } from 'nbt-ts';

import { LevelData } from '../types';

export async function deserializeServerLevel(
  value: Buffer
): Promise<LevelData> {
  const data = await parse(String(value));

  return data as LevelData;
}

export async function serializeServerLevel(
  value: LevelData
): Promise<Buffer | string> {
  const data = await stringify(value);

  return data;
}
