export enum skillId { critChance, critPower, autoDonate, multiBuy, advancedAvarice };

export interface ISkill{
    skillId: skillId;
    name: string;
    baseCost: number;
    scalingFactor: number;
    helpText: string;
}