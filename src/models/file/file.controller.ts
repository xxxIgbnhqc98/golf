import {
  Controller,
  Post,
  Param,
  Res,
  Get,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UnprocessableEntityException,
  UseGuards
} from '@nestjs/common'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { Express } from 'express'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import {
  ApiConsumes,
  ApiBody,
  ApiTags,
  ApiBearerAuth,
  ApiOperation
} from '@nestjs/swagger'
import { diskStorage } from 'multer'
import { v4 } from 'uuid'
import { Response } from 'express'

import { AuthenticationGuard } from '@models/auth'
import { FileService, UPLOAD_IMAGE_DIR } from './file.service'
import { Roles } from '@models/auth'
import { UserRole } from '@constants'

const MAX_FILES_LENGTH = 10
const MAX_IMAGE_SIZE = 20971520 // 20MB
const imageRegex = new RegExp(/(webp|jpg|jpeg|png)$/)

const uploadImageOptions: MulterOptions = {
  storage: diskStorage({
    destination: UPLOAD_IMAGE_DIR,
    filename: (req, file, cb) => {
      cb(null, v4())
    }
  }),
  limits: {
    fileSize: MAX_IMAGE_SIZE
  },
  fileFilter: (req, file, cb) => {
    const test = imageRegex.test(file.mimetype)
    if (test) {
      return cb(null, true)
    } else {
      cb(new UnprocessableEntityException(), false)
    }
  }
}

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly uploadService: FileService) {}

  @ApiOperation({ summary: 'Upload Single Image' })
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Post('upload/image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('file', uploadImageOptions))
  uploadImage(
    @UploadedFile()
    file: Express.Multer.File
  ) {
    return this.uploadService.uploadImage(file)
  }

  @ApiOperation({ summary: 'Upload Multiple Images' })
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Post('upload/images')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary'
          }
        }
      }
    }
  })
  @UseInterceptors(
    FilesInterceptor('files', MAX_FILES_LENGTH, uploadImageOptions)
  )
  async uploadMultipleImage(
    @UploadedFiles()
    files: Express.Multer.File[]
  ) {
    const images = []
    const thumbnails = []
    for (const file of files) {
      const res = await this.uploadService.uploadImage(file)
      images.push(res.image)
      thumbnails.push(res.thumbnail)
    }
    return {
      images,
      thumbnails
    }
  }

  @ApiOperation({ summary: 'Get Image' })
  @Get('image/:id')
  @Roles(UserRole.Admin)
  async getImageFromS3(@Param('id') id: string, @Res() res: Response) {
    const data = await this.uploadService.getImageFromS3(id)
    res.writeHead(200, {
      'Content-Type': data.ContentType,
      'Content-Length': data.ContentLength
    })
    res.write(data.Body, 'binary')
  }
}
