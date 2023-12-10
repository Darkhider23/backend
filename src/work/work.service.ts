// work.service.ts
import { Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Work } from './work.model';

@Injectable()
export class WorkService {
  constructor(
    @InjectModel(Work.name) private workModel: Model<Work & Document>,
  ) {}

  async findAll(): Promise<any[]> {
    return this.workModel.find().lean().exec();
  }

  async findOne(id: string): Promise<any | null> {
    return this.workModel.findById(id).lean().exec();
  }

  async create(work: Work): Promise<any> {
    const createdWork = new this.workModel(work);
    return createdWork.save();
  }

  async update(id: string, work: Work): Promise<any | null> {
    return this.workModel
      .findByIdAndUpdate(id, work, { new: true })
      .lean()
      .exec();
  }

  async remove(id: string): Promise<any | null> {
    return this.workModel.findByIdAndDelete(id).lean().exec();
  }
  async addImagesToWork(title: string, imageNames: string[]): Promise<Work> {
    const existingWork = await this.workModel.findOne({ title });

    if (!existingWork) {
      throw new Error('Work not found');
    }

    existingWork.images = [...existingWork.images, ...imageNames];

    return existingWork.save();
  }
  async deleteImage(id: string, imageName: string): Promise<Work> {
    const existingWork = await this.workModel.findById(id);

    if (!existingWork) {
      throw new Error('Work not found');
    }

   
    existingWork.images = existingWork.images.filter(
      (image) => image !== imageName,
    );

    return existingWork.save();
  }
}
