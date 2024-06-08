import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistsService {
  constructor(private databaseService: DatabaseService) { }
  async create(createArtistDto: CreateArtistDto) {
    const exist = await this.databaseService.artist.findUnique({
      where: {
        name: createArtistDto.name
      }
    })
    if (exist) throw new ConflictException("artist name already exist")
    const artist = await this.databaseService.artist.create({
      data: { ...createArtistDto, id: uuidv4() }
    })
    return artist;
  }

  async findAll() {
    const artists = await this.databaseService.artist.findMany({})
    return artists;
  }

  async findOne(id: string) {
    const artist = await this.databaseService.artist.findUnique({
      where: {
        id,
      }
    })
    if (!artist) throw new NotFoundException("ID does not belong to any artist");
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    await this.findOne(id)
    const updatedAritst = await this.databaseService.artist.update({
      where: {
        id,
      },
      data: updateArtistDto
    })
    return updatedAritst;
  }

  remove(id: string) {
    return `This action removes a #${id} artist`;
  }
}
