//Equipment is anything you can pick up even though it might not actually be wearable

export enum equipmentType {equipabble, art, trophy}

export enum equipmentSlot {mainhand, offhand, armor, helm, legs, feet, hands, cloak, wrists, waist, shoulders,
                        ring, amulet, accessory};

export enum rarity {common, uncommon, rare, epic, legendary};

export interface IEquipmentItem{
    itemName: string;
    type: equipmentType;
    slot?: equipmentSlot;
    power?: number;
    value: number;
    rarity?: rarity;
}