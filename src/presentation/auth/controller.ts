import { Request, Response } from "express"
import { AuthRepository, CustomError, RegisterUser, RegisterUserDto } from "../../domain"
import { UserModel } from "../../data/mongodb"

export class AuthController {
    constructor(
        private readonly authRepository: AuthRepository
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message})
        }

        console.log(error) // logger

        return res.status(500).json({error: 'Internal Server Error'})
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)
        if (error) return res.status(400).json({error});

        let registerUser = new RegisterUser(this.authRepository)
        registerUser.execute(registerUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    loginUser = (req: Request, res: Response) => {
        res.json('loginUser controller')
    }

    getUsers = (req: Request, res: Response) => {
        UserModel.find()
            .then(users => res.json({
                //users,
                user: req.body.user
            }))
            .catch(() => res.status(500).json({error: 'Internal Server Error'}))
    }
}