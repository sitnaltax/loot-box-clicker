import { Injectable } from '@angular/core';
import { IShopItem } from '../shop/shop-item';
import { IEquipmentItem, equipmentType, equipmentSlot } from '../equipment/equipment-item';
import { EquipmentService } from "../equipment/equipment.service";

//Responsible for determining what you get from a chest

@Injectable()
export class LootService {

    allEquipmentSlots: equipmentSlot[]
    materialsByChestRank;
    baseItemsBySlot : string[][] = [["wand", "staff", "briefcase", "towel", "screwdriver", "paintbrush", "checkbook"],
    ["fidget spinner", "orb", "book", "pint glass", "duckie"],
    ["robe", "armor", "suit"], ["hat", "helm", "beanie"], ["pants", "pantaloons", "greaves", "leg guards", "chaps"],
    ["sandals", "shoes", "boots"], ["gloves"], ["cloak", "cape", "backguard", "backpack"], ["wristguards"], ["belt"], ["shoulder pads"], ["ring"], ["amulet"], ["badge"]];
    //The rookie chest shouldn't have anything. The basic chest can only have the first 5 slots. After that every
    //chest allows 1 more slot.
    slotsAllowedByRank : number[] = [1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    constructor(private _equipmentService: EquipmentService) {
        this.allEquipmentSlots = _equipmentService.getAllEquipmentSlots();
        this.materialsByChestRank = [[{ name: "unknown", power: 1 }],
         [{ name: "iron", power: 2 }, { name: "steel", power: 3 }],
         [{ name: "decrepit", power: 2 }, { name: "unearthed", power: 3 }, { name: "historic", power: 4 }]
        ];
    }

    getItemsForLootBox(lootBox: IShopItem): IEquipmentItem[] {
        if (lootBox.rank == 0) {
            return [{
                itemName: "Sword of Starting", type: equipmentType.equipabble, slot: equipmentSlot.mainhand,
                power: 3, value: 1
            }]
        }
        var slot = this.getRandomSlotForLootBox(lootBox);
        var baseItem = this.getNameAndPowerForItem(lootBox, slot);
        return [{ itemName: baseItem.name, type: equipmentType.equipabble, slot: slot, power: baseItem.power, value: baseItem.power }];
    }

    getRandomSlotForLootBox(lootBox: IShopItem): equipmentSlot {
        let slotsAllowed;
        if (lootBox.rank > this.slotsAllowedByRank.length + 1) {
            slotsAllowed = this.allEquipmentSlots.length;
        }
        slotsAllowed = Math.min(this.allEquipmentSlots.length, this.slotsAllowedByRank[lootBox.rank])
        return this.allEquipmentSlots[Math.floor(Math.random() * slotsAllowed)];
    }

    getNameAndPowerForItem(lootBox: IShopItem, slot: equipmentSlot) {
        var materialAndPowerList = this.materialsByChestRank[lootBox.rank];
        var materialAndPower = materialAndPowerList[Math.floor(Math.random() * materialAndPowerList.length)];
        var enchantmentCount = this.getEnchantmentCountForChest(lootBox);
        return { name: materialAndPower.name + " " + this.getBaseItemBySlot(slot),
         power: materialAndPower.power + this.powerForEnchantmentCount[enchantmentCount] };
    }

    chanceOfEnchantment: number = 1/6;

    /*Each rank beyond the first gives a 1/6 chance of an enchantment.
    Enchantment power is triangular so 1/2/3/4 enchantments gives 1/3/6/10 power.*/
    getEnchantmentCountForChest(lootBox: IShopItem): number {
        let enchantments = 0;
        for(let i = 1; i < lootBox.rank; i++) {
            if (Math.random() < this.chanceOfEnchantment) {
                enchantments++;
            }
        }
        return enchantments;
    }

    powerForEnchantmentCount: number[] = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91, 105, 120, 136, 153, 171, 190, 210, 231, 253, 276, 300, 325, 351, 378, 406, 435, 465, 496, 528, 561, 595, 630, 666];

    getPowerForEnchantmentCount(count: number): number {
        return this.powerForEnchantmentCount[count];
    }

    getBaseItemBySlot(slot: equipmentSlot): string {
        let possibleBaseItems = this.baseItemsBySlot[slot];
        return possibleBaseItems[Math.floor(Math.random() * possibleBaseItems.length)];
    }
}

