import About from "../pages/About"
import Login from "../pages/Login"
import Loginorregister from "../pages/loginorregistry"
import Posts from "../pages/Posts"
import PostShow from "../pages/PostShow"
import Profile from "../pages/Profile"
import Registration from "../pages/Registration"

export const privateRoutes = [
    {path: '/about', component: About, exact: true},
    {path: '/api/posts', component: Posts, exact: true},
    {path: '/api/posts/:id', component: PostShow, exact: true},
    {path: '/api/profile/:id', component: Profile, exact: true},
]

export const publicRoutes = [
    {path: '/login', component: Login, exact: true},
    {path: '/registration', component: Registration, exact: true},
    {path: '/loginorregister', component: Loginorregister, exact: true},
    {path: '/about', component: About, exact: true},
]