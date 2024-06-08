import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Res, HttpStatus } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Public } from 'src/public';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) { }

  @Public()
  @Post()
  async create(@Body(ValidationPipe) createArtistDto: CreateArtistDto) {
    const user = await this.artistsService.create(createArtistDto)
    return {
      status: "success",
      code: 201,
      message: "Artist created successfully",
      data: user
    }
  }

  @Public()
  @Get()
  async findAll() {
    const user = await this.artistsService.findAll()
    return {
      status: "success",
      code: 200,
      message: "Artists fetched successfully",
      data: user
    }
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      status: "success",
      code: 200,
      message: "Artist fetched successfully",
      data: await this.artistsService.findOne(id)
    }
  }

  @Public()
  @Patch(':id')
  async update(@Param('id') id: string, @Body(ValidationPipe) updateArtistDto: UpdateArtistDto) {
    return {
      status: "success",
      code: 200,
      message: "Artist updated successfully",
      data: await this.artistsService.update(id, updateArtistDto)
    }
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return {
      status: "success",
      code: 200,
      message: "Artists fetched successfully",
      data: this.artistsService.remove(id)
    }
  }
}
