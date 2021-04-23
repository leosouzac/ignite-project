import { Category } from "../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

class PostegresCategoriesRepository implements ICategoriesRepository {
  async findByName(name: string): Promise<Category> {
    console.log(name);
    return null;
  }
  async list(): Promise<Category[]> {
    return null;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    console.log(name, description);
  }
}

export { PostegresCategoriesRepository };
