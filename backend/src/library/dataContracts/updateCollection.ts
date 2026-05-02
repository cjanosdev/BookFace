import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCollection {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  // I might remove this later? idk not using it atm
  @IsOptional()
  @IsString()
  description?: string;
}
