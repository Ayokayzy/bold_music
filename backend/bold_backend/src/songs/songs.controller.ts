import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('songs')
@ApiTags('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) { }

  @Post()
  async create(@Body(ValidationPipe) createSongDto: CreateSongDto) {
    return {
      status: "success",
      code: 200,
      message: "Song created successfully",
      data: await this.songsService.create(createSongDto)
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
