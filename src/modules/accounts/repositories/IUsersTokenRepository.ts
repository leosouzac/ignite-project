import { ICretaeUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokenRepository {
  create({
    user_id,
    expires_date,
    refresh_token,
  }: ICretaeUserTokenDTO): Promise<UserTokens>;
}

export { IUsersTokenRepository };
