import { FilesystemEventType } from '..';

export type MesssageType = '*' | 'fs' | string;
export type ServerEventName = 'gain' | 'file-update' | string;

export type Gain = {};
export type OnGain = (gain: Gain) => void;

export type File = {};
export type OnFileUpdate = (type: FilesystemEventType, file: File) => void;

export type ServerWatcher = {
  readonly onGain: (callback: OnGain) => void;

  readonly onFileUpdate: (callback: OnFileUpdate) => void;
};
