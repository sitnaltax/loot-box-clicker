import { Component, OnInit } from '@angular/core';
import { EquipmentService } from './equipment.service';
import { IEquipmentItem, equipmentSlot } from './equipment-item';

@Component({
    selector: 'equipment-display',
    templateUrl: './equipment-display.component.html',
    styleUrls: ['./equipment-display.component.css']
})
export class EquipmentDisplayComponent implements OnInit {

    constructor(private _equipmentService: EquipmentService) { }

    getHeroEquipment(): IEquipmentItem[] {
        return this._equipmentService.getHeroEquipment();
    }

    getAllEquipmentSlots(): equipmentSlot[] {
        return this._equipmentService.allEquipmentSlots;
    }

    getSlotName(slot: equipmentSlot): string {
        return this._equipmentService.getSlotName(slot);
    }

    getItemNameForSlot(slot: equipmentSlot): string {
        if (this.getHeroEquipment()[slot] == null) {
            return "Nothing";
        }
        return this.getHeroEquipment()[slot].itemName;
    }

    getPowerForSlot(slot: equipmentSlot): number {
        if (this.getHeroEquipment()[slot] == null) {
            return 1;
        }
        return this.getHeroEquipment()[slot].power;
    }

    ngOnInit() {
    }

}
