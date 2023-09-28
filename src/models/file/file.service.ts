import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import * as sharp from 'sharp'
import { v4 } from 'uuid'
import * as fs from 'fs'
import { Express } from 'express'
import { S3 } from 'aws-sdk'

import config from '@config'

export const UPLOAD_IMAGE_DIR = 'src/upload/image'
const S3_IMAGE_DIR = 'image'
const THUMB_SIZE = {
  width: 200
}

const s3 = new S3({
  accessKeyId: config.s3.access_key_id,
  secretAccessKey: config.s3.secret_access_key
})

interface ImageResponse {
  name: string
  path: string
}

@Injectable()
export class FileService {
  async uploadImage(file: Express.Multer.File, createThumbnail?: boolean) {
    const image = await this.convertToWebp(file.path)
    var thumbnail = await this.convertToWebp(file.path, THUMB_SIZE)

    await this.uploadImageToS3(image)
    await this.uploadImageToS3(thumbnail)

    this.unlinkImage(file.path)
    this.unlinkImage(image.path)
    this.unlinkImage(thumbnail.path)
    return { image: image.name, thumbnail: thumbnail.name }
  }

  async uploadImageToS3({ name, path }: ImageResponse): Promise<void> {
    await s3
      .upload({
        Bucket: config.s3.bucket_name,
        Key: `${S3_IMAGE_DIR}/${name}`,
        Body: fs.readFileSync(path),
        ContentType: 'image/webp'
      })
      .promise()
  }

  async getImageFromS3(id: string) {
    const s3 = new S3({
      accessKeyId: config.s3.access_key_id,
      secretAccessKey: config.s3.secret_access_key
    })

    try {
      const res = await s3
        .getObject({
          Bucket: config.s3.bucket_name,
          Key: `${S3_IMAGE_DIR}/${id}`
        })
        .promise()

      return res
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  async convertToWebp(
    path: string,
    resize?: {
      width?: number
      height?: number
    }
  ): Promise<ImageResponse> {
    try {
      const filename = v4()
      const filePath = `${UPLOAD_IMAGE_DIR}/${filename}.webp`
      sharp.cache(false)
      const result = sharp(path)
      if (resize) {
        result.resize(resize.width, resize.height)
      }
      await result.toFile(filePath)
      return { name: filename, path: filePath }
    } catch (err) {
      this.unlinkImage(path)
      throw new InternalServerErrorException(err.message)
    }
  }

  unlinkImage(path: string) {
    try {
      fs.unlinkSync(path)
    } catch (err) {
      console.log(err)
    }
  }
}
