import { ItemSlot } from "./item"
import { Vec3 } from 'vec3'

export type PlayerData = {
    Pos: Vec3;
    EnderItems: ItemSlot[]
    Inventory: ItemSlot[]
}