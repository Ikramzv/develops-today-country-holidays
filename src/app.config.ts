import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

function setupValidation(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory(errors) {
        return new BadRequestException(
          errors.map((error) => ({
            field: error.property,
            received: error.value as unknown as string,
            errors: Object.values(error.constraints),
          })),
        );
      },
    }),
  );
}

function setupGlobalPrefix(app: INestApplication) {
  app.setGlobalPrefix('api');
}

function setupCors(app: INestApplication) {
  app.enableCors({
    origin: ['*'],
    methods: ['*'],
    credentials: true,
  });
}

function setupVersioning(app: INestApplication) {
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });
}

export function configureApp(app: INestApplication) {
  setupValidation(app);
  setupGlobalPrefix(app);
  setupCors(app);
  setupVersioning(app);
}
