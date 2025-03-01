import configuration from '@/core/config/configuration';
import { CountryModule } from '@/country/country.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CountryModule,
    UsersModule,
  ],
})
export class AppModule {}
