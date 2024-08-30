import { Request, Response } from "express"
import { AuthRepository, CustomError, LoginUser, LoginUserDto, RegisterUser, RegisterUserDto } from "../../domain"
import { UserModel } from "../../data/mongodb"


export class AuthController {
    constructor(
        private readonly authRepository: AuthRepository
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message})
        }

        console.log(error) // logger to send logs in crash error

        return res.status(500).json({error: 'Internal Server Error'})
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)
        if (error) return res.status(400).json({error});

        const registerUser = new RegisterUser(this.authRepository)
        registerUser.execute(registerUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body)
        if (error) return res.status(400).json({error});

        const loginUser = new LoginUser(this.authRepository)
        loginUser.execute(loginUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    getUsers = (req: Request, res: Response) => {
        UserModel.find()
            .then(users => res.json({
                users,
                //user: req.body.user
            }))
            .catch(() => res.status(500).json({error: 'Internal Server Error'}))
    }
}