import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { ProjectEntity } from './entities/project.entity'
import { ProjectsService } from './projects.service'
import { UpdateProjectDto } from './dto/update-project.dto'
import { WithId } from 'src/shared/decorators/with-id.decorator'

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('create')
  @ApiCreatedResponse({ type: ProjectEntity })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto)
  }

  @Get()
  @ApiOkResponse({ type: ProjectEntity, isArray: true })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['active', 'archived', 'all'],
    description: 'Filter projects by status (defaults to active)',
  })
  findAll(@Query('status') status?: 'active' | 'archived' | 'all') {
    return this.projectsService.findAll(status)
  }

  @Get(':id')
  @ApiOkResponse({ type: ProjectEntity })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id)
  }

  @Patch(':id/update')
  @ApiOkResponse({ type: ProjectEntity })
  @ApiBody({ type: UpdateProjectDto })
  update(
    @Param('id') id: string,
    @WithId() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(+id, updateProjectDto)
  }

  /**
   * Soft deletion chosen over hard deletion to:
   * - Retain data for recovery or auditing.
   * - Avoid accidental loss of important records.
   * - Enable flexible filtering with isArchived.
   **/

  @Patch(':id/archive')
  @ApiOkResponse({ type: ProjectEntity })
  archive(@Param('id') id: string) {
    return this.projectsService.archive(+id)
  }

  @Patch(':id/restore')
  @ApiOkResponse({ type: ProjectEntity })
  unArchive(@Param('id') id: string) {
    return this.projectsService.unArchive(+id)
  }
}
