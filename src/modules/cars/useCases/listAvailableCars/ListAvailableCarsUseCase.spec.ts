/* import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list available cars", async () => {
    const car = carsRepositoryInMemory.create({
      brand: "Car_brandTest",
      category_id: "category_id",
      daily_rate: 150.0,
      description: "Car description",
      fine_amount: 200,
      license_plate: "ABC-1535",
      name: "Car2",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    console.log(car);

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = carsRepositoryInMemory.create({
      brand: "Car_brand",
      category_id: "category_id",
      daily_rate: 150.0,
      description: "Car description",
      fine_amount: 200,
      license_plate: "ABC-1535",
      name: "Car1",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand",
    });

    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by name", async () => {
    const car = carsRepositoryInMemory.create({
      brand: "Car_brand",
      category_id: "category_id",
      daily_rate: 150.0,
      description: "Car description",
      fine_amount: 200,
      license_plate: "ABC-1535",
      name: "Car3",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car3",
    });

    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by id", async () => {
    const car = carsRepositoryInMemory.create({
      brand: "Car_brand",
      category_id: "category_id3",
      daily_rate: 150.0,
      description: "Car description",
      fine_amount: 200,
      license_plate: "ABC-1535",
      name: "Car1",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_id3",
    });

    expect(cars).toEqual([car]);
  });
});
 */
