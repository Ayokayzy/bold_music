import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
    async fileUploader(path: string) {
        try {
            const data = await v2.uploader.upload(path, {
                resource_type: "auto",
            });
            return data
        } catch (error) {
            throw new Error(error)
        }
    }
}
