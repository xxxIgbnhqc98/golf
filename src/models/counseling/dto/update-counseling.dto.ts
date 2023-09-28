import { PartialType } from '@nestjs/swagger';
import { CreateCounselingDto } from './create-counseling.dto';

export class UpdateCounselingDto extends PartialType(CreateCounselingDto) {}
