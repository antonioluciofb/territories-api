import { Module, forwardRef } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from './interfaces/card.schema';
import { RecordsModule } from '../records/records.module';
import { DontVisitModule } from 'dontvisit/dontVisit.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Card',
        schema: CardSchema,
      },
    ]),
    forwardRef(() => RecordsModule),
    forwardRef(() => DontVisitModule),
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
