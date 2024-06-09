import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AlbumService {
  constructor(private databaseService: DatabaseService) { }

  async create(createAlbumDto: CreateAlbumDto) {
    const album = await this.databaseService.album.create({
      data: createAlbumDto
    })
    return album
  }

  async findAll() {
    const albums = await this.databaseService.album.findMany({})
    return albums
  }

  async findOne(id: string) {
    const album = await this.databaseService.album.findUnique({
      where: { id, }
    })
    if (!album) throw new NotFoundException("ID does not match any album");
    return album
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    await this.findOne(id)
    const updatedAlbum = await this.databaseService.album.update({
      where: { id, },
      data: updateAlbumDto
    })
    return updatedAlbum;
  }

  async remove(id: string) {
    await this.findOne(id)
    const deletedAlbum = await this.databaseService.album.delete({
      where: { id, }
    })
    return null
  }
}
