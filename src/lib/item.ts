export type BlockEntityTag = {
    id: ItemID;
    items?: ItemSlot[]

}
export type ItemTag = {
    BlockEntityTag?: BlockEntityTag
}
export type ItemSlot = {
    Slot: number;
    id: ItemID;
    Count: number;
    tag?: ItemTag;
}

export type ItemStack = {
    item: ItemID;
    count: number;
}

export type Item = { id: ItemID }

export type ItemID = string