import { Router } from "express"
import { AuthRoutes } from "../modules/auth/auth.route"
import { UserRoutes } from "../modules/user/user.route"
import { ReviewRoutes } from "../modules/review/review.route"
import { MessageRoutes } from "../modules/message/message.route"
import { PropertyRoutes } from "../modules/property/property.route"

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
        path: "/property",
        route: PropertyRoutes
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
