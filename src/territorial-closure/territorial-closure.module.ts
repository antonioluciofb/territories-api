import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TerritorialClosureController } from './territorial-closure.controller';
import { TerritorialClosureSchema } from './interfaces/territorial-closure.schema';
import { TerritorialClosureService } from './territorial-closure.service';
import { CardsModule } from 'cards/cards.module';
import { RecordsModule } from 'records/records.module';

@Module({
  imports: [
    CardsModule,
    RecordsModule,
    MongooseModule.forFeature([
      {
        name: 'TerritorialClosure',
        schema: TerritorialClosureSchema,
      },
    ]),
  ],
  providers: [TerritorialClosureService],
  controllers: [TerritorialClosureController],
  exports: [TerritorialClosureService],
})
export class TerritorialClosureModule {}
