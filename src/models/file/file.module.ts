import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

import { FileService } from './file.service'
import { FileController } from './file.controller'

@Module({
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
