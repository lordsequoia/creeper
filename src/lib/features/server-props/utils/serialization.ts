import { ServerProperties } from '../types';

export function serializeServerProperties(value: ServerProperties) {
  const output = new Set<string>([]);

  value.forEach((value: string, key: string) => {
    output.add(`${key}=${value}`);
  });

  return Array.from(output).join('\n');
}

/**
 * TODO
 *
 * @param value
 * @returns
 */
export function deserializeServerProperties(value: string): ServerProperties {
  const map = new Map<string, string>([]);

  value
    .split('\n')
    .map((line: string) => line.trim().split('=', 2))
    .filter(([, value]) => value != undefined)
    .forEach(([key, value]) => {
      map.set(key, value);
    });

  return map as ServerProperties;
}
