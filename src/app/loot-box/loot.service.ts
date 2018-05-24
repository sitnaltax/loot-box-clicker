import { Injectable } from '@angular/core';
import { IShopItem } from '../shop/shop-item';
import { IEquipmentItem, equipmentType, equipmentSlot, rarity } from '../equipment/equipment-item';
import { EquipmentService } from "../equipment/equipment.service";
import { IEnchantment, enchantmentType } from './enchantment';

//Responsible for determining what you get from a chest

@Injectable()
export class LootService {

    allEquipmentSlots: equipmentSlot[]
    materialsByChestRank;
    baseItemsBySlot: string[][] = [["wand", "staff", "briefcase", "towel", "screwdriver", "paintbrush", "checkbook", "smartphone", "science phone", "multitool"],
    ["fidget spinner", "orb", "book", "pint glass", "duckie", "umbrella", "scissors"],
    ["robe", "armor", "suit", "jacket", "vest", "shirt"], ["hat", "helm", "beanie", "headphones", "beret", "helmet"],
    ["pants", "pantaloons", "greaves", "leg guards", "chaps", "trousers", "shorts", "skirt", "kilt"],
    ["sandals", "shoes", "boots", "kicks", "treads", "waders"], ["gloves", "handguards", "gauntlets", "mitts", "mittens"],
    ["cloak", "cape", "backguard", "backpack"], ["wristguards", "bracelets", "manacles"],
    ["belt", "girdle", "fanny pack", "waistguard"], ["shoulder pads", "pauldrons", "shoulderguards", "epaulets"],
    ["ring", "signet", "solitaire", "loop", "hoop", "knot", "band"],
    ["amulet", "necklace", "choker", "chain", "pendant", "locket", "torc"],
    ["badge", "hair clip", "wristwatch", "piercing", "purse", "bag"]];
    //The rookie chest shouldn't have anything. The basic chest can only have the first 5 slots. After that every
    //chest allows 1 more slot.

    prefixes: string[] = ["lustrous", "vorpal", "acidic", "questionable", "vibrating", "ineffable", "silly",
        "renowned", "glistening", "gossamer", "toxic", "bejeweled", "shadowy", "shady", "resplendent",
        "serpentine", "hircine", "hirsute", "xenophilic", "blessed", "well-crafted", "deluxe", "shiny",
        "humorous", "ill-tempered", "solid", "ectoplasmic", "adamantine", "faceted", "sanctified", "kinky",
        "perverted", "diurnal", "crepuscular", "nocturnal", "saturnine", "grim", "hardened", "hallowed",
        "elven", "dwarven", "inhuman", "divine", "profane", "axiomatic", "tautological", "your mom's",
        "nonbinary", "engorged", "problematic", "blue", "dour", "mythic", "legendary", "menacing", "semiotic",
        "wondrous", "splendid", "resplendent", "furry", "majestic", "mighty", "mirthful", "unparalleled",
        "pleasant", "suspicious", "doomed", "blackguard's", "Mordenkainen's", "masterful", "well-intentioned",
        "lunar", "solar", "quirky", "resolute", "tenacious", "quick", "inhumane", "tight", "oversized",
        "outlandish", "freezing", "malicious", "beneficient", "portable", "unimaginable", "forbidden",
        "forbidding", "masterwork", "grand", "grandiose", "loquacious", "laconic", "stoic", "hardy",
        "reinforced", "adequate", "superior", "superlative", "exquisite", "extraordinary", "jovial",
        "martial", "marital", "venerated", "sonic", "acerbic", "vigilant"];
    suffixes: string[] = ["of the eagle", "of Zagy", "of gainful conjuration", "of the bear",
        "of feather fall", "of the diplodocus", "of charisma", "of annihilation", "of lordly might",
        "of the mole rat", "of masculinity/femininity", "+1", "defender", "+2", "of ill repute",
        "of the night", "aflame", "of holding"]
    allEnchantments: IEnchantment[] = [];

