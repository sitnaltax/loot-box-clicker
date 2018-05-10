import { CashService } from "../cash/cash.service";

export interface IHero {
    name: string;
    job: string;
    power: number;
    criticalChance: number;
    criticalPower: number;
    fame: number;
    isAutoAdventuring: boolean;
}
