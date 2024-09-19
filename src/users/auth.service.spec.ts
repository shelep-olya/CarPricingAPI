import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe("AuthService", () => {

    let service: AuthService;
    let fakeUserService: Partial<UsersService>;

    beforeEach(async () => {
    
         // Create a fake copy of users service.
        const users: User[] = [];
        fakeUserService = {
            find: (email: string) => {
                const filtedUsers = users.filter(user => user.email === email);
                return Promise.resolve(filtedUsers);
            },
            create: (email: string, password: string) => {
                const user = {email, password, id: Math.floor(Math.random() * 99999)} as User;
                users.push(user);
                return Promise.resolve(user);
            },
        };
    
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService,
                }
            ],
        }).compile();
    
        service = module.get(AuthService);
    });
    

    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    });


    it('creates a new user with a salted and hashed password', async() => {
        const user = await service.signup('shelep@gmail.com', 'test1234');
        expect(user.password).not.toEqual('test1234');
        const [salt, hash] = user.password.split(".");
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });


    it('throws an error if user signs up with email that is in use', async () => {
      await service.signup('shelep@gmail.com', 'test1234');
      await expect(service.signup('shelep@gmail.com', 'test1234')).rejects.toThrow(
      BadRequestException,
    );
    });


    it('throws if sign in is called with unused email', async () => {
        await expect(
            service.signin('shelep@gmail.com', 'test1234'),
        ).rejects.toThrow(NotFoundException);
    });


    it('throws if invalid password is provided', async() => {
        await service.signup('shelep@gmail.com', 'test1234');
        await expect(
            service.signin('shelep@gmail.com', 'password'),
        ).rejects.toThrow(BadRequestException);
    });
    

    it('returns a user if correct password is provided', async() => {
        await service.signup('shelep@gmail.com', 'test1234');
        const user = await service.signin('shelep@gmail.com', 'test1234');
        expect(user).toBeDefined();
    })

});
