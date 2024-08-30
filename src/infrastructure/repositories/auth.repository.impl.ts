import { AuthDatasource, AuthRepository, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {
    constructor(
        private readonly authDataSource: AuthDatasource
    ) {}

    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDataSource.login(loginUserDto)
    }

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDataSource.register(registerUserDto)
    }
}