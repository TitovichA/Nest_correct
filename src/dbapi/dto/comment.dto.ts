import {
  IsDate,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CommentDTO {
  @IsInt()
  @IsPositive()
  newsId!: number;

  @IsString()
  text!: string;

  user!: any;
}
