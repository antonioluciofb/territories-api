import { Module, forwardRef } from '@nestjs/common';
import { DontVisitController } from './dontVisit.controller';
import { DontVisitService } from './dontVisit.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DontVisitSchema } from './interfaces/dontVisit.schema';
import { CardsModule } from 'cards/cards.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'DontVisit',
        schema: DontVisitSchema,
      },
    ]),
    forwardRef(() => CardsModule),
  ],
  controllers: [DontVisitController],
  providers: [DontVisitService],
  exports: [DontVisitService],
})
export class DontVisitModule {}
