import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { configureApp } from '../src/app.config';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    const appConfig = app.get(ConfigService);

    appConfig.set('swagger.enabled', false);

    configureApp(app);

    await app.init();
  });

  it('/api/v1/countries/holidays', () => {
    return request(app.getHttpServer())
      .get('/api/v1/countries/all-available')
      .expect(200);
  });

  it('/api/v1/countries/USA', () => {
    return request(app.getHttpServer())
      .get('/api/v1/countries/USA')
      .expect(200);
  });

  it('/api/v1/countries/US/public-holidays/2024', () => {
    return request(app.getHttpServer())
      .get('/api/v1/countries/US/public-holidays/2024')
      .expect(200);
  });

  it('/api/v1/users/123/calendar/holidays', () => {
    return request(app.getHttpServer())
      .post('/api/v1/users/123/calendar/holidays')
      .send({
        holidays: ['2024-01-01', '2024-01-02'],
        countryCode: 'US',
        year: 2024,
      })
      .expect(201);
  });
});
