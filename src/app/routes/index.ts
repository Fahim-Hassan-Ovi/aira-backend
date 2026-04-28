import { Router } from "express"
import { AuthRoutes } from "../modules/auth/auth.route"
import { UserRoutes } from "../modules/user/user.route"
import { ReviewRoutes } from "../modules/review/review.route"
import { MessageRoutes } from "../modules/message/message.route"

export const router = Router()

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/review",
        route: ReviewRoutes
    },
    {
        path: "/message",
        route: MessageRoutes
    }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})
