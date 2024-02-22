import { Module, forwardRef } from '@nestjs/common';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordSchema } from './interfaces/record.schema';
import { CardsModule } from '../cards/cards.module';
import { UsersModule } from '../users/users.module';
import { DesignatedModule } from 'designated/designated.module';

@Module({
  imports: [
    forwardRef(() => CardsModule),
    UsersModule,
    DesignatedModule,
    MongooseModule.forFeature([
      {
        name: 'Records',
        schema: RecordSchema,
      },
    ]),
  ],
  controllers: [RecordsController],
  providers: [RecordsService],
  exports: [RecordsService],
})
export class RecordsModule {}
