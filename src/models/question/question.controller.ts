import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'

import { AuthenticationGuard, Roles, RolesGuard } from '@models/auth'
import { QuestionService } from './question.service'
import {
  CreateQuestionDto,
  UpdateQuestionDto,
  AnswerQuestionDto
} from '@models/question'
import { PageOptionsDto } from '@common/pagination'
import { UserRole } from '@constants'

@ApiTags('question')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard)
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOperation({ summary: 'Create Question' })
  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto)
  }

  @ApiOperation({ summary: 'Get List Question' })
  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.questionService.findAll(pageOptionsDto)
  }

  @ApiOperation({ summary: 'Get Question' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id)
  }

  @ApiOperation({ summary: 'Answer Question', description: 'Admin Only' })
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Put('answer/:id')
  answer(
    @Param('id') id: string,
    @Body() answerQuestionDto: AnswerQuestionDto
  ) {
    return this.questionService.answer(id, answerQuestionDto)
  }

  @ApiOperation({ summary: 'Update Question', description: 'Admin Only' })
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    return this.questionService.update(id, updateQuestionDto)
  }

  @ApiOperation({ summary: 'Delete Question', description: 'Admin Only' })
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(id)
  }
}
