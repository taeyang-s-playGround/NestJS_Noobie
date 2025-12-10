import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer 토큰에서 JWT 추출
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'your-secret-key'), // .env에서 가져오거나 기본값 사용
    });
  }

  async validate(payload: any) {
    // JWT 페이로드에서 사용자 정보 추출
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
    }
    return { userId: user.id, email: user.email }; // request.user에 저장됨
  }
}

