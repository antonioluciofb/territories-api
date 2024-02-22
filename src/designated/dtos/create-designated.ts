import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDesignatedDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  office: string;
}
