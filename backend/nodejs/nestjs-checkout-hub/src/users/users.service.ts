import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email });
  }

  async findOrCreate(email: string, name?: string, taxId?: string): Promise<UserEntity> {
    let user = await this.findByEmail(email);
    if (!user) {
      user = this.userRepository.create({
        email,
        name: name || email.split('@')[0],
        taxId,
      });
      return this.userRepository.save(user);
    }
    return user;
  }

  async findOne(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ id });
  }
}
