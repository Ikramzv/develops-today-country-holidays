import { ApiProperty } from '@nestjs/swagger';

export class CountryResponseDto {
  @ApiProperty()
  countryCode: string;

  @ApiProperty()
  name: string;
}

// Country info

export class CountryInfoResponseDto {
  @ApiProperty()
  commonName: string;

  @ApiProperty()
  officialName: string;

  @ApiProperty()
  countryCode: string;

  @ApiProperty()
  region: string;

  @ApiProperty()
  borders: CountryInfoResponseDto[];
}

// Country population

export class PopulationCount {
  @ApiProperty()
  year: number;

  @ApiProperty()
  value: number;
}

export class CountryPopulationDto {
  @ApiProperty()
  country: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  iso3: string;

  @ApiProperty()
  populationCounts: PopulationCount[];
}

export class CountryPopulationResponseDto {
  error: boolean;
  msg: string;
  data: CountryPopulationDto;
}

// Country flag

export class CountryFlagDto {
  @ApiProperty()
  iso2: string;

  @ApiProperty()
  iso3: string;

  @ApiProperty()
  flag: string;

  @ApiProperty()
  name: string;
}

export class CountryFlagResponseDto {
  error: boolean;
  msg: string;
  data: CountryFlagDto;
}

// Country details

export class CountryDetailsResponseDto {
  @ApiProperty()
  country: CountryInfoResponseDto;

  @ApiProperty()
  population: CountryPopulationDto;

  @ApiProperty()
  flag: CountryFlagDto;
}
