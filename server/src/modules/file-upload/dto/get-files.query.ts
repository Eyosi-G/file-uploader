import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class GetFilesQuery {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    page: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    limit: number
}