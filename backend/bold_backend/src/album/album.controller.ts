import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('album')
@ApiTags('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return {
      status: "success",
      code: 200,
      message: "Song created successfully",
      data: await this.albumService.create(createAlbumDto)
    }
    return ;
  }

  @Get()
  async findAll() {
    return {
      status: "success",
      code: 200,
      message: "Song created successfully",
      data: await this.albumService.findAll()
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      status: "success",
      code: 200,
      message: "Song created successfully",
      data: await this.albumService.findOne(id)
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return {
      status: "success",
      code: 200,
      message: "Song created successfully",
      data: await this.albumService.update(id, updateAlbumDto)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      status: "success",
      code: 200,
      message: "Song created successfully",
      data: await this.albumService.remove(id)
    }
  }
}
