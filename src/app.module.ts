import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { RecordModule } from './record/record.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:superpassword@crypto-v2.mp2o5.mongodb.net/devDb?retryWrites=true&w=majority',
    ),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      debug: false,
    }),
    UserModule,
    RecordModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
