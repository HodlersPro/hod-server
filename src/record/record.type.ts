import { ObjectType, Field } from '@nestjs/graphql';
import { RecordAction } from './record-action.enum';

@ObjectType('Record')
export class RecordType {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  action: RecordAction;

  @Field()
  cryptoName: string;

  @Field()
  price: number;

  @Field()
  quantity: number;

  @Field()
  forLongterm: boolean;

  @Field()
  createdAt: string;
}
