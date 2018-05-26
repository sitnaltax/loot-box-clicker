export enum skillId { critChance, critPower, autoDonate, multiBuy };

export interface ISkill{
    skillId: skillId;
    name: string;
    baseCost: number;
    scalingFactor: number;
    helpText: string;
}