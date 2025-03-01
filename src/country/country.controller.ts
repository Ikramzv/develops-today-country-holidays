import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';
import {
  ApiAvailableCountries,
  ApiCountryDetails,
  ApiPublicHolidays,
} from './docs';

@Controller({
  path: 'countries',
  version: '1',
})
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @ApiAvailableCountries()
  @Get('all-available')
  getAvailableCountries() {
    return this.countryService.getAvailableCountries();
  }

  @ApiCountryDetails()
  @Get(':countryCode')
  getCountryDetails(@Param('countryCode') countryCode: string) {
    return this.countryService.getCountryDetails(countryCode);
  }

  @ApiPublicHolidays()
  @Get(':countryCode/public-holidays/:year')
  getPublicHolidays(
    @Param('countryCode') countryCode: string,
    @Param('year') year: number,
  ) {
    return this.countryService.getPublicHolidays(countryCode, year);
  }
}
