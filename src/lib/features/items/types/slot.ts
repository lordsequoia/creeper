import { Item, ItemTag } from ".";

export type ItemSlot = {
    readonly Slot: number;
    readonly id: Item;
    readonly Count: number;
    readonly tag?: ItemTag;
}

export default ItemSlot