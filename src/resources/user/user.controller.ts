import { Router, Request, Response, NextFunction } from 'express'

import Controller from '@/utils/interfaces/controller.interface'
import HttpException from '@/utils/exceptions/http.exception'
import ValidationMiddleware from '@/middleware/validation.middleware'
import validate from '@/resources/user/user.validation'
import UserService from '@/resources/user/user.service'
import authenticated from '@/middleware/authenticated.middleware'

class UserController implements Controller {
    public path = '/users'
    public router = Router()
    private userService = new UserService()

    constructor () {
        this.initializeRoutes()
    }

    private initializeRoutes = (): void => {
        this.router.post(`${this.path}/register`, ValidationMiddleware(validate.register), this.register)
        this.router.post(`${this.path}/login`, ValidationMiddleware(validate.login), this.login)
        this.router.get(`${this.path}`, authenticated, this.getUser)
    }

    private register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { name, email, password } = req.body
            const token = await this.userService.register(name, email, password, 'user')
            res.status(201).json({ token })
        } catch (error) {
            next(new HttpException(400, error instanceof Error ? error.message: 'Unable to create user'))
        }
    }

    private login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { email, password } = req.body
            const token = await this.userService.login(email, password)
            res.status(200).json({ token })
        } catch (error) {
            next(new HttpException(400, error instanceof Error ? error.message : 'Unable to login'))
        }
    }

    private getUser = (req: Request, res: Response, next: NextFunction): Response | void => {
        if (!req.user) {
            return next(new HttpException(404, 'User not found'))
        }

        res.status(200).json({
            user: req.user
        })
    }
}

export default UserController
