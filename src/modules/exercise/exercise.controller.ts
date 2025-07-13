import { BaseController } from 'src/modules/base/base.controller';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res
} from '@nestjs/common';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import { ExerciseService } from './exercise.service';
import { ExerciseDto } from './dto/exercise.dto';
import { UserDto } from '../user/dto/user.dto';
import { Response } from 'express';
import { ApiOkResponsePaginated } from 'src/interfaces/IPaginated';

@Controller('exercise')
@ApiTags('exercise')
@ApiBearerAuth()
export class ExerciseController extends BaseController<ExerciseDto> {
  constructor(protected service: ExerciseService) {
    super(service);
  }

  @Get()
  @ApiOkResponsePaginated(ExerciseDto)
  protected async getFilteredAsync(@Query() filter: DefaultFilter): Promise<any> {
    return this.service.findFilteredAsync(filter);
  }

  @Get('/:id')
  @ApiOkResponse({ type: ExerciseDto })
  protected async findByIdAsync(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.service.findByIdAsync(id);
  }

  @Post()
  @ApiCreatedResponse({ type: ExerciseDto })
  protected async createAsync(@Body() dto: ExerciseDto): Promise<any> {
    return this.service.createAsync(dto);
  }

  @Put('/:id')
  @ApiOkResponse({ type: ExerciseDto })
  protected async updateAsync(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ExerciseDto
  ): Promise<any> {
    return this.service.updateAsync(id, dto);
  }

  @Delete('/:id')
  @ApiNoContentResponse({ type: undefined })
  protected async deleteAsync(
    @Res({ passthrough: true }) response: Response,

    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    response.status(204);
    return this.service.deleteAsync(id);
  }
}
