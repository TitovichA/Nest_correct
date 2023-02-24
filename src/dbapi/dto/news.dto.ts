import {
  IsNotEmpty,
  IsString,
  ValidateIf,
  IsDateString,
  IsArray,
  IsPositive,
  IsInt,
} from 'class-validator';

export class NewsDTO {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ValidateIf((o) => o.description)
  @IsString()
  description!: string;

  @ValidateIf((o) => o.cover)
  @IsString()
  cover!: string;
}