    junkNames: string[] = ["widget", "dingus", "tchotchke", "thingy", "doodad", "wad", "conjecture",
        "nonce", "scribble", "ditty", "tidbit", "trinket", "trifle", "triviality", "mite", "bauble",
        "novelty", "knickknack", "doggerel", "curio", "novelty", "whatsit", "PHP app"];
    artNames: string[] = ["painting", "sculpture", "song", "opera", "symphony", "bracelet", "novel", "play",
        "board game", "video game", "comic", "dance", "theorem", "fanfic", "story", "novella", "TV show", "dish",
        "urn", "coffer", "outfit", "statue", "idol"];

    extraItemsPerLootBox: number[] = [0, 0, 0, 0.3, 0.3, 0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 1, 1.5, 25, 0]
    slotsAllowedByRank: number[] = [1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 14, 14, 14, 14, 14, 14];
    constructor(private _equipmentService: EquipmentService) {
        this.allEquipmentSlots = _equipmentService.getAllEquipmentSlots();
        this.materialsByChestRank = [[{ name: "unknown", power: 1 }],
        [{ name: "iron", power: 2 }, { name: "steel", power: 3 }],
        [{ name: "decrepit", power: 2 }, { name: "unearthed", power: 3 }, { name: "historic", power: 4 }],
        [{ name: "zinc", power: 2 }, { name: "tin", power: 3 }, { name: "silver", power: 4 }, { name: "mithril", power: 5 }],
        [{ name: "silicone", power: 3 }, { name: "silicon", power: 4 }, { name: "electric", power: 5 }, { name: "cybernetic", power: 6 }],
        [{ name: "imitation", power: 4 }, { name: "rubber", power: 5 }, { name: "inflatable", power: 6 }, { name: "rainbow", power: 7 }],
        [{ name: "pyrite", power: 5 }, { name: "gilt", power: 6 }, { name: "gold", power: 7 }, { name: "orichalcum", power: 8 }],
        [{ name: "unclaimed", power: 6 }, { name: "hovering", power: 7 }, { name: "impossible", power: 8 }, { name: "prophesied", power: 9 }],
        [{ name: "wooden", power: 7 }, { name: "organic", power: 8 }, { name: "living", power: 9 }, { name: "biological", power: 10 }],
        [{ name: "quartz", power: 8 }, { name: "crystalline", power: 9 }, { name: "diamond", power: 10 }, { name: "adamantine", power: 11 }],
        [{ name: "meteoric", power: 9 }, { name: "planetary", power: 10 }, { name: "stellar", power: 11 }, { name: "galactic", power: 12 }],
        //At this point all the slots are used so the power increases more
        [{ name: "wispy", power: 11 }, { name: "ectoplasmic", power: 13 }, { name: "ethereal", power: 15 }, { name: "astral", power: 17 }],
        [{ name: "black", power: 14 }, { name: "silver-filigreed", power: 17 }, { name: "obsidian", power: 20 }, { name: "bloodstone", power: 23 }],
        [{ name: "inconceivable", power: 18 }, { name: "infinite", power: 22 }, { name: "eternal", power: 26 }, { name: "endless", power: 30 }]
        ];
        this.prefixes.forEach((item) => this.allEnchantments.push({ text: item, type: enchantmentType.prefix }));
        this.suffixes.forEach((item) => this.allEnchantments.push({ text: item, type: enchantmentType.suffix }));
    }

    getItemsForLootBox(lootBox: IShopItem): IEquipmentItem[] {
        if (lootBox.rank == 0) {
            return [{
                itemName: "Claymore of Commencement", type: equipmentType.equippable, slot: equipmentSlot.mainhand,
                power: 3, value: 1, rarity: 1
            }]
        }
        if (lootBox.rank == 14) {
            return this.getItemsForVictoryChest();
        }

        let allItems = [];
        let possibleItems = [];

        possibleItems.push(this.createEquipmentItemForLootBox(lootBox));

        let extraItems = this.extraItemsPerLootBox[lootBox.rank];
        while (extraItems > 1) {
            possibleItems.push(this.createEquipmentItemForLootBox(lootBox));
            extraItems -= 1;
        }

        if (Math.random() < extraItems) {
            possibleItems.push(this.createEquipmentItemForLootBox(lootBox));
        }

        allItems.push(this.findMostPowerfulItem(possibleItems));

        let junkItems: IEquipmentItem[] = this.getJunkForLootBox(lootBox);
        junkItems.forEach((item) => { allItems.push(item) });

        return allItems;
    }

