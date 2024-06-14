import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UploadedFile, ParseFilePipe, ParseFilePipeBuilder, HttpStatus, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/public';

@Controller('songs')
@ApiTags('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) { }

  @Public()
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'coverImage', maxCount: 1 },
    { name: 'fileUrl', maxCount: 1 },
  ]))
  async create(
    @Body(ValidationPipe) createSongDto: CreateSongDto,
    @UploadedFiles(
      // new ParseFilePipeBuilder()
      //   .addFileTypeValidator({
      //     fileType: 'mp3',
      //   })
      //   .build({
      //     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      //   })
    ) files: { coverImage?: Express.Multer.File, fileUrl: Express.Multer.File }
  ) {
    const fileString = files.fileUrl
    console.log({ fileString });

    return {
      status: "success",
      code: 200,
      message: "Song created successfully",
      data: await this.songsService.create(createSongDto, files)
    }
  }

  @Get()
  async findAll() {
    return {
      status: "success",
      code: 200,
      message: "Songs fetched successfully",
      data: await this.songsService.findAll()
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      status: "success",
      code: 200,
      message: "Song fetched successfully",
      data: await this.songsService.findOne(id)
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body(new ValidationPipe({ disableErrorMessages: true })) updateSongDto: UpdateSongDto) {
    return {
      status: "success",
      code: 200,
      message: "Song updated successfully",
      data: await this.songsService.update(id, updateSongDto)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      status: "success",
      code: 200,
      message: "Song deleted successfully",
      data: await this.songsService.remove(id)
    }
  }
}
