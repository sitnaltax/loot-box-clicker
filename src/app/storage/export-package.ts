import { ICash } from "../cash/cash";
import { IEquipmentItem } from "../equipment/equipment-item";
import { IHero } from "../hero/hero";
import { IShopItem } from "../shop/shop-item";

export class IExportPackage {
    cash : ICash[];
    equipment: IEquipmentItem[];
    hero: IHero;
    inventory: IEquipmentItem[];
    lootBoxes: IShopItem[];
    skills: number[];
}