import { Model } from 'mongoose';
export interface Counter {
    modelName: string;
    sequence: number;
    inc_id?: number;
    [prop: string]: unknown;
}
export interface CounterModel extends Model<Counter> {
    getSchemaObject(): void,
    getNextSequence(modelName: string, autoIncrementKey?: string | number): Promise<number>;
}
