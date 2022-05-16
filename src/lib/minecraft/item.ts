export type BlockEntityTag = {
    readonly id: ItemID;
    readonly items?: readonly ItemSlot[]

}
export type ItemTag = {
    readonly BlockEntityTag?: BlockEntityTag
}
export type ItemSlot = {
    readonly Slot: number;
    readonly id: ItemID;
    readonly Count: number;
    readonly tag?: ItemTag;
}

export type ItemStack = {
    readonly item: ItemID;
    readonly count: number;
}

export type Item = { readonly id: ItemID }

export type ItemID = string