import {
  IsDate,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDTO {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  newsId!: number;

  @ApiProperty()
  @IsString()
  text!: string;

  user!: any;
}
