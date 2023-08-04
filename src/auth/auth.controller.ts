import { Controller , Post, Body} from "@nestjs/common";
import { AuthService } from "./auth.service";
//import { AuthDto } from "./dto";


@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() dto:any){
        console.log("this is the dto: ", dto);
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin (@Body() dto: any){
        console.log("This is the dto: ", dto);
        return this.authService.login(dto);
    }
}