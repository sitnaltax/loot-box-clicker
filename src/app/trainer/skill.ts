export enum skillId { critChance, critPower, autoDonate };

export interface ISkill{
    skillId: skillId;
    name: string;
    baseCost: number;
    scalingFactor: number;
    helpText: string;
}