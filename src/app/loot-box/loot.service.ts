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
    constructor(private _equipmentService: EquipmentService) {
        this.allEquipmentSlots = _equipmentService.getAllEquipmentSlots();
        this.materialsByChestRank = [[{ name: "unknown", power: 1 }], [{ name: "iron", power: 2 }, { name: "steel", power: 3 }]];
        this.baseItemsBySlot = [["briefcase"], ["pint glass"], ["robe"], ["hat"], ["pants"], ["sandals"], ["gloves"], ["cloak"],
        ["wristguards"], ["belt"], ["shoulder pads"], ["ring"], ["amulet"], ["badge"]];
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
        return this.allEquipmentSlots[Math.floor(Math.random() * this.allEquipmentSlots.length)];
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

