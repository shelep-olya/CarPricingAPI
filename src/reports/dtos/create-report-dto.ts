import {
    IsString,
    IsNumber,
    Min,
    Max,
    IsLongitude,
    IsLatitude
} from 'class-validator';


export class CreateReportDto{
    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1950)
    @Max(new Date().getFullYear())
    year: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;


    @IsLongitude()
    lng: number;

    @IsLatitude()
    lat: number;

    @IsNumber()
    @Min(1)
    @Max(1000000)
    price: number;
}