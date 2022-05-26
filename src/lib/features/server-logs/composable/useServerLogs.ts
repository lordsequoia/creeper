import {
  Log,
  LogsFeature,
  LogsSource,
  OnChatLog,
  OnLog,
  UseLogs,
} from '../types';

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
