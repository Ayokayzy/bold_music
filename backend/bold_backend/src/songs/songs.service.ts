import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SongsService {
  constructor(private databaseService: DatabaseService) { }

  async create(createSongDto: CreateSongDto) {
    const song = await this.databaseService.song.create({
      data: { ...createSongDto, id: uuidv4() }
    })
    return song;
  }

  async findAll() {
    const songs = await this.databaseService.song.findMany({})
    return songs
  }

  async findOne(id: string) {
    const song = await this.databaseService.song.findUnique({
      where: { id }
    })
    if (!song) throw new NotFoundException("ID does not match any song");
    return song
  }

  async update(id: string, updateSongDto: UpdateSongDto) {
    await this.findOne(id)

    const updatedSong = await this.databaseService.song.update({
      where: { id, },
      data: updateSongDto
    });
    return updatedSong
  }

  async remove(id: string) {
    const song = await this.databaseService.song.delete({
      where: { id, }
    })
    return `This action removes a #${id} song`;
  }
}
