import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const configService = app.select(AppModule).get(ConfigService);

  const env = configService.get('nodeEnv');
  if (env == undefined || env) {
    setupSwagger(app);
  }
  await app.listen(3000);
}
bootstrap();
