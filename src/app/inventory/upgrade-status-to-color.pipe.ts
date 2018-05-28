import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'upgradeStatusToColor'
})
export class UpgradeStatusToColorPipe implements PipeTransform {
    transform(status: string): string {
        switch(status) {
            case "Upgrade":
                return "#04B45F";
            default:
                return "#000000";
        }
    }
}