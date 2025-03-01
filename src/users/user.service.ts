import { CountryService } from '@/country/country.service';
import { Injectable } from '@nestjs/common';
import { AddHolidayDto } from './dto/AddHolidayDto';

@Injectable()
export class UserService {
  constructor(
    // Any database service can be used here

    // private readonly prisma: PrismaService,
    private readonly countryService: CountryService,
  ) {}

  async addHolidaysToCalendar(userId: string, addHolidayDto: AddHolidayDto) {
    // --- First get the user from the database by userId ---

    // const user = await this.prisma.user.findUnique({
    //   where: { id: userId },
    // });

    // --- If user is not found, throw an error ---

    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }

    // --- Get the country code from the user ---

    // const countryCode = user.countryCode;

    // Get the public holidays for the country
    const allHolidays = await this.countryService.getPublicHolidays(
      addHolidayDto.countryCode,
      addHolidayDto.year,
    );

    // Create a map of the holiday names to add
    const holidaysMap = addHolidayDto.holidays.reduce((acc, holiday) => {
      acc[holiday] = true;
      return acc;
    }, {});

    // Filter the holidays by looking for the holiday name in the map
    // which is O(1) lookup time

    const holidaysToAdd = allHolidays.filter(
      (holiday) => holidaysMap[holiday.name],
    );

    return holidaysToAdd;
  }
}
