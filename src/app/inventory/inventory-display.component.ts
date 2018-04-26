import { Component, OnInit } from '@angular/core';
import { InventoryService } from './inventory.service';
import { equipmentSlot, IEquipmentItem, equipmentType } from '../equipment/equipment-item';
import { EquipmentService } from '../equipment/equipment.service';
import { HeroService } from '../hero/hero.service';

@Component({
    selector: 'inventory-display',
    templateUrl: './inventory-display.component.html',
    styleUrls: ['./inventory-display.component.css']
})
export class InventoryDisplayComponent implements OnInit {

    constructor(private _inventoryService: InventoryService, private _equipmentService: EquipmentService, private _heroService: HeroService) { }

    ngOnInit() {
    }

    getInventory(): IEquipmentItem[] {
        return this._inventoryService.getInventory();
    }

    getSlotNameForItem(item: IEquipmentItem): string {
        if (item.type == equipmentType.art) {
            return "Art";
        }
        else if (item.type == equipmentType.trophy) {
            return "Trophy";
        }
        else if (item.type == equipmentType.equipabble) {
            return this._equipmentService.getSlotName(item.slot);
        }
        else {
            return "Unknown";
        }
    }

    equip(item: IEquipmentItem) {
        if (item.type != equipmentType.equipabble) {
            return;
        }
        var oldItem = this._equipmentService.equip(item);
        this._inventoryService.removeFromInventory(item);
        if (oldItem != null) {
            this._inventoryService.addToInventory(oldItem);
        }
        this._heroService.recalculatePower();
    }

    donate(item: IEquipmentItem) {
        this._inventoryService.removeFromInventory(item);
        this._heroService.addKarma(item.value);
    }
}
