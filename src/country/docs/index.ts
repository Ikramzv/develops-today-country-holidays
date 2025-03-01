import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
  CountryDetailsResponseDto,
  CountryResponseDto,
} from '../dto/CountryResponseDto';
import { PublicHolidayResponseDto } from '../dto/PublicHolidaysDto';

export const ApiCountryDetails = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get country details' }),
    ApiResponse({
      status: 200,
      type: CountryDetailsResponseDto,
      description: 'Country details',
    }),
    ApiResponse({ status: 404, description: 'Country not found' }),
    ApiParam({
      name: 'countryCode',
      description: 'iso3 country code',
      example: 'USA',
    }),
  );
};

export const ApiAvailableCountries = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all available countries' }),
    ApiResponse({
      status: 200,
      type: CountryResponseDto,
      isArray: true,
      description: 'All available countries',
    }),
  );
};

export const ApiPublicHolidays = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get public holidays for a country in a year' }),
    ApiResponse({
      status: 200,
      type: PublicHolidayResponseDto,
      isArray: true,
      description: 'Public holidays',
    }),
    ApiResponse({ status: 404, description: 'Country or year not found' }),
    ApiParam({
      name: 'countryCode',
      description: 'iso2 country code',
      example: 'US',
    }),
    ApiParam({
      name: 'year',
      description: 'year',
      example: 2024,
    }),
  );
};
