import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { User, CreateUserDto, UpdateUserDto } from '@models/user'

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

  findAll() {
    return `This action returns all user`
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } })
    if (!user) throw new NotFoundException('User Not Found')
    return user
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) throw new NotFoundException('User Not Found')
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id)
    const updateUser = await this.userRepository.update(id, updateUserDto)
    return updateUser
  }

  async remove(id: string) {
    const user = await this.findOne(id)
    await this.userRepository.remove(user)
    return user
  }

  async validate(body: {
    username?: string
    nickname?: string
    phone_number?: string
  }) {
    const { username, nickname, phone_number } = body
    if (body.username) {
      const _user = await this.userRepository.findOne({ where: { username } })
      if (_user) throw new BadRequestException('Username Already In Use')
    }
    if (nickname) {
      const _user = await this.userRepository.findOne({ where: { nickname } })
      if (_user) throw new BadRequestException('Nickname Already In Use')
    }
    if (phone_number) {
      const _user = await this.userRepository.findOne({
        where: { phone_number }
      })
      if (_user) throw new BadRequestException('Phone Number Already In Use')
    }
  }
}
