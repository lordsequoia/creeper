import { PlayerData } from "./player-data"

export type Player = {
    uuid: string;
    name: string;
    data: PlayerData;
    stats: PlayerStats;
    online: boolean;
}

export function usePlayer() {

}

export default usePlayer