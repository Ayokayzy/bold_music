import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MyLoggerService } from './my-logger/my-logger.service';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { EmailModule } from './email/email.module';
import { SongsModule } from './songs/songs.module';
import { ArtistsModule } from './artists/artists.module';
import { AuthService } from './auth/auth.service';
import { AlbumModule } from './album/album.module';
import { PlaylistModule } from './playlist/playlist.module';
import { FileUploadService } from './file-upload/file-upload.service';
import { FileUploadModule } from './file-upload/file-upload.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MyLoggerModule,
    EmailModule,
    SongsModule,
    ArtistsModule,
    AlbumModule,
    PlaylistModule,
    FileUploadModule,
    CloudinaryModule
  ],
  controllers: [AppController],
  providers: [AppService, MyLoggerService, AuthService, FileUploadService, CloudinaryService],
})
export class AppModule { }
