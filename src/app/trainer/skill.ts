export enum skillId { critRate, critPower, autoDonate };

export interface ISkill{
    skillId: skillId;
    name: string;
    baseCost: number;
    scalingFactor: number;
}