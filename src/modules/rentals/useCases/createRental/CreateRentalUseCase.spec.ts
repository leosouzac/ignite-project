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
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car test",
      daily_rate: 100,
      brand: "brand",
      category_id: "1234",
      fine_amount: 40,
      license_plate: "test",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: car.id,
      expected_return_date: dayAt25Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if is another open to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "1111",
      expected_return_date: dayAt25Hours,
      user_id: "1234",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "1234",
        car_id: "3214",
        expected_return_date: dayAt25Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user"));
  });

  it("should not be able to create a new rental if is another open to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "teste",
      expected_return_date: dayAt25Hours,
      user_id: "1234",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "4321",
        car_id: "teste",
        expected_return_date: dayAt25Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "1234",
        car_id: "teste",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
