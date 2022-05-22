import { Item, ItemSlot } from ".";

export type BlockEntityTag = {
    readonly id: Item;
    readonly items?: readonly ItemSlot[]
}

export default BlockEntityTag