    createEquipmentItemForLootBox(lootBox: IShopItem): IEquipmentItem {
        let slot = this.getRandomSlotForLootBox(lootBox);
        let baseItem = this.getNameAndPowerForItem(lootBox, slot);
        let rarity = this.getRarityForItem(lootBox, baseItem.power);

        return {
            itemName: baseItem.name, type: equipmentType.equippable, slot: slot,
            power: baseItem.power, value: baseItem.power, rarity: rarity
        };
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
        let materialAndPowerList = this.materialsByChestRank[lootBox.rank];
        let materialAndPower = materialAndPowerList[Math.floor(Math.random() * materialAndPowerList.length)];
        let enchantmentCount = this.getEnchantmentCountForChest(lootBox);
        let baseName = materialAndPower.name + " " + this.getBaseItemBySlot(slot);

        return {
            name: this.getEnchantedName(baseName, enchantmentCount),
            power: materialAndPower.power + this.powerForEnchantmentCount[enchantmentCount]
        };
    }

    findMostPowerfulItem(items: IEquipmentItem[]): IEquipmentItem{
        let best: IEquipmentItem = items[0];
        items.forEach((item) => {if (item.power > best.power) {best = item;}});
        return best;
    }

    //TODO: see what works with these values                 
    uncommonThresholds: number[] =  [99, 99, 5,  6,  8,   9, 11, 13, 15, 18, 20, 25, 30, 40];
    rareThresholds: number[] =      [99, 99, 99, 8,  9,  11, 14, 16, 18, 21, 24, 28, 35, 45];
    epicThresholds: number[] =      [99, 99, 99, 99, 99, 13, 17, 19, 21, 25, 30, 35, 40, 50];
    legendaryThresholds: number[] = [70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70];

    getRarityForItem(lootBox: IShopItem, power: number): rarity {
        if (power >= this.legendaryThresholds[lootBox.rank]) {
            return rarity.legendary;
        }
        else if (power >= this.epicThresholds[lootBox.rank]) {
            return rarity.epic;
        }
        else if (power >= this.rareThresholds[lootBox.rank]) {
            return rarity.rare;
        }
        else if (power >= this.uncommonThresholds[lootBox.rank]) {
            return rarity.uncommon;
        }
        else {
            return rarity.common;
        }
    }

    getEnchantedName(baseName: string, enchantmentCount: number): string {
        let enchantments: IEnchantment[] = [];
        for (let i = 0; i < enchantmentCount; i++) {
            enchantments.push(this.allEnchantments[Math.floor(Math.random() * this.allEnchantments.length)]);
        }
        let workingName: string = baseName;
        enchantments.forEach((enchantment) => {
            if (enchantment.type == enchantmentType.prefix) {
                workingName = enchantment.text + " " + workingName;
            }
            else { //it's a suffix
                workingName = workingName + " " + enchantment.text;
            }
        })
        return workingName;
    }

    chanceOfEnchantment: number = 1 / 6;

