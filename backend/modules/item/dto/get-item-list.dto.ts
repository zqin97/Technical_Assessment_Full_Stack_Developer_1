import { IsNumber, IsOptional, IsString, Min } from "class-validator";
import { GetListDto } from "../../../shared/interface/get-list";

export class GetItemListDto extends GetListDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  price?: number;
}
