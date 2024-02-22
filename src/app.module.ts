import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { ConfigModule } from '@nestjs/config';
import { DontVisitModule } from './dontvisit/dontVisit.module';
import { DesignatedModule } from './designated/designated.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordsModule } from './records/records.module';
import { StorageModule } from './storage/storage.module';
import { TerritorialClosureModule } from './territorial-closure/territorial-closure.module';
import { UsersModule } from 'users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
    }),
    MongooseModule.forRoot(
      process.env.NODE_ENV === 'development'
        ? process.env.MONGO_URI_DEV
        : process.env.MONGO_URI,
      {},
    ),
    UsersModule,
    CardsModule,
    RecordsModule,
    AuthModule,
    DontVisitModule,
    DesignatedModule,
    TerritorialClosureModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
