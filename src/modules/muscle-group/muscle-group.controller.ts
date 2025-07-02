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
  Patch,
  Query,
  Res
} from '@nestjs/common';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import { MuscleGroupService } from './muscle-group.service';
import { MuscleGroupDto } from './dto/muscle-group.dto';
import { ApiOkResponsePaginated } from 'src/interfaces/IPaginated';
import { Response } from 'express';

@Controller('muscle-group')
@ApiTags('muscle-group')
@ApiBearerAuth()
export class MuscleGroupController {
  constructor(protected service: MuscleGroupService) {}

  @Get()
  @ApiOkResponsePaginated(MuscleGroupDto)
  protected async getFilteredAsync(@Query() filter: DefaultFilter): Promise<any> {
    return this.service.findFilteredAsync(filter);
  }

  @Get('/:id')
  @ApiOkResponse({ type: MuscleGroupDto })
  protected async findByIdAsync(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.service.findByIdAsync(id);
  }

  @Post()
  @ApiCreatedResponse({ type: MuscleGroupDto })
  protected async createAsync(@Body() dto: MuscleGroupDto): Promise<any> {
    return this.service.createAsync(dto);
  }

  @Patch('/:id')
  @ApiOkResponse({ type: MuscleGroupDto })
  protected async updateAsync(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: MuscleGroupDto
  ): Promise<any> {
    return this.service.updateAsync(id, dto);
  }

  @Delete('/:id')
  @ApiNoContentResponse({ type: undefined })
  protected async deleteAsync(
    @Res({ passthrough: true }) response: Response,
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    return this.service.deleteAsync(id);
  }
}
