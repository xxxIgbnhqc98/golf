import {
  Injectable,
  BadRequestException,
  NotFoundException
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import {
  Group,
  UserGroup,
  CreateGroupDto,
  AddUserDto,
  UpdateGroupDto
} from '@models/group'
import { PageOptionsDto, PageMetaDto, PageDto } from '@common/pagination'
import { ApiSuccessResponse } from '@common/api-response'

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(UserGroup)
    private userGroupRepository: Repository<UserGroup>
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = this.groupRepository.create(createGroupDto)
    await this.groupRepository.save(group)
    return group
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const query = this.groupRepository
      .createQueryBuilder('group')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('group.created_at', pageOptionsDto.order)

    const [list, count] = await query.getManyAndCount()
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto: pageOptionsDto,
      itemCount: count
    })

    return new PageDto(list, pageMetaDto)
  }

  async findOne(id: string) {
    const group = await this.groupRepository.findOneBy({ id })
    if (!group) throw new NotFoundException('Group Not Found')
    return group
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    await this.findOne(id)
    const updateGroup = await this.groupRepository.update(id, updateGroupDto)
    return updateGroup
  }

  async remove(id: string) {
    const exist = await this.findOne(id)
    await this.groupRepository.delete(exist)
    return new ApiSuccessResponse()
  }

  async addUser(addUserDto: AddUserDto) {
    const exist = await this.userGroupRepository.findOneBy(addUserDto)
    if (exist) throw new BadRequestException('User Already In Group')
    const userGroup = this.userGroupRepository.create(addUserDto)
    await this.userGroupRepository.save(userGroup)
    return userGroup
  }

  async removeUser(removeUserDto: AddUserDto) {
    const exist = await this.userGroupRepository.findOneBy(removeUserDto)
    if (!exist) throw new NotFoundException('User Is Not In Group')
    await this.userGroupRepository.delete(exist)
    return new ApiSuccessResponse()
  }
}
