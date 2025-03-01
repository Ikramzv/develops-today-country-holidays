import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { configureApp } from './app.config';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig = app.get(ConfigService);

  configureApp(app);

  const swaggerConfig = appConfig.get('swagger');

  if (swaggerConfig.enabled) {
    setupSwagger(app, swaggerConfig);
  }

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
