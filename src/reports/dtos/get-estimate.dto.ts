import {
    IsString,
    IsNumber,
    Min,
    Max,
    IsLongitude,
    IsLatitude
} from 'class-validator';
import { Transform } from 'class-transformer';


export class GetEstimateDto{
    @IsString()
    make: string;

    @IsString()
    model: string;

    @Transform(({value}) => parseInt(value))
    @IsNumber()
    @Min(1950)
    @Max(new Date().getFullYear())
    year: number;

    @Transform(({value}) => parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;


    @Transform(({value}) => parseFloat(value))
    @IsLongitude()
    lng: number;

    @Transform(({value}) => parseFloat(value))
    @IsLatitude()
    lat: number;

}