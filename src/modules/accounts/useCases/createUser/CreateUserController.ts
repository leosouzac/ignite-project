import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, username, password, email, driver_lincense } = request.body;

    const createUsersUseCase = container.resolve(CreateUserUseCase);

    await createUsersUseCase.execute({
      name,
      username,
      password,
      email,
      driver_lincense,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
