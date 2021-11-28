import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class RecordListFilters {
  @Field()
  @IsNotEmpty()
  order: string;

  @Field()
  @IsNotEmpty()
  skip: number;

  @Field()
  @IsNotEmpty()
  take: number;
}
