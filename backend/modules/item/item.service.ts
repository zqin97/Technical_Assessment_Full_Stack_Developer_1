import { IsNull, Repository } from "typeorm";
import AppDataSource from "../../typeorm.config";
import { Item } from "../../entities/Item";
import { CreateItemDto } from "./dto/create-item.dto";
import { DateTime } from "luxon";
import { CustomError } from "../../middlewares/custom-error-handler.middleware";
import { GetItemListDto } from "./dto/get-item-list.dto";

export class ItemService {
  private readonly itemRepo: Repository<Item>;

  constructor() {
    this.itemRepo = AppDataSource.getRepository(Item);
  }

  async getAllItems(query: GetItemListDto) {
    const { pageIndex, pageSize, orderBy, ...params } = query;

    let order = {};
    if (orderBy) {
      const [field, direction] = orderBy.split(":");
      order = { [field]: direction.toUpperCase() };
    }

    const [data, count] = await this.itemRepo.findAndCount({
      where: { ...params, deleted_at: IsNull() },
      order,
      skip: pageIndex * pageSize,
      take: pageSize,
      select: [
        "id",
        "name",
        "price",
        "description",
        "created_at",
        "updated_at",
      ],
    });

    return {
      data: {
        data: data,
        count,
      },
    };
  }

  async getItemById(id: string) {
    const item = await this.itemRepo.findOne({
      where: { id, deleted_at: IsNull() },
      select: [
        "id",
        "name",
        "price",
        "description",
        "created_at",
        "updated_at",
      ],
    });
    if (!item) {
      throw new CustomError({
        httpCode: 404,
        appErrorCode: "I_404",
        title: "Invalid Item ID",
        message: "Item not found",
      });
    }

    return { data: item };
  }

  async createItem(createObj: CreateItemDto) {
    const newItem = this.itemRepo.create(createObj);
    await this.itemRepo.save(newItem);
    return newItem;
  }

  async updateItem(id: string, updateObj: CreateItemDto) {
    const item = await this.itemRepo.findOne({
      where: { id, deleted_at: IsNull() },
    });
    if (!item) {
      throw new CustomError({
        httpCode: 404,
        appErrorCode: "I_404",
        title: "Invalid Item ID",
        message: "Item not found",
      });
    }

    const toSaveItem = this.itemRepo.create({
      ...item,
      ...updateObj,
    });
    await this.itemRepo.save(toSaveItem);

    return toSaveItem;
  }

  async deleteItem(id: string) {
    const item = await this.itemRepo.findOne({
      where: { id },
    });
    if (!item) {
      throw new CustomError({
        httpCode: 404,
        appErrorCode: "I_404",
        title: "Invalid Item ID",
        message: "Item not found",
      });
    }

    const toSaveItem = this.itemRepo.create({
      ...item,
      deleted_at: DateTime.now().toUnixInteger(),
    });
    await this.itemRepo.save(toSaveItem);

    return { data: true };
  }
}
