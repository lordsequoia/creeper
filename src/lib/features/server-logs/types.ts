/* eslint-disable functional/no-return-void */

export type LogLevel = 'INFO' | 'ERROR';

export type Log = {
  readonly ts: number;
  readonly level: LogLevel;
  readonly message: string;
};

export type ChatLog = {
  readonly log: Log;
  readonly player: string;
  readonly message: string;
};

export type OnChatLog = (chatLog: ChatLog) => void;

export type OnLog = (log: Log) => void;

export type LogsSource = {
  readonly tail: (callback: OnLog) => void;
};

export type UseLogs = (source: LogsSource) => LogsFeature;

export type LogsFeature = {
  readonly source: LogsSource;

  readonly onLog: (callback: OnLog) => void;
  readonly onChatLog: (callback: OnChatLog) => void;
};
