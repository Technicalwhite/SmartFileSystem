/*
 * @Author: Technicalwhite 2234558846@qq.com
 * @Date: 2025-06-23 01:27:00
 * @LastEditors: Technicalwhite 2234558846@qq.com
 * @LastEditTime: 2025-06-23 11:12:18
 * @FilePath: \SmartFileSystem\src\Modules\AutoIncrement.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { Schema, model, Document, Model } from 'mongoose';
import { Counter, CounterModel } from '../types/AutoIncrementType';
const CounterSchema = new Schema<Counter>({
    modelName: {
        type: String,
        required: true, // 必填
        unique: true // 唯一
    },
    sequence: {
        type: Number,
        default: 100 // 起始序列号
    },
    userId: {
        type: Number,
        default: 100,
    },
}, {
    timestamps: true,
    versionKey: false
});
CounterSchema.statics.getSchemaObject = function (params?: unknown) {
    // console.log('getSchemaObject :>> ', this,CounterSchema);
    return this
}
// 静态方法：获取下一个序列号
CounterSchema.statics.getNextSequence = async function (modelName: string, autoIncrement: string): Promise<unknown> {
    const isModel = await Counters.findOne({ modelName: modelName }).catch((err: unknown) => {
        throw new Error('获取错误' + err)
    })
    // console.log('获取下一个序列号的缓存对象名 :>> ', modelName, isModel);
    if (!isModel) {
        console.log('没有记录该类型ID :>> ', isModel, modelName);
        try {
            await Counters.create([{
                modelName: modelName,
                // inc_id: 1
            }])
            let theCreated = await Counters.findOne({ modelName: modelName })
            if (theCreated && theCreated[autoIncrement]) {
                return theCreated[autoIncrement]
            } else {
                throw new Error('获取失败')
            }
        } catch (error) {
            return error
        }
    } else {
        type Obj = {
            [key: string]: string | number;
        };
        const obj: Obj = {};
        obj[autoIncrement] = 1;
        console.log('object :>> ', obj, autoIncrement);
        try {
            const result = await this.findOneAndUpdate(
                { modelName },
                { $inc: obj },
                { new: true, upsert: true }
            );
            return result[autoIncrement];
        } catch (error) {
            return error
        }
    }
};
const Counters = model<Counter, CounterModel>('Counter', CounterSchema);

/**
 * 获取下一个自增序列号
 * @param {string} modelName 模型名称
 * @param {string} autoIncrementKey 自增的序列名称
 * @returns 下一个序列号
 */
export const getNextSequence = async (modelName: string, autoIncrementKey?: string): Promise<number> => {
    return Counters.getNextSequence(modelName, autoIncrementKey);
};

/**
 * 重置序列号
 * @param modelName 模型名称
 * @param {string} startFrom 重置后的起始值
 * @param {Object} param 重置对象
 * @param {string} param.prop 重置对象键值名, 默认不传为: {} //sequence: 100
 */
export const resetSequence = async (modelName: string, param: { [prop: string]: number } = {}): Promise<void> => {
    // console.log('重置序列号方法参数 :>> ', modelName, param);
    await Counters.findOneAndUpdate(
        { modelName },
        param,
        { upsert: true }
    );
};