import { Pipe, PipeTransform } from '@angular/core';
import { rarity } from '../equipment/equipment-item';

@Pipe({
    name: 'rarityToColor'
})
export class RarityToColorPipe implements PipeTransform {
    transform(value: rarity): string {
        switch(value) {
            case rarity.junk:
                return "#6E6E6E"
            case rarity.common:
                return "#000000";
            case rarity.uncommon:
                return "#298A08";
            case rarity.rare:
                return "#0101DF";
            case rarity.epic:
                return "#7401DF";
            case rarity.legendary:
                return "#B45F04";
            default:
                return "#000000";
        }
    }
}