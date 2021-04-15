import { getRepository, Repository } from "typeorm";

import { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UserRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    username,
    password,
    email,
    driver_lincense,
  }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      password,
      email,
      driver_lincense,
    });

    await this.repository.save(user);
  }
}

export { UserRepository };
