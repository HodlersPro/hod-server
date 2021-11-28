// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// // import { TypeOrmModule } from '@nestjs/typeorm';
// import { Record, RecordSchema } from './record.entity';
// import { RecordResolver } from './record.resolver';
// import { RecordService } from './record.service';

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: Record.name, schema: RecordSchema }]),
//     // TypeOrmModule.forFeature([RecordModule]),
//   ],
//   providers: [RecordResolver, RecordService],
//   exports: [RecordService],
// })
// export class RecordModule {}

////////////////////////
////////////////////////
////////////////////////

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Record, RecordSchema } from './record.entity';
import { RecordResolver } from './record.resolver';
import { RecordService } from './record.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Record.name, schema: RecordSchema }]),
  ],
  providers: [RecordResolver, RecordService],
  exports: [RecordService],
})
export class RecordModule {}
