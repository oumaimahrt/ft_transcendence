import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2';
import { AuthDto } from "./dto";

@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService){}

    async signin(dto: AuthDto){
        // //return 'I am signing in';
        const user = await this.prisma.user.findUnique({
            where: {
                login: dto.login,
            },
        });
        if (!user)
            throw new ForbiddenException(
                'Incorrect credentiels',
            );
        const pwMatches = await argon.verify(
            user.hash,
            dto.password,
        );
        if (!pwMatches)
            throw new ForbiddenException(
                'Incorrect credentiels',
            );
        delete user.hash;
        return user;
    }
}