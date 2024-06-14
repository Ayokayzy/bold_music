import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SongsService } from 'src/songs/songs.service';
import { FileUploadService } from './file-upload.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
    providers: [SongsService, FileUploadService, CloudinaryService],
    imports: [DatabaseModule, CloudinaryModule],

})
export class FileUploadModule {}
