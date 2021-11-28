import { InputType, Field } from '@nestjs/graphql';
import { MinLength, IsEnum, IsNotEmpty } from 'class-validator';
import { RecordAction } from './record-action.enum';

@InputType()
export class CreateRecordInput {
  @IsNotEmpty()
  @IsEnum(RecordAction)
  @Field()
  action: RecordAction;

  @MinLength(1)
  @Field()
  cryptoName: string;

  @Field()
  @IsNotEmpty()
  price: number;

  @Field()
  @IsNotEmpty()
  quantity: number;

  @Field()
  @IsNotEmpty()
  forLongterm: boolean;
}
