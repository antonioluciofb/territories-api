import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DontVisit } from './interfaces/dontVisit.interface';
import { CardsService } from 'cards/cards.service';
import { CreateDontVisitDTO } from './dtos/create-dontVisit';
import { UpdateDontVisitDTO } from './dtos/update-dontVisit';

@Injectable()
export class DontVisitService {
  constructor(
    @InjectModel('DontVisit')
    private readonly dontVisitModel: Model<DontVisit>,
    @Inject(forwardRef(() => CardsService))
    private readonly cardsService: CardsService,
  ) {}

  async findAll(): Promise<DontVisit[]> {
    return this.dontVisitModel.find().populate('card');
  }

  async findOne(id: string): Promise<DontVisit> {
    return this.dontVisitModel.findById(id);
  }

  async update(id: string, dontVisit: UpdateDontVisitDTO): Promise<DontVisit> {
    const dontVisitFound = await this.dontVisitModel.findById(id);

    if (dontVisitFound.card !== dontVisit.card) {
      await this.cardsService.removeDontVisit(
        dontVisitFound.card,
        dontVisitFound._id,
      );
      await this.cardsService.addDontVisit(dontVisit.card, dontVisitFound._id);
    }

    if (!dontVisitFound) {
      throw new BadRequestException(`DontVisit with id ${id} not found`);
    }

    return this.dontVisitModel.findByIdAndUpdate(id, dontVisit, {
      new: true,
    });
  }

  async delete(id: string): Promise<void> {
    const dontVisit = await this.dontVisitModel.findById(id);

    if (!dontVisit) {
      throw new BadRequestException(`DontVisit with id ${id} not found`);
    }

    await this.cardsService.removeDontVisit(dontVisit.card, dontVisit._id);

    await this.dontVisitModel.deleteOne({ _id: id });
  }

  async create(dontVisit: CreateDontVisitDTO): Promise<DontVisit> {
    const dontVisitFound = await this.dontVisitModel.findOne({
      card: dontVisit.card,
      street: dontVisit.street,
      number: dontVisit.number,
      type: dontVisit.type,
      observations: dontVisit.observations,
    });

    if (dontVisitFound) {
      throw new BadRequestException('DontVisit already exists');
    }

    const createdDontVisit = new this.dontVisitModel(dontVisit);

    await this.cardsService.addDontVisit(dontVisit.card, createdDontVisit._id);

    return createdDontVisit.save();
  }

  async deleteManyByCard(cardId: string): Promise<void> {
    await this.dontVisitModel.deleteMany({ card: cardId });
  }
}
