import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetListDto {
  @IsOptional()
  @IsNumber()
  pageIndex: number = 0;

  @IsOptional()
  @IsNumber()
  pageSize: number = 10;

  @IsOptional()
  @IsString()
  orderBy: string;
}
