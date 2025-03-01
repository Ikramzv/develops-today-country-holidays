import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const ApiAddHolidaysToCalendar = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Add holidays to calendar' }),
    ApiResponse({ status: 200, description: 'Holidays added to calendar' }),
    ApiParam({
      name: 'userId',
      description: 'User ID',
      example: '123',
    }),
  );
};
