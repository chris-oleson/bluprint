import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../pages/sign-in'
import PageNotFound from '../pages/page-not-found'
import SignUp from '../pages/sign-up'
import Contact from '../pages/contact'
import Home from '../pages/home'
import Pricing from '../pages/pricing'
import About from '../pages/about'
import Store from './store'
import Settings from '../pages/settings'
import ForgotPassword from '../pages/forgot-password'
import ChangePassword from '../pages/change-password'
import ChangeEmail from '../pages/change-email'
import VerifyEmail from '../pages/verify-email'
import ChangeName from '../pages/change-name'
import DeleteAccount from '../pages/delete-account'
import PrivacyPolicy from '../pages/privacy-policy'
import Dashboard from '../pages/dashboard'

export const router = createRouter({
    history: createWebHistory(),
    scrollBehavior() {
        return { top: 0 }
    },
    routes: [
        {
            path: '/404',
            alias: '/:pathMatch(.*)*',
            component: PageNotFound,
            meta: {
                title: '404'
            }
        },
        {
            path: '/',
            component: Home,
        },
        {
            path: '/pricing',
            component: Pricing,
            meta: {
                title: 'Pricing'
            }
        },
        {
            path: '/about',
            component: About,
            meta: {
                title: 'About'
            }
        },
        {
            path: '/contact',
            component: Contact,
            meta: {
                title: 'Contact'
            }
        },
        {
            path: '/sign-in',
            beforeEnter: forwardLogin,
            component: SignIn,
            meta: {
                title: 'Sign In'
            }
        },
        {
            path: '/sign-up',
            beforeEnter: forwardLogin,
            component: SignUp,
            meta: {
                title: 'Sign Up'
            }
        },
        {
            path: '/settings',
            beforeEnter: rejectUnauthorized,
            component: Settings,
            meta: {
                title: 'Settings'
            }
        },
        {
            path: '/forgot-password',
            component: ForgotPassword,
            meta: {
                title: 'Forgot Password'
            }
        },
        {
            path: '/change-name',
            beforeEnter: rejectUnauthorized,
            component: ChangeName,
            meta: {
                title: 'Change Name'
            }
        },
        {
            path: '/change-password',
            beforeEnter: (to) => {
                if (!Store.isLoggedIn && !to.query.t) {
                    return { path: '/404' }
                }
            },
            component: ChangePassword,
            meta: {
                title: 'Change Password'
            }
        },
        {
            path: '/change-email',
            beforeEnter: rejectUnauthorized,
            component: ChangeEmail,
            meta: {
                title: 'Change Email'
            }
        },
        {
            path: '/verify-email',
            beforeEnter: (to) => {
                if (!to.query.t) {
                    return { path: '/404' }
                }
            },
            component: VerifyEmail,
            meta: {
                title: 'Verify Email'
            }
        },
        {
            path: '/delete-account',
            beforeEnter: rejectUnauthorized,
            component: DeleteAccount,
            meta: {
                title: 'Delete Account'
            }
        },
        {
            path: '/privacy',
            component: PrivacyPolicy,
            meta: {
                title: 'Privacy Policy'
            }
        },
        {
            path: '/dashboard',
            beforeEnter: [rejectUnauthorized],
            component: Dashboard,
            meta: {
                title: 'Dashboard'
            }
        },
    ]
})

router.afterEach(to => {
    if (to.meta.title) {
      document.title = `${to.meta.title} - bluprint`;
    }
    else {
        document.title = 'bluprint'
    }
})

function rejectUnauthorized() {
    if (!Store.isLoggedIn) {
        return { path: '/sign-in' }
    }
}

function forwardLogin(to) {
    if (Store.isLoggedIn && !to.query.t) {
        return { path: '/dashboard' }
    }
}
