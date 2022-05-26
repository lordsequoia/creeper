import { Server } from '../../../common/servers';
import { Level, LevelData } from '../types';
import { loadLevelDataFromServer } from '../utils/persistence';

export function useServerLevel(server: Server) {
  const loadLevelData = (): LevelData => loadLevelDataFromServer(server);

  const loadLevel = (): Level => {
    return {
      name: server.props.get('level-name'),
      data: loadLevelData(),
    };
  };

  const serverLevel = loadLevel();

  return { serverLevel, loadLevelData, loadLevel };
}

export default useServerLevel;
