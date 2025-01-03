import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common'
import { TimeCardsService } from './time-cards.service'
import { CreateTimeCardDto } from './dto/create-time-card.dto'
import { UpdateTimeCardDto } from './dto/update-time-card.dto'
import { ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger'
import { TimeCardEntity } from './entities/time-card.entity'

@Controller('time-cards')
export class TimeCardsController {
  constructor(private readonly timeCardsService: TimeCardsService) {}

  @Post('create')
  @ApiCreatedResponse({ type: TimeCardEntity })
  create(@Body() createTimeCardDto: CreateTimeCardDto) {
    return this.timeCardsService.create(createTimeCardDto)
  }

  @Get()
  @ApiOkResponse({ type: TimeCardEntity, isArray: true })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['active', 'archived', 'all'],
    description: 'Filter time cards by status (defaults to active)',
  })
  findAll(@Query('status') status?: 'active' | 'archived' | 'all') {
    return this.timeCardsService.findAll(status)
  }

  @Get(':id')
  @ApiOkResponse({ type: TimeCardEntity })
  findOne(@Param('id') id: string) {
    return this.timeCardsService.findOne(id)
  }

  @Patch(':id/update')
  @ApiOkResponse({ type: TimeCardEntity })
  update(
    @Param('id') id: string,
    @Body() updateTimeCardDto: UpdateTimeCardDto,
  ) {
    return this.timeCardsService.update(id, updateTimeCardDto)
  }

  /**
   * Soft deletion chosen over hard deletion to:
   * - Retain data for recovery or auditing.
   * - Avoid accidental loss of important records.
   * - Enable flexible filtering with isArchived.
   **/

  @Patch(':id/archive')
  @ApiOkResponse({ type: TimeCardEntity })
  archive(@Param('id') id: string) {
    return this.timeCardsService.archive(id)
  }

  @Patch('unarchive/:id')
  @ApiOkResponse({ type: TimeCardEntity })
  unArchive(@Param('id') id: string) {
    return this.timeCardsService.unArchive(id)
  }
}
