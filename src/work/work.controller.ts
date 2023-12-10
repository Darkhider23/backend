// work.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { WorkService } from './work.service';
import { Work } from './work.model';
import * as path from 'path';

@Controller('works')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Get()
  async findAll(): Promise<Work[]> {
    return this.workService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Work> {
    return this.workService.findOne(id);
  }

  @Post()
  async create(@Body() work: Work): Promise<Work> {
    return this.workService.create(work);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() work: Work): Promise<Work> {
    return this.workService.update(id, work);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Work> {
    return this.workService.remove(id);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('images', 10))
  async uploadImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('title') title: string,
  ) {
    console.log('Files upload request received:', files);

    if (!files || files.length === 0) {
      console.log('No files received');
      return { error: 'No files received' };
    }

    const imageNames = [];

    try {
      // Save the images to the database
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const fileExtension = path.extname(file.originalname);
        const imageName = `${title}-${Date.now()}-${index}${fileExtension}`;
        imageNames.push(imageName);

        const absolutePath = path.join(
          process.cwd(),
          'public',
          'uploads',
          imageName,
        );

        // Use asynchronous file writing
        await fs.promises.writeFile(absolutePath, file.buffer);
      }

      const updatedWork = await this.workService.addImagesToWork(
        title,
        imageNames,
      );

      console.log('Files uploaded successfully. Names:', imageNames);
      return { imageNames, updatedWork };
    } catch (error) {
      console.error('Error saving files:', error);
      return { error: 'Error saving files' };
    }
  }
  @Delete(':id/images/:imageName')
  async deleteImage(
    @Param('id') id: string,
    @Param('imageName') imageName: string,
  ): Promise<Work> {
    return this.workService.deleteImage(id, imageName);
  }
}