    /*Each rank beyond the first gives a 1/6 chance of an enchantment.
    Enchantment power is triangular so 1/2/3/4 enchantments gives 1/3/6/10 power.*/
    getEnchantmentCountForChest(lootBox: IShopItem): number {
        let enchantments = 0;
        let possibleEnchantments = lootBox.rank;
        if (lootBox.rank >= 11) {
            possibleEnchantments += ((lootBox.rank - 10) * (lootBox.rank - 10)); //At this level there are no slots left so allow more enchantments
        }
        for (let i = 1; i < lootBox.rank; i++) {
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

    chanceOfJunk: number = 1 / 8; //chance of finding some junk item
    chanceOfArt: number = 1 / 4; //chance of it being valuable (more Fame) art


    getJunkForLootBox(box: IShopItem): IEquipmentItem[] {
        let items: IEquipmentItem[] = [];
        let junkName: string;
        let junkValue: number;
        if (Math.random() < this.chanceOfJunk) {
            if (Math.random() < this.chanceOfArt) {
                junkName = this.artNames[Math.floor(Math.random() * this.artNames.length)];
                junkValue = 0;
                for (let i = 0; i < 3; i++) {
                    junkValue += Math.floor(Math.random() * box.rank * box.rank * 10);
                }
            }
            else {
                junkName = this.junkNames[Math.floor(Math.random() * this.junkNames.length)];
                junkValue = Math.floor(Math.random() * box.rank * 10) + 1;
            }

            let fullName = this.prefixes[Math.floor(Math.random() * this.prefixes.length)] + " " + junkName;

            items.push({
                itemName: fullName, type: equipmentType.art,
                value: junkValue, rarity: rarity.junk
            })
        }

        return items;
    }

    getItemsForVictoryChest(): IEquipmentItem[] {
        return [{
            itemName: "Claymore of Completion", type: equipmentType.equippable, slot: equipmentSlot.mainhand,
            power: 200, value: 50000, rarity: rarity.legendary
        },
        {
            itemName: "Cassette of Culmination", type: equipmentType.equippable, slot: equipmentSlot.offhand,
            power: 200, value: 50000, rarity: rarity.legendary
        },
        {
            itemName: "Armor of Achievement", type: equipmentType.equippable, slot: equipmentSlot.armor,
            power: 200, value: 50000, rarity: rarity.legendary
        },
        {
            itemName: "Trilby of Triumph", type: equipmentType.equippable, slot: equipmentSlot.helm,
            power: 200, value: 50000, rarity: rarity.legendary
        },
        {
            itemName: "Pants of Performance", type: equipmentType.equippable, slot: equipmentSlot.legs,
            power: 200, value: 50000, rarity: rarity.legendary
        },
        {
            itemName: "Shoes of Success", type: equipmentType.equippable, slot: equipmentSlot.feet,
            power: 200, value: 50000, rarity: rarity.legendary
        },
        {
            itemName: "Gloves of Greatness", type: equipmentType.equippable, slot: equipmentSlot.hands,
            power: 200, value: 50000, rarity: rarity.legendary
        },
        {
            itemName: "Cloak of Conclusion", type: equipmentType.equippable, slot: equipmentSlot.cloak,
            power: 200, value: 50000, rarity: rarity.legendary
        },
        {
            itemName: "Manacles of Merit", type: equipmentType.equippable, slot: equipmentSlot.wrists,
            power: 200, value: 50000, rarity: rarity.legendary
        },
        {
            itemName: "Cummerbund of Consummation", type: equipmentType.equippable, slot: equipmentSlot.waist,
            power: 200, value: 50000, rarity: rarity.legendary
        },
        {
            itemName: "Epaulets of Effort", type: equipmentType.equippable, slot: equipmentSlot.shoulders,
            power: 200, value: 50000, rarity: rarity.legendary
        },
        {
            itemName: "Ring of Realization", type: equipmentType.equippable, slot: equipmentSlot.ring,
            power: 200, value: 50000, rarity: rarity.legendary
        },
        {
            itemName: "Amulet of Achievement", type: equipmentType.equippable, slot: equipmentSlot.amulet,
            power: 200, value: 50000, rarity: rarity.legendary
        },
        {
            itemName: "Wallet of Winning", type: equipmentType.equippable, slot: equipmentSlot.accessory,
            power: 200, value: 50000, rarity: rarity.legendary
        }
        ];
    }
}

