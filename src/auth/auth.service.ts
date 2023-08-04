import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2';
import { AuthDto } from "./dto";

@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService){}

    async signup(dto: AuthDto){
        console.log("DTO before hashing:", dto);
        try{

            const hash = await argon.hash(dto.password);
            const user = await this.prisma.user.create({
                data: {
                    login : dto.login,
                    hash,
                },
                select:{
                    id:true,
                    login: true,
                    createdAt: true,
                }
            });
            return user;
        } catch (error) {
            console.error("Error during signup:", error);
            throw new ForbiddenException("Signup failed due to an internal error.");
        }
        //delete user.hash;
    }

    async login(dto: AuthDto){
        // //return 'I am signing in';
        const user = await this.prisma.user.findUnique({
            where: {
                login: dto.login,
            },
        });
        if (!user)
            throw new ForbiddenException(
                'Incorrect credentiels1',
            );
        const pwMatches = await argon.verify(
            user.hash,
            dto.password,
        );
        if (!pwMatches)
            throw new ForbiddenException(
                'Incorrect credentiels2',
            );
        delete user.hash;
        return user;
    }
}