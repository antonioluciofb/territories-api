import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateCardDTO } from './dtos/create-card';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecordsService } from '../records/records.service';
import { Card } from './interfaces/card.interface';
import { DontVisitService } from 'dontvisit/dontVisit.service';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel('Card') private readonly cardModel: Model<Card>,
    @Inject(forwardRef(() => RecordsService))
    private readonly recordsService: RecordsService,
    @Inject(forwardRef(() => DontVisitService))
    private readonly dontVisitService: DontVisitService,
  ) {}

  async create(card: CreateCardDTO): Promise<Card> {
    const cardAlreadyExists = await this.cardModel.findOne({
      name: card.name,
    });

    if (cardAlreadyExists) {
      throw new BadRequestException(
        `Card with name ${card.name} already exists`,
      );
    }

    const blocksList = Array.from({ length: card.blocks }, (_, i) => ({
      number: i + 1,
      isFinished: false,
    }));

    const createdCard = new this.cardModel({
      ...card,
      blocks: blocksList,
      pendingBlocks: blocksList.map((block) => block.number),
    });

    await createdCard.save();

    return createdCard;
  }

  async update(id: string, card: Partial<CreateCardDTO>): Promise<Card> {
    const cardToUpdate = await this.cardModel.findById(id);

    if (!cardToUpdate) {
      throw new BadRequestException(`Card with id ${id} not found`);
    }

    const oldBlocksFinished = cardToUpdate.blocks.filter(
      (block) => block.isFinished,
    );

    const newBlocksList = Array.from({ length: card.blocks }, (_, i) => ({
      number: i + 1,
      isFinished: false,
    })).map((block) => {
      const oldBlock = oldBlocksFinished.find(
        (oldBlock) => oldBlock.number === block.number,
      );

      if (oldBlock) {
        return {
          ...block,
          isFinished: true,
        };
      }

      return block;
    });

    const pendingBlocks = newBlocksList
      .filter((block) => !block.isFinished)
      .map((block) => block.number);

    const updatedCard = await this.cardModel.findByIdAndUpdate(id, {
      ...card,
      blocks: newBlocksList,
      pendingBlocks,
    });

    return updatedCard;
  }

  async addDontVisit(id: string, dontVisitId: string): Promise<Card> {
    const card = await this.cardModel.findById(id);

    if (!card) {
      throw new BadRequestException(`Card with id ${id} not found`);
    }

    await card.updateOne({
      $addToSet: { dontVisit: dontVisitId },
    });

    return card;
  }

  async startCard(id: string): Promise<Card> {
    const card = await this.cardModel.findById(id);

    if (!card) {
      throw new BadRequestException(`Card with id ${id} not found`);
    }

    if (card.finished) {
      throw new BadRequestException(
        `Card with id ${id} already finished, you can't start it again, please close before start again`,
      );
    }

    await card.updateOne({
      inProgress: true,
      startedAt: new Date().toISOString(),
    });

    return card;
  }

  async finishCard(id: string): Promise<Card> {
    const card = await this.cardModel.findById(id);

    if (!card) {
      throw new BadRequestException(`Card with id ${id} not found`);
    }

    if (card.finished) {
      throw new BadRequestException(
        `Card with id ${id} already finished, you can't finish it again, please close before finish again`,
      );
    }

    await card.updateOne({
      finished: true,
      inProgress: false,
      finishedAt: new Date(),
    });

    return card;
  }

  async addRecord(id: string, recordId: string): Promise<Card> {
    const card = await this.cardModel.findById(id);

    if (!card) {
      throw new BadRequestException(`Card with id ${id} not found`);
    }

    await card.updateOne({
      $addToSet: { records: recordId },
    });

    return card;
  }

  async updatePendingBlocks(
    id: string,
    pendingBlocks: number[],
  ): Promise<Card> {
    const card = await this.cardModel.findById(id);

    if (!card) {
      throw new BadRequestException(`Card with id ${id} not found`);
    }

    const updateBlocksWithPendingBlocks = card.blocks.map((block) => {
      if (pendingBlocks.includes(block.number)) {
        return {
          ...block,
          isFinished: false,
        };
      }

      return {
        ...block,
        isFinished: true,
      };
    });

    await card.updateOne({
      pendingBlocks,
      blocks: updateBlocksWithPendingBlocks,
    });

    return card;
  }

  async findOne(id: string): Promise<Card> {
    const card = await this.cardModel.findById(id);

    if (!card) {
      throw new BadRequestException(`Card with id ${id} not found`);
    }

    return card.toJSON();
  }

  async delete(id: string): Promise<void> {
    const card = await this.cardModel.findById(id);

    if (!card) {
      throw new BadRequestException(`Card with id ${id} not found`);
    }

    await this.recordsService.deleteManyByCard(card.id);
    await this.dontVisitService.deleteManyByCard(card.id);

    await card.deleteOne();
  }

  async findAll(): Promise<Card[]> {
    const cards = await this.cardModel.find().populate([
      {
        path: 'records',
        populate: [
          {
            path: 'designated',
          },
        ],
      },
      'dontVisit',
    ]);

    // order - inProgress, notStarted, finished

    const cardsSortByFilter = cards.sort((a, b) => {
      if (a.inProgress && !b.inProgress) {
        return -1;
      }

      if (!a.inProgress && b.inProgress) {
        return 1;
      }

      if (!a.inProgress && !b.inProgress) {
        if (a.finished && !b.finished) {
          return 1;
        }

        if (!a.finished && b.finished) {
          return -1;
        }
      }

      return 0;
    });

    return cardsSortByFilter;
  }

  async removeDontVisit(id: string, dontVisitId: string): Promise<Card> {
    const card = await this.cardModel.findById(id);

    if (!card) {
      throw new BadRequestException(`Card with id ${id} not found`);
    }

    await card.updateOne({
      $pull: { dontVisit: dontVisitId },
    });

    return card;
  }

  async findAllInProgress(): Promise<Card[]> {
    return await this.cardModel
      .find({ finished: false, inProgress: true })
      .populate({
        path: 'records',
        populate: [
          {
            path: 'user',
            select: '-password',
          },
        ],
      });
  }

  async findAllFinished(): Promise<Card[]> {
    return await this.cardModel
      .find({ finished: true, inProgress: false })
      .populate({
        path: 'records',
        populate: [
          {
            path: 'user',
            select: '-password',
          },
        ],
      });
  }

  async findAllNotStarted(): Promise<Card[]> {
    return await this.cardModel
      .find({ inProgress: false, finished: false })
      .populate({
        path: 'records',
        populate: [
          {
            path: 'user',
            select: '-password',
          },
        ],
      });
  }

  async cardHasAllBlocks(
    cardId: string,
    pendingBlocks: number[],
  ): Promise<boolean> {
    const card = await this.cardModel.findById(cardId);

    if (!card) {
      throw new BadRequestException(`Card with id ${cardId} not found`);
    }

    const cardBlocks = card.blocks.map((block) => block.number);

    const hasAllBlocks = pendingBlocks.every((block) =>
      cardBlocks.includes(block),
    );

    return hasAllBlocks;
  }

  async cardHasAllPendingBlocks(
    cardId: string,
    pendingBlocks: number[],
  ): Promise<boolean> {
    const card = await this.cardModel.findById(cardId);

    if (!card) {
      throw new BadRequestException(`Card with id ${cardId} not found`);
    }

    const cardPendingBlocks = card.blocks.reduce(
      (acc, block) => (block.isFinished ? acc : [...acc, block.number]),
      [],
    );

    const hasAllPendingBlocks = pendingBlocks.every((block) =>
      cardPendingBlocks.includes(block),
    );

    return hasAllPendingBlocks;
  }

  async restartCards(): Promise<void> {
    const resetedCards = (await this.cardModel.find()).map((card) => ({
      ...card,
      _id: card._id,
      name: card.name,
      img: card.img,
      inProgress: false,
      finished: false,
      finishedAt: null,
      blocks: card.blocks.map((block) => ({
        ...block,
        isFinished: false,
      })),
      pendingBlocks: card.blocks.map((block) => block.number),
      records: [],
      dontVisit: card.dontVisit,
      createdAt: card.createdAt,
      updatedAt: card.updatedAt,
      startedAt: null,
    }));

    this.cardModel.collection.drop();

    await this.cardModel.insertMany(resetedCards);
  }

  async getFileCard(id: string): Promise<Blob> {
    const card = await this.cardModel.findById(id);

    if (!card) {
      throw new BadRequestException(`Card with id ${id} not found`);
    }

    try {
      const newFile = await fetch(card.img).then((res) => res.blob());

      return newFile;
    } catch (error) {
      console.log('🚀 ~ CardsService ~ getFileCard ~ error:', error);
      return error;
    }
  }
}
