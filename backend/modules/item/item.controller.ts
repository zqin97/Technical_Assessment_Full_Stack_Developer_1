import { ItemService } from "./item.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  QueryParams,
  ResponseClassTransformOptions,
} from "routing-controllers";
import { CreateItemDto } from "./dto/create-item.dto";
import { GetItemListDto } from "./dto/get-item-list.dto";
import { UpdateItemDto } from "./dto/update-item.dto";

@Controller("/items")
@ResponseClassTransformOptions({ enableImplicitConversion: true })
export class ItemController {
  private readonly itemService: ItemService;

  constructor() {
    this.itemService = new ItemService();
  }

  @Post()
  @HttpCode(201)
  async createItem(@Body({ validate: true }) createItemDto: CreateItemDto) {
    return await this.itemService.createItem(createItemDto);
  }

  @Get()
  async getAllItems(@QueryParams() query: GetItemListDto) {
    return await this.itemService.getAllItems(query);
  }

  @Get("/:id")
  async getItemById(@Param("id") id: string) {
    return await this.itemService.getItemById(id);
  }

  @Put("/:id")
  async updateItem(
    @Param("id") id: string,
    @Body({ validate: true }) updateItemDto: UpdateItemDto
  ) {
    return await this.itemService.updateItem(id, updateItemDto);
  }

  @Delete("/:id")
  async deleteItem(@Param("id") id: string) {
    return await this.itemService.deleteItem(id);
  }
}
