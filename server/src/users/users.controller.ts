import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger'
import { UserEntity } from './entities/user.entity'
import { WithId } from 'src/shared/decorators/with-id.decorator'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['active', 'archived', 'all'],
    description: 'Filter users by status (defaults to active)',
  })
  findAll(@Query('status') status?: 'active' | 'archived' | 'all') {
    return this.usersService.findAll(status)
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Patch(':id/update')
  @ApiOkResponse({ type: UserEntity })
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @WithId() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  /**
   * Soft deletion chosen over hard deletion to:
   * - Retain data for recovery or auditing.
   * - Avoid accidental loss of important records.
   * - Enable flexible filtering with isArchived.
   **/

  @Patch(':id/archive')
  @ApiOkResponse({ type: UserEntity })
  archive(@Param('id') id: string) {
    return this.usersService.archive(id)
  }

  @Patch(':id/restore')
  @ApiOkResponse({ type: UserEntity })
  restore(@Param('id') id: string) {
    return this.usersService.unArchive(id)
  }
}
