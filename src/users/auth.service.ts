import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService{
    constructor(private usersService: UsersService){}

    async signup(email: string, password: string){
        // See if email is in use.
        const users = await this.usersService.find(email);
        if(users.length) throw new BadRequestException("The email is already in use. Try to sign in.");

        // Hash user's password.
            //Generate salt.
            const salt = randomBytes(12).toString('hex');

            // Hash the salt and the password together.
            const hash = (await scrypt(password, salt, 32)) as Buffer;

            // Join the hashed result and the salt together.
            const hashedPassword = salt + '.' + hash.toString('hex');

        // Create a new user and save it.
        const user = await this.usersService.create(email, hashedPassword);

        // Return the user.
        return user;
    }

    async signin(email: string, password: string){
        const [user] = await this.usersService.find(email);
        if(!user){
            throw new NotFoundException("There is no user with such credentials. Please try to sign up.");
        }
        const [salt, storedHash] = user.password.split(".");
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        if(storedHash !== hash.toString('hex')){
            throw new BadRequestException("Please try to sign up.");
        }
        return user;
        

    }
}