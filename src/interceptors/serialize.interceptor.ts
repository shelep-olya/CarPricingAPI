import { 
    NestInterceptor,
    ExecutionContext,
    CallHandler,   
    UseInterceptors
 } from "@nestjs/common";
 import { Observable } from "rxjs";
 import { map } from "rxjs/operators";
 import { plainToClass } from "class-transformer";
 interface ClassConstructor{
    new(...args: any[]) : {};
 }

export function Serialize(dto:ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto));
}

 export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto: ClassConstructor){
        this.dto = dto;
    }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {

        // Runs before a request is handled by the request handler.

        return next.handle().pipe(
            map((data: any) => {

                // Runs before a response is sent out.
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true,
                })
            })
        )
        
    }
 }