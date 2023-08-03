import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    login: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    //avatar: string;
   //unique_username: string
}