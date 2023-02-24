import {
  IsNotEmpty,
  IsString,
  ValidateIf,
  IsDateString,
  IsArray,
  IsPositive,
  IsInt,
} from 'class-validator';
import { CommentDTO } from './comment.dto';

export class NewsDTO {
  // @IsInt()
  // @IsPositive()
  id!: number;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsDateString()
  createdAt!: Date;

  updatedAt!: Date;

  @ValidateIf((o) => o.description)
  @IsString()
  description!: string;

  @ValidateIf((o) => o.cover)
  @IsString()
  cover!: string;

  @IsString()
  text!: string;

  @ValidateIf((o) => o.comments)
  @IsArray()
  comments!: CommentDTO[];
}
