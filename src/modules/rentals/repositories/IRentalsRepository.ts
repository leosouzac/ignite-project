import { ICreteRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create(data: ICreteRentalDTO): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findByUserId(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository };
