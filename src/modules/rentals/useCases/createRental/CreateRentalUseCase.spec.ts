import dayjs from "dayjs";

import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/In-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DaysJsDateProvider";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAt25Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: "3214",
      expected_return_date: dayAt25Hours,
    });

    console.log(rental);
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "3214",
        expected_return_date: dayAt25Hours,
      });

      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "3214",
        expected_return_date: dayAt25Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "teste",
        expected_return_date: dayAt25Hours,
      });

      await createRentalUseCase.execute({
        user_id: "4321",
        car_id: "teste",
        expected_return_date: dayAt25Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "teste",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
