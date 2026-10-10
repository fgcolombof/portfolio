import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto, AuthUserDto } from './dto/auth-response.dto';

const SALT_ROUNDS = 10;
const DEFAULT_EXPIRES_IN = '1h';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const email = registerDto.email.toLowerCase();
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }

    const passwordHash = await bcrypt.hash(registerDto.password, SALT_ROUNDS);
    const user = await this.usersService.create(
      email,
      registerDto.name,
      passwordHash,
    );

    this.logger.log(`Registered user ${user.email}`);
    return this.buildResponse(user);
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const email = loginDto.email.toLowerCase();
    const user = await this.usersService.findByEmailWithPassword(email);

    if (!user?.passwordHash) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isValid = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isValid) {
      this.logger.warn(`Failed login attempt for ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.buildResponse(user);
  }

  private async buildResponse(user: {
    id: string;
    email: string;
    name: string;
    taxId?: string;
  }): Promise<AuthResponseDto> {
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    const userDto: AuthUserDto = {
      id: user.id,
      email: user.email,
      name: user.name,
      taxId: user.taxId,
    };

    return {
      accessToken,
      expiresIn: this.resolveExpiresInSeconds(),
      user: userDto,
    };
  }

  private resolveExpiresInSeconds(): number {
    const configured = this.configService.get<string>(
      'JWT_EXPIRES_IN',
      DEFAULT_EXPIRES_IN,
    );
    const match = /^(\d+)([smhd])?$/.exec(configured);

    if (!match) {
      return 3600;
    }

    const value = Number(match[1]);
    const unit = match[2] ?? 's';
    const multipliers: Record<string, number> = {
      s: 1,
      m: 60,
      h: 3600,
      d: 86400,
    };
    return value * (multipliers[unit] ?? 1);
  }
}
