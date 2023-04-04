import { JwtPayload } from 'src/infra/http/dtos/jwt-payload.dto';
import { UserToken } from 'src/infra/http/dtos/user-token.dto';

export abstract class JwtStrategy {
  abstract validate(payload: JwtPayload): Promise<UserToken>;
}
