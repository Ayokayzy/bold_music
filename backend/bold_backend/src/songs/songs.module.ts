import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [SongsController],
  providers: [SongsService],
  imports: [DatabaseModule]
})
export class SongsModule {}
