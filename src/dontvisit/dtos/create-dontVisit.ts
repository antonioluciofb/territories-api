import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDontVisitDTO {
  @IsNotEmpty()
  @IsString()
  card: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  observations: string;
}
