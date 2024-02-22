import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class StorageService {
  private s3 = new S3();

  async serveFile(key: string) {
    const params = {
      Bucket: 'publicdatas3',
      Key: key,
    };

    const file = await this.s3.getObject(params).promise();

    return 'data:image/jpeg;base64,' + file.Body.toString('base64');
  }
}
