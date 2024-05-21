import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    {
      bufferLogs: true
    }
  );

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  app.useLogger(app.get(MyLoggerService))
  app.enableCors()
  app.setGlobalPrefix('api/v1')
  await app.listen(3000);
}
bootstrap();
