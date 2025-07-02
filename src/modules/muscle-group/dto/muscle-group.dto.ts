import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class MuscleGroupDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  updatedAt: Date;

  @ApiResponseProperty()
  deletedAt: Date;
}
