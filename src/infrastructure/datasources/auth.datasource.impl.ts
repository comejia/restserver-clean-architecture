import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";


type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean

/// Nota: se asume que este datasource trabaja solo con Mongo
export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ) {}

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const {name, email, password} = registerUserDto

        try {
            // 1. Verificar si el correo existe
            const exists = await UserModel.findOne({email: email})
            if (exists) throw CustomError.badRequest('User already exists');

            // 2. Hashear la constraseña
            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.hashPassword(password)
            })

            await user.save()

            // 3. Mapear la respuesta a nuestra entidad
            return UserMapper.userEntityFromObject(user)

        } catch (error) {
            if(error instanceof CustomError) {
                throw error
            }

            throw CustomError.internalServerError()
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const {email, password} = loginUserDto

        try {
            // 1. Verificar si el correo existe
            const user = await UserModel.findOne({email: email})
            if (!user) throw CustomError.unauthorized('Invalid credentials');

            // 2. Comparar la constraseña
            if (!this.comparePassword(password, user.password)) throw CustomError.unauthorized('Invalid credentials'); 

            // 3. Mapear la respuesta a nuestra entidad
            return UserMapper.userEntityFromObject(user)

        } catch (error) {
            if(error instanceof CustomError) {
                throw error
            }

            throw CustomError.internalServerError()
        }
    }
}