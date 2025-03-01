import { ApiProperty } from '@nestjs/swagger';

export class PublicHolidayResponseDto {
  @ApiProperty()
  date: string;

  @ApiProperty()
  localName: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  countryCode: string;

  @ApiProperty()
  fixed: boolean;

  @ApiProperty()
  global: boolean;

  @ApiProperty()
  counties: string[] | null;

  @ApiProperty()
  launchYear: number | null;

  @ApiProperty()
  types: string[];
}
