import { Vec3 } from 'vec3'

import { ItemSlot } from '../items';

export type PlayerData = {
    readonly Score: number
    readonly Pos: Vec3;
    readonly EnderItems: readonly ItemSlot[]
    readonly Inventory: readonly ItemSlot[]
    readonly SpawnX: number
    readonly SpawnY: number
    readonly SpawnZ: number
}

export default PlayerData