import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CreateAdminUserUsecase } from './User/core/usecases/create.admin.user.usecase';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const createAdminUserUsecase = app.get(CreateAdminUserUsecase);

  await createAdminUserUsecase.execute();
  await app.listen(3000);
}
bootstrap();
