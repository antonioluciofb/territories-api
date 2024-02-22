import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TerritorialClosure } from './interfaces/territorial-closure.interface';
import { CardsService } from 'cards/cards.service';
import { RecordsService } from 'records/records.service';
import dateDiff from 'utils/diffDates';

@Injectable()
export class TerritorialClosureService {
  constructor(
    @InjectModel('TerritorialClosure')
    private readonly territorialClosureModel: Model<TerritorialClosure>,
    @Inject(CardsService)
    private readonly cardsService: CardsService,
    @Inject(RecordsService)
    private readonly recordsService: RecordsService,
  ) {}

  async findAll(): Promise<TerritorialClosure[]> {
    return await this.territorialClosureModel.find();
  }

  async findOne(id: string): Promise<TerritorialClosure> {
    return await this.territorialClosureModel.findById(id);
  }

  async create(): Promise<void> {
    const allCards = await this.cardsService.findAll();
    const allRecords = await this.recordsService.findAll();

    const firstStartedCard = allCards.sort((a, b) => {
      if (a.startedAt > b.startedAt) return 1;
      if (a.startedAt < b.startedAt) return -1;
      return 0;
    })[0];
    const lastFinishedCard = allCards.sort((a, b) => {
      if (a.finishedAt > b.finishedAt) return -1;
      if (a.finishedAt < b.finishedAt) return 1;
      return 0;
    })[0];

    const periodRange = dateDiff(
      firstStartedCard.startedAt,
      lastFinishedCard.finishedAt,
    );

    const createdTerritorialClosure = new this.territorialClosureModel({
      startDate: firstStartedCard.startedAt,
      endDate: lastFinishedCard.finishedAt,
      cards: allCards.map((card) => card._id),
      records: allRecords,
      periodRange,
    });

    try {
      await createdTerritorialClosure.save();
      await this.cardsService.restartCards();
      await this.recordsService.restartRecords();
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.territorialClosureModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
