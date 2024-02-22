import { CreateRecordDTO } from './dtos/create-record';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Record } from './interfaces/record.interface';
import { CardsService } from '..//cards/cards.service';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { DesignatedService } from 'designated/designated.service';
import { EditRecordDTO } from './dtos/edit-record';

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel('Records') private readonly recordModel: Model<Record>,
    private readonly designatedService: DesignatedService,
    @Inject(forwardRef(() => CardsService))
    private readonly cardsService: CardsService,
  ) {}

  async create(record: CreateRecordDTO): Promise<Record> {
    const card = await this.cardsService.findOne(record.card);

    if (!card) {
      throw new BadRequestException(`Card with id ${record.card} not found`);
    }

    const designated = await this.designatedService.findOne(
      record.designated,
    );

    if (!designated) {
      throw new BadRequestException(
        `User with id ${record.designated} not found`,
      );
    }

    const cardHasAllBlocks = await this.cardsService.cardHasAllBlocks(
      record.card,
      record.pendingBlocks,
    );

    if (!cardHasAllBlocks && record.pendingBlocks.length > 0) {
      throw new BadRequestException(
        `Card with id ${record.card} does not have all blocks in pendingBlocks, please check the card and try again`,
      );
    }

    const terrytoryHasAllPendingBlocks =
      await this.cardsService.cardHasAllPendingBlocks(
        record.card,
        record.pendingBlocks,
      );

    if (!terrytoryHasAllPendingBlocks && record.pendingBlocks.length > 0) {
      throw new BadRequestException(
        `Card with id ${record.card} does not have someone of the blocks in pendingBlocks, please check the card and try again`,
      );
    }

    const createdRecord = new this.recordModel(record);

    await createdRecord.save();

    await this.cardsService.addRecord(record.card, createdRecord.id);
    await this.cardsService.updatePendingBlocks(
      record.card,
      record.pendingBlocks,
    );

    if (record.pendingBlocks.length > 0) {
      if (card.inProgress === false && card.finished === false) {
        await this.cardsService.startCard(record.card);
      }
    } else {
      await this.cardsService.finishCard(record.card);
    }

    return createdRecord.populate(['card', 'designated']);
  }

  async deleteManyByCard(cardId: string): Promise<void> {
    await this.recordModel.deleteMany({ card: cardId });
  }

  async findAll(): Promise<Record[]> {
    return await this.recordModel
      .find()
      .sort({ createdAt: -1 })
      .populate(['card', 'designated']);
  }

  async update(id: string, record: EditRecordDTO): Promise<Record> {
    const card = await this.cardsService.findOne(record.card);

    if (!card) {
      throw new BadRequestException(`Card with id ${record.card} not found`);
    }

    const designated = await this.designatedService.findOne(
      record.designated,
    );

    if (!designated) {
      throw new BadRequestException(
        `User with id ${record.designated} not found`,
      );
    }

    const cardHasAllBlocks = await this.cardsService.cardHasAllBlocks(
      record.card,
      record.pendingBlocks,
    );

    if (!cardHasAllBlocks && record.pendingBlocks.length > 0) {
      throw new BadRequestException(
        `Card with id ${record.card} does not have all blocks in pendingBlocks, please check the card and try again`,
      );
    }

    const terrytoryHasAllPendingBlocks =
      await this.cardsService.cardHasAllPendingBlocks(
        record.card,
        record.pendingBlocks,
      );

    if (!terrytoryHasAllPendingBlocks && record.pendingBlocks.length > 0) {
      throw new BadRequestException(
        `Card with id ${record.card} does not have someone of the blocks in pendingBlocks, please check the card and try again`,
      );
    }

    const updatedRecord = await this.recordModel.findOneAndUpdate(
      { _id: id },
      record,
    );

    return updatedRecord.populate(['card', 'designated']);
  }

  async restartRecords(): Promise<void> {
    await this.recordModel.deleteMany({});
  }
}
