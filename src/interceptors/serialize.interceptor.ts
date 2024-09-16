import { 
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler   
 } from "@nestjs/common";
 import { Observable } from "rxjs";
 import { map } from "rxjs/operators";
 import { plainToClass } from "class-transformer";
 import { UserDto } from "src/users/dtos/user.dto";

 export class SerializeInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {

        // Runs before a request is handled by the request handler.

        return next.handle().pipe(
            map((data: any) => {

                // Runs before a response is sent out.
                return plainToClass(UserDto, data, {
                    excludeExtraneousValues: true,
                })
            })
        )
        
    }
 }