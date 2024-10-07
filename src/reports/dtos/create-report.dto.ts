import {
    IsString,
    IsNumber,
    Min,
    Max,
    IsLatitude,
    IsLongitude,
} from 'class-validator'
export class CreateReportDto{

    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1960)
    @Max(2024)
    year: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @IsNumber()
    @IsLongitude()
    lng: number;

    @IsNumber()
    @IsLatitude()
    lat: number;

    @IsNumber()
    @Min(1)
    @Max(1000000)
    price: number;
}