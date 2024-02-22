import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRecordDTO {
  @IsNotEmpty()
  @IsString()
  card: string;

  @IsNotEmpty()
  @IsString()
  designated: string;

  @IsNotEmpty()
  @IsString()
  periodOfDay: string;

  @IsNotEmpty()
  date: Date;

  @IsArray()
  @IsNotEmpty({
    each: true,
  })
  @IsNumber({}, { each: true })
  pendingBlocks: Array<number>;
}
