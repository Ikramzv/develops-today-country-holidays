import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { catchError, firstValueFrom, map, Observable } from 'rxjs';
import {
  CountryFlagResponseDto,
  CountryInfoResponseDto,
  CountryPopulationResponseDto,
  CountryResponseDto,
} from './dto/CountryResponseDto';
import { PublicHolidayResponseDto } from './dto/PublicHolidaysDto';

@Injectable()
export class CountryService {
  private dateNagerApi: string;
  private countriesNowApi: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.dateNagerApi = this.configService.get('dateNagerApi');
    this.countriesNowApi = this.configService.get('countriesNowApi');
  }

  async getAvailableCountries() {
    const response = this.httpService.get(
      `${this.dateNagerApi}/api/v3/AvailableCountries`,
    );

    return this.getResponse<CountryResponseDto[]>(response);
  }

  async getCountryDetails(countryCode: string) {
    // countrCode is probably iso3, and flag endpoint requires iso2

    const iso2 = countryCode.slice(0, 2);

    const [countryDetails, populationRes, flagInfoRes] = await Promise.all([
      this.getCountryInfo(countryCode),
      this.getPopulation(countryCode),
      this.getFlagInfo(iso2),
    ]);

    return {
      country: countryDetails,
      population: populationRes.data,
      flag: flagInfoRes.data,
    };
  }

  private async getCountryInfo(countryCode: string) {
    const response = this.httpService.get(
      `${this.dateNagerApi}/api/v3/CountryInfo/${countryCode}`,
    );

    return this.getResponse<CountryInfoResponseDto>(response, 'CountryInfo');
  }

  private async getPopulation(countryCode: string) {
    const response = this.httpService.post(
      `${this.countriesNowApi}/api/v0.1/countries/population`,
      {
        iso3: countryCode,
      },
    );

    return this.getResponse<CountryPopulationResponseDto>(
      response,
      'CountryPopulation',
    );
  }

  private async getFlagInfo(countryCode: string) {
    const response = this.httpService.post(
      `${this.countriesNowApi}/api/v0.1/countries/flag/images`,
      {
        iso2: countryCode,
      },
    );

    return this.getResponse<CountryFlagResponseDto>(response, 'CountryFlag');
  }

  getPublicHolidays(countryCode: string, year: number) {
    const response = this.httpService.get(
      `${this.dateNagerApi}/api/v3/PublicHolidays/${year}/${countryCode}`,
    );

    return this.getResponse<PublicHolidayResponseDto[]>(
      response,
      'PublicHolidays',
    );
  }

  private getResponse<T>(
    response: Observable<AxiosResponse<T>>,
    errPrefix = '',
  ) {
    return firstValueFrom(
      response.pipe(
        catchError((error) => {
          const data = error.response?.data;

          const errorMessage =
            data?.message ?? data?.msg ?? error?.message ?? 'Unknown error';

          const message = errPrefix
            ? `${errPrefix} - ${errorMessage}`
            : errorMessage;

          throw new InternalServerErrorException(message);
        }),
        map((res) => res.data),
      ),
    );
  }
}
