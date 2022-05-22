import { Item } from ".";

export type ItemStack = {
    readonly item: Item;
    readonly count: number;
}

export default ItemStack