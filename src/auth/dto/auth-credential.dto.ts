import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {

    @IsString()
    @MinLength(3)
    @MaxLength(11)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(30)
    //@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
      //  { message: 'password too weak' })
    password: string;
}