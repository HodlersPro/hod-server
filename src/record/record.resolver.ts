import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { GqlAuthGuard } from 'src/user/user.guard';
import { CreateRecordInput } from './create-record.input';
import { PortfolioType } from './portfolio.type';
import { RecordListFilters } from './record-list-filters';
import { RecordListResponseType } from './record-list-response.type';
import { Portfolio, Record } from './record.entity';
import { RecordService } from './record.service';
import { RecordType } from './record.type';

@Resolver((of) => RecordType)
export class RecordResolver {
  constructor(private recordService: RecordService) {}

  @Query((returns) => RecordType)
  @UseGuards(GqlAuthGuard)
  async record(@CurrentUser() user: User, @Args('id') id: string) {
    return this.recordService.getRecord(id, user._id.toString());
  }

  @Query(
    (returns) =>
      //[RecordType],
      RecordListResponseType,
  )
  @UseGuards(GqlAuthGuard)
  async records(
    @CurrentUser() user: User,
    @Args('recordListFilters') recordListFilters: RecordListFilters,
  ) {
    const rec = await this.recordService.getRecords(
      user._id.toString(),
      recordListFilters,
    );

    const response = {
      totalRecordCount: rec.length,
      records: rec,
    };

    return response;
  }

  @Mutation((returns) => RecordType)
  @UseGuards(GqlAuthGuard)
  async createRecord(
    @CurrentUser() user: User,
    @Args('createRecordInput') createRecordInput: CreateRecordInput,
  ) {
    return this.recordService.createRecord(
      createRecordInput,
      user._id.toString(),
    );
  }

  @Query((returns) => [PortfolioType])
  @UseGuards(GqlAuthGuard)
  async portfolio(@CurrentUser() user: User) {
    return this.recordService.getPortfolio(user._id.toString());
  }
}
