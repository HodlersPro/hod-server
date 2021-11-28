import { ObjectType, Field } from '@nestjs/graphql';
import { Record } from './record.entity';
import { RecordType } from './record.type';

@ObjectType('RecordListResponse')
export class RecordListResponseType {
  @Field()
  totalRecordCount: number;

  @Field((type) => [RecordType])
  records: [RecordType];
}
