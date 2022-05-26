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

export const useLogs: UseLogs = (source: LogsSource): LogsFeature => {
  const onLog = (callback: OnLog) => source.tail(callback);

  const onChatLog = (callback: OnChatLog) =>
    onLog((log: Log) => {
      const isChatLog = true; // TODO

      if (!isChatLog) return;

      callback({ log, player: '', message: '' });
    });

  return { source, onLog, onChatLog };
};

export default useLogs;
