import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [SongsController],
  providers: [SongsService, FileUploadService, CloudinaryProvider],
  imports: [DatabaseModule, FileUploadModule, CloudinaryModule]
})
export class SongsModule {}
