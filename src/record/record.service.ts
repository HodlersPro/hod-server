// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Record } from './record.entity';
// import { v4 as uuid } from 'uuid';
// import { CreateRecordInput } from './create-record.input';

// @Injectable()
// export class RecordService {
//   constructor(
//     @InjectRepository(Record) private recordRepository: Repository<Record>,
//   ) {}

//   async getRecord(id: string): Promise<Record> {
//     return this.recordRepository.findOne({ id });
//   }

//   async getRecords(): Promise<Record[]> {
//     return this.recordRepository.find();
//   }

//   async createRecord(createRecordInput: CreateRecordInput): Promise<Record> {
//     const {
//       action,
//       cryptoName,
//       price,
//       quantity,
//       forLongterm,
//     } = createRecordInput;

//     const record = this.recordRepository.create({
//       id: uuid(),
//       action,
//       cryptoName,
//       price,
//       quantity,
//       forLongterm,
//     });

//     return this.recordRepository.save(record);
//   }
// }

////////////////
////////////////
////////////////

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Portfolio, Record, RecordDocument } from './record.entity';
import { v4 as uuid } from 'uuid';
import { CreateRecordInput } from './create-record.input';
import { RecordListFilters } from './record-list-filters';
import { RecordListResponseType } from './record-list-response.type';

@Injectable()
export class RecordService {
  constructor(
    @InjectModel(Record.name) private recordModel: Model<RecordDocument>,
  ) {}

  async getRecord(id: string, userId: string): Promise<Record> {
    return this.recordModel.findOne({ id, userId });
  }

  async getRecords(
    userId: string,
    recordListFilters: RecordListFilters,
  ): Promise<Record[]> {
    // old
    //return this.recordModel.find({ userId }).sort({ createdAt: -1 });
    //

    const { skip, take, order } = recordListFilters;

    const records = await this.recordModel
      .find({ userId })
      .sort({ createdAt: order === 'asc' ? 1 : -1 });

    const trimmedRecords = records.splice(skip, take);

    return trimmedRecords;
  }

  async getPortfolio(userId: string): Promise<Portfolio[]> {
    const m = await this.recordModel.aggregate([
      {
        $group: {
          _id: { cryptoName: '$cryptoName', userId: '$userId' },
          cryptoName: { $first: '$cryptoName' },
          recordCount: { $sum: 1 },
          buyAmount: {
            $sum: {
              $cond: {
                if: {
                  $eq: ['$action', 'BUY'],
                },
                then: { $sum: '$price' },
                else: {},
              },
            },
          },
          sellAmount: {
            $sum: {
              $cond: {
                if: {
                  $eq: ['$action', 'SELL'],
                },
                then: { $sum: '$price' },
                else: {},
              },
            },
          },
          buyQuantity: {
            $sum: {
              $cond: {
                if: {
                  $eq: ['$action', 'BUY'],
                },
                then: { $sum: '$quantity' },
                else: {},
              },
            },
          },
          sellQuantity: {
            $sum: {
              $cond: {
                if: {
                  $eq: ['$action', 'SELL'],
                },
                then: { $sum: '$quantity' },
                else: {},
              },
            },
          },
        },
      },
      {
        $project: {
          _id: false, // We dont need _id
          id: '$_id.cryptoName', // We dont really need this either
          cryptoName: '$cryptoName',
          recordCount: '$recordCount', // Total amount of records having the cryptoName
          // buyAmount: { $round: ['$buyAmount', 4] }, // Total price on BUY records
          // sellAmount: { $round: ['$sellAmount', 4] }, // Total price on SELL records
          // buyQuantity: { $round: ['$buyQuantity', 4] }, // Total quantity on BUY records
          // sellQuantity: { $round: ['$sellQuantity', 4] }, // Total quantity on SELL records
          currentInvestedAmount: {
            $round: [{ $subtract: ['$buyAmount', '$sellAmount'] }, 4],
          },
          currentOwnedQuantity: {
            $round: [{ $subtract: ['$buyQuantity', '$sellQuantity'] }, 4],
          },
          currentAveragePrice: {
            // Calc on dividing currentInvestedAmount by currentOwnedQuantity
            $round: [
              {
                $divide: [
                  { $subtract: ['$buyAmount', '$sellAmount'] }, // currentInvestedAmount
                  { $subtract: ['$buyQuantity', '$sellQuantity'] }, // currentOwnedQuantity
                ],
              },
              4,
            ],
          },
        },
      },
      {
        $sort: { cryptoName: 1 },
      },
    ]);

    console.log('m', m);
    return m;
  }

  async createRecord(
    createRecordInput: CreateRecordInput,
    userId: string,
  ): Promise<Record> {
    const {
      action,
      cryptoName,
      price,
      quantity,
      forLongterm,
    } = createRecordInput;

    return this.recordModel.create({
      id: uuid(),
      userId,
      action,
      cryptoName,
      price,
      quantity,
      forLongterm,
      createdAt: new Date().toISOString(),
    });
  }
}
