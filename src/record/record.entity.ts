// import { Entity, PrimaryColumn, Column, ObjectIdColumn } from 'typeorm';
// import { RecordAction } from './record-action.enum';

// @Entity()
// export class Record {
//   @ObjectIdColumn()
//   _id: string;

//   @PrimaryColumn()
//   id: string;

//   @Column()
//   action: RecordAction;

//   @Column()
//   cryptoName: string;

//   @Column()
//   price: number;

//   @Column()
//   quantity: number;

//   @Column()
//   forLongterm: boolean;

//   @Column()
//   createdAt: string;
// }

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';
import { RecordAction } from './record-action.enum';

registerEnumType(RecordAction, {
  name: 'RecordAction',
  description: 'RecordAction Type (Buy/Sell)',
});

@ObjectType()
@Schema()
export class Record {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String)
  @Prop()
  id: string;

  @Field(() => String)
  @Prop()
  userId: string;

  @Field(() => RecordAction)
  @Prop({
    type: String,
    required: true,
    enum: RecordAction,
  })
  action?: string;

  @Field(() => String)
  @Prop()
  cryptoName: string;

  @Field(() => Number)
  @Prop()
  price: number;

  @Field(() => Number)
  @Prop()
  quantity: number;

  @Field(() => Boolean)
  @Prop()
  forLongterm: boolean;

  @Field(() => String)
  @Prop()
  createdAt: string;
}

export type RecordDocument = Record & Document;
export const RecordSchema = SchemaFactory.createForClass(Record);

///////////
///////////

@ObjectType()
@Schema()
export class Portfolio {
  @Field(() => String)
  @Prop()
  id: string;

  @Field(() => String)
  @Prop()
  cryptoName: string;

  @Field(() => Number)
  @Prop()
  recordCount: number;

  @Field(() => Number)
  @Prop()
  currentInvestedAmount: number;

  @Field(() => Number)
  @Prop()
  currentOwnedQuantity: number;

  @Field(() => Number)
  @Prop()
  currentAveragePrice: number;
}

export type PortfolioDocument = Portfolio & Document;
export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
