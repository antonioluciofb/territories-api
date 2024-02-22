import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCardDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  img: string;

  @IsNotEmpty()
  @IsNumber()
  blocks: number;
}
