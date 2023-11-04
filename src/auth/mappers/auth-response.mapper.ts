import { ApiProperty } from '@nestjs/swagger';
import { IAuthResponse } from '../interfaces/auth-response.interface';
import { IAuthResult } from '../interfaces/auth-result.interface';
import { AuthResponseUserMapper } from './auth-response-user.mapper';

export class AuthResponseMapper implements IAuthResponse {
  @ApiProperty({
    description: 'User information',
    type: AuthResponseUserMapper,
  })
  public user: AuthResponseUserMapper;

  @ApiProperty({
    description: 'Access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    type: String,
  })
  public accessToken: string;

  constructor(values: IAuthResponse) {
    Object.assign(this, values);
  }

  public static map(result: IAuthResult): AuthResponseMapper {
    return new AuthResponseMapper({
      user: AuthResponseUserMapper.map(result.user),
      accessToken: result.accessToken,
    });
  }
}
