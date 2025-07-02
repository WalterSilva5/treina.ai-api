import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { HTTPLoggerMiddleware } from './middleware/logger.middleware';
import { AllExceptionsFilter } from './exceptions/exception.filter';
import { APP_GUARD, APP_FILTER, APP_PIPE } from '@nestjs/core';
import { PrismaModule } from './database/prisma/prisma.module';
import { AppException } from './exceptions/app.exception';
import { AtGuard } from './modules/auth/guards/at.guard';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MuscleGroupModule } from './modules/muscle-group/muscle-group.module';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { WorkoutModule } from './modules/workout/workout.module';
import { WorkoutExerciseModule } from './modules/workout-exercise/workout-exercise.module';

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: false,
        exceptionFactory: (error: any) => {
          return new AppException(error);
        }
      })
    }
  ],
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    MuscleGroupModule,
    ExerciseModule,
    WorkoutModule,
    WorkoutExerciseModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HTTPLoggerMiddleware).forRoutes('*');
  }
}
