import { Module } from '@nestjs/common';
import { DesignatedService } from './designated.service';
import { DesignatedController } from './designated.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DesignatedSchema } from './interfaces/designated.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Designated',
        schema: DesignatedSchema,
      },
    ]),
  ],
  providers: [DesignatedService],
  controllers: [DesignatedController],
  exports: [DesignatedService],
})
export class DesignatedModule {}
