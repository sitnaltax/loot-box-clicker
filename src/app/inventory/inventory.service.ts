import { Injectable } from '@angular/core';
import { IShopItem } from '../shop/shop-item';
import { IEquipmentItem, equipmentSlot, equipmentType } from '../equipment/equipment-item';
import { StorageService } from '../storage/storage.service';
import { TrainerService } from '../trainer/trainer.service';
import { EquipmentService } from '../equipment/equipment.service';
import { skillId } from '../trainer/skill';
import { HeroService } from '../hero/hero.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class InventoryService {

    inventory: IEquipmentItem[];

    equipmentSlotNames: string[];

    constructor(
        private _storageService: StorageService,
        private _equipmentService: EquipmentService,
        private _trainerService: TrainerService,
        private _heroService: HeroService,
        private _toasterService: ToastrService,
    ) {
        if (this._storageService.retrieve('inventory')) {
            this.inventory = this._storageService.retrieve('inventory');
        } else {
            this.inventory = [];
        }

        this._storageService.autoSaveNotification.subscribe((dummy) => {
            this._storageService.store('inventory', this.inventory);
        });

        this._storageService.resetNotification.subscribe((dummy) => {
            this.inventory = [];
        });
    }

    addToInventory(item: IEquipmentItem) {
        // possibly auto-donate
        if (this.checkShouldAutoDonate(item)) {
            // now have to make the check. The chance of NOT being able to auto-donate is (0.75 ^ (ranks in autodonate))
            const chance = 1 - Math.pow(3 / 4, this._trainerService.getRanksForSkillById(skillId.autoDonate));
            if (Math.random() < chance) {
                this._heroService.addKarma(item.value);
                item.autoDonated = true;
                return; // And it's gone
            }
        } else {
            this._toasterService.success(
                `It is better than your current ${this._equipmentService.getSlotName(item.slot)} equipment, equip it now!`,
                `${item.itemName} (${item.power}) acquired!`,
                {
                    enableHtml: true,
                    positionClass: 'toast-bottom-right',
                }
            );
        }
        this.inventory.push(item);
    }

    removeFromInventory(item: IEquipmentItem) {
        const index = this.inventory.indexOf(item, 0);
        if (index > -1) {
            this.inventory.splice(index, 1);
        }
    }

    getInventory() {
        return this.inventory;
    }

    checkShouldAutoDonate(item: IEquipmentItem): boolean {
        if (item.type === equipmentType.art) {
            return true;
        } else if (item.type === equipmentType.equippable) {
            const existingEquipment: IEquipmentItem = this._equipmentService.getHeroEquipment()[item.slot];
            if (existingEquipment == null) {
                return false;
            }
            return (item.power <= existingEquipment.power);
        } else {
            return false;
        }
    }

    sortBySlot() {
        this.inventory.sort(this.slotComparator);
    }

    sortByPower() {
        this.inventory.sort(this.powerComparator);
    }

    slotComparator(item1: IEquipmentItem, item2: IEquipmentItem) {
        if (item1.type === equipmentType.art && item2.type === equipmentType.equippable) {
            return 1;
        } else if (item2.type === equipmentType.art && item1.type === equipmentType.equippable) {
            return -1;
        } else if (item1.type === equipmentType.art && item1.type === equipmentType.art) {
            return 0;
        } else {
            if (item1.slot !== item2.slot) {
                return item1.slot - item2.slot;
            }
            return item2.power - item1.power;
        }
    }

    powerComparator(item1: IEquipmentItem, item2: IEquipmentItem) {
        if (item1.type === equipmentType.art && item2.type === equipmentType.equippable) {
            return 1;
        } else if (item2.type === equipmentType.art && item1.type === equipmentType.equippable) {
            return -1;
        } else if (item1.type === equipmentType.art && item1.type === equipmentType.art) {
            return 0;
        } else {
            return item2.power - item1.power;
        }
    }
}
