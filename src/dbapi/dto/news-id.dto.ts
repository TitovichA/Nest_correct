import { IsNotEmpty, IsNumber, ValidateIf, IsString } from 'class-validator';
import { NewsDTO } from './news.dto';

export class NewsIdDto {
  @IsString()
  @IsNotEmpty()
  id!: number;
}

export class NewsUpdateDto extends NewsDTO {
  @ValidateIf((o) => o.id)
  @IsNotEmpty()
  @IsString()
  id!: number;
}
