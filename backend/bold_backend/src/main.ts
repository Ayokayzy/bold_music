import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { MyLoggerService } from './my-logger/my-logger.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    {
      bufferLogs: true
    }
  );
  // swagger setup
  const config = new DocumentBuilder()
    .setTitle('Bold Music')
    .setDescription('Bold Music API description')
    .setVersion('0.1')
    .addServer("http://localhost:3000/api/v1")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // swagger setup end

  // global exception and error logging
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  app.useLogger(app.get(MyLoggerService))
  // global exception and error logging end

  app.enableCors()
  app.setGlobalPrefix('api/v1')
  await app.listen(3000);
}
bootstrap();
