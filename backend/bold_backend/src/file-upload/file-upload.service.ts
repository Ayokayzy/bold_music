import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class FileUploadService {
    constructor(private cloudinaryService: CloudinaryService) { }

    AWS_S3_BUCKET = process.env.S3_BUCKET;
    s3 = new AWS.S3({
        accessKeyId: "ASIAU6GD23K7IYVAH65E",
        secretAccessKey: "5UPqOOTQnDc57l5vTqzTf11hYIRF6vXnjMSO8HkT",
    });

    async uploadMusic(file: any) {
        console.log({ file });

        const { originalname, buffer, mimetype } = file[0];

        return await this.s3_upload(
            buffer,
            this.AWS_S3_BUCKET,
            originalname,
            mimetype,
        );
    }

    async uploadImage(file: Express.Multer.File) {
        try {
            return await this.cloudinaryService.fileUploader(file.path)
        } catch (error) {
            throw new Error(error)
        }
    }

    async s3_upload(file, bucket, name, mimetype) {
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
            ACL: 'public-read',
            ContentType: mimetype,
            ContentDisposition: 'inline',
            CreateBucketConfiguration: {
                LocationConstraint: 'ap-south-1',
            },
        };
        console.log({ params });

        try {
            let s3Response = await this.s3.upload(params).promise();
            return s3Response;
        } catch (e) {
            throw new Error(e);
        }
    }
}
