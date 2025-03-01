import { AddHolidayDto } from '@/users/dto/AddHolidayDto';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiAddHolidaysToCalendar } from './docs';
import { UserService } from './user.service';

@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiAddHolidaysToCalendar()
  @Post(':userId/calendar/holidays')
  addHolidaysToCalendar(
    @Param('userId')
    userId: string,
    @Body() body: AddHolidayDto,
  ) {
    return this.userService.addHolidaysToCalendar(userId, body);
  }
}
