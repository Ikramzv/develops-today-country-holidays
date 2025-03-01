import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddHolidayDto {
  @ApiProperty({
    description: 'iso2 country code',
    example: 'US',
  })
  @IsNotEmpty()
  @IsString()
  countryCode: string;

  @ApiProperty({
    description: 'Year',
    example: 2024,
  })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'Holidays',
    example: ["New Year's Day"],
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  holidays: string[];
}
