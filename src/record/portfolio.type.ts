import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Portfolio')
export class PortfolioType {
  @Field()
  id: string;

  @Field()
  cryptoName: string;

  @Field()
  recordCount: number;

  @Field()
  currentInvestedAmount: number;

  @Field()
  currentOwnedQuantity: number;

  @Field()
  currentAveragePrice: number;
}
