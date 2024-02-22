import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Designated } from './interfaces/designated.interface';
import { CreateDesignatedDTO } from './dtos/create-designated';

@Injectable()
export class DesignatedService {
  constructor(
    @InjectModel('Designated')
    private readonly designatedModel: Model<Designated>,
  ) {}

  async findAll(): Promise<Designated[]> {
    return await this.designatedModel.find({ deletedAt: null });
  }

  async findOne(id: string): Promise<Designated> {
    return await this.designatedModel.findById(id);
  }

  async findByName(name: string): Promise<Designated> {
    return await this.designatedModel.findOne({ name, deletedAt: null });
  }

  async create(designated: CreateDesignatedDTO): Promise<Designated> {
    const designatedAlreadyExists = await this.designatedModel.findOne({
      name: designated.name,
      deletedAt: null,
    });

    if (designatedAlreadyExists) {
      throw new BadRequestException(
        `Designated with name ${designated.name} already exists`,
      );
    }

    const createdDesignated = new this.designatedModel(designated);
    return await createdDesignated.save();
  }

  async update(
    id: string,
    designated: Partial<Designated>,
  ): Promise<Designated> {
    const designatedToUpdate = await this.designatedModel.findById(id);

    if (!designatedToUpdate) {
      throw new BadRequestException(`Designated with id ${id} not found`);
    }

    await designatedToUpdate.updateOne(designated);

    return designatedToUpdate;
  }

  async delete(id: string): Promise<void> {
    const designatedToDelete = await this.designatedModel.findById(id);

    if (!designatedToDelete) {
      throw new BadRequestException(`Designated with id ${id} not found`);
    }

    await designatedToDelete.updateOne({ deletedAt: new Date() });
  }
}
