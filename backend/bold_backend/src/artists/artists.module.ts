import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DatabaseModule } from 'src/database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/roles.guard';

@Module({
  controllers: [ArtistsController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    ArtistsService],
  imports: [DatabaseModule]
})
export class ArtistsModule { }
