import { Injectable } from '@angular/core';
import { IShopItem } from '../shop/shop-item';
import { IEquipmentItem, equipmentType, equipmentSlot } from '../equipment/equipment-item';
import { EquipmentService } from "../equipment/equipment.service";

//Responsible for determining what you get from a chest

@Injectable()
export class LootService {

    allEquipmentSlots: equipmentSlot[]
    materialsByChestRank;
    baseItemsBySlot;
    //The rookie chest shouldn't have anything. The basic chest can only have the first 5 slots. After that every
    //chest allows 1 more slot.
    slotsAllowedByRank;
    constructor(private _equipmentService: EquipmentService) {
        this.allEquipmentSlots = _equipmentService.getAllEquipmentSlots();
        this.materialsByChestRank = [[{ name: "unknown", power: 1 }],
         [{ name: "iron", power: 2 }, { name: "steel", power: 3 }],
         [{ name: "decrepit", power: 2 }, { name: "unearthed", power: 3 }, { name: "historic", power: 4 }]
        ];
        this.baseItemsBySlot = [["briefcase"], ["pint glass"], ["robe"], ["hat"], ["pants"], ["sandals"], ["gloves"], ["cloak"],
        ["wristguards"], ["belt"], ["shoulder pads"], ["ring"], ["amulet"], ["badge"]];
        this.slotsAllowedByRank = [1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
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

    //TODO add rarity too?

    getNameAndPowerForItem(lootBox: IShopItem, slot: equipmentSlot) {
        var materialAndPowerList = this.materialsByChestRank[lootBox.rank];
        var materialAndPower = materialAndPowerList[Math.floor(Math.random() * materialAndPowerList.length)];
        return { name: materialAndPower.name + " " + this.baseItemsBySlot[slot], power: materialAndPower.power };
    }

    getBaseItemBySlot(slot: equipmentSlot) {
        return this.baseItemsBySlot[slot];
    }
}

