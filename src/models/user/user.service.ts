import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import {
  User,
  CreateUserDto,
  UpdateProfileDto,
  GroupUserDto,
  CoachUserDto
} from '@models/user'
import { PageMetaDto, PageDto } from '@common/pagination'
import { UserRole } from '@constants'
import { hashPassword } from '@utils'
import { ApiSuccessResponse } from '@common/api-response'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.validate(createUserDto)
    const user = this.userRepository.create(createUserDto)
    await this.userRepository.save(user)
    return user
  }

  async findAllUser(groupUserDto: GroupUserDto) {
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.groups', 'group')
      .skip(groupUserDto.skip)
      .take(groupUserDto.take)
      .orderBy('user.created_at', groupUserDto.order)
      .where('user.role = :role', { role: UserRole.User })

    if (groupUserDto.group_id) {
      query.andWhere('group.id = :group_id', {
        group_id: groupUserDto.group_id
      })
    }

    if (groupUserDto.keyword) {
      query.andWhere(
        'user.nickname ilike :keyword OR user.username ilike :keyword',
        {
          keyword: `%${groupUserDto.keyword}%`
        }
      )
    }

    const [list, count] = await query.getManyAndCount()
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto: groupUserDto,
      itemCount: count
    })

    return new PageDto(list, pageMetaDto)
  }

  async findAllCoach(coachUserDto: CoachUserDto) {
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.groups', 'group')
      .skip(coachUserDto.skip)
      .take(coachUserDto.take)
      .orderBy('user.created_at', coachUserDto.order)
      .where('user.role = :role', { role: UserRole.Coach })

    if (coachUserDto.gender) {
      query.andWhere('user.gender = :gender', { gender: coachUserDto.gender })
    }

    if (coachUserDto.technique) {
      query.andWhere('user.technique = :technique', {
        technique: coachUserDto.technique
      })
    }

    if (coachUserDto.keyword) {
      query.andWhere(
        'user.nickname ilike :keyword OR user.username ilike :keyword',
        {
          keyword: `%${coachUserDto.keyword}%`
        }
      )
    }

    const [list, count] = await query.getManyAndCount()
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto: coachUserDto,
      itemCount: count
    })

    return new PageDto(list, pageMetaDto)
  }

  async findByUsername(username: string, exception: boolean = true) {
    const user = await this.userRepository.findOneBy({ username })
    if (!user && exception) throw new NotFoundException('User Not Found')
    return user
  }

  async findUserByPhoneNumber(phone_number: string) {
    const user = await this.userRepository.findOneBy({ phone_number })
    if (!user) throw new NotFoundException('User Not Found')
    return user
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) throw new NotFoundException('User Not Found')
    return user
  }

  async update(id: string, updateUserDto: UpdateProfileDto) {
    const { phone_number } = updateUserDto
    this.validate({ phone_number })
    await this.findOne(id)
    const updateUser = await this.userRepository.update(id, updateUserDto)
    return updateUser
  }

  async remove(id: string) {
    const user = await this.findOne(id)
    await this.userRepository.remove(user)
    return new ApiSuccessResponse()
  }

  async changePassword(password: string, id: string) {
    password = await hashPassword(password)
    await this.userRepository.update(id, { password })
  }

  async validate(body: {
    username?: string
    phone_number?: string
  }): Promise<void> {
    const { username, phone_number } = body
    if (body.username) {
      const _user = await this.userRepository.findOne({ where: { username } })
      if (_user) throw new BadRequestException('Username Already In Use')
    }
    if (phone_number) {
      const _user = await this.userRepository.findOne({
        where: { phone_number }
      })
      if (_user) throw new BadRequestException('Phone Number Already In Use')
    }
  }
}
