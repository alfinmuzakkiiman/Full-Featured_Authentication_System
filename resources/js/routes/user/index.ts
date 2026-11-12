import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\User\DashboardController::dashboard
* @see Http/Controllers/User/DashboardController.php:15
* @route '/user/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/user/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\DashboardController::dashboard
* @see Http/Controllers/User/DashboardController.php:15
* @route '/user/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\DashboardController::dashboard
* @see Http/Controllers/User/DashboardController.php:15
* @route '/user/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\User\DashboardController::dashboard
* @see Http/Controllers/User/DashboardController.php:15
* @route '/user/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\User\DashboardController::dashboard
* @see Http/Controllers/User/DashboardController.php:15
* @route '/user/dashboard'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\User\DashboardController::dashboard
* @see Http/Controllers/User/DashboardController.php:15
* @route '/user/dashboard'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\User\DashboardController::dashboard
* @see Http/Controllers/User/DashboardController.php:15
* @route '/user/dashboard'
*/
dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dashboard.form = dashboardForm

/**
* @see \App\Http\Controllers\User\ProfileController::profile
* @see Http/Controllers/User/ProfileController.php:17
* @route '/user/profile'
*/
export const profile = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(options),
    method: 'get',
})

profile.definition = {
    methods: ["get","head"],
    url: '/user/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\ProfileController::profile
* @see Http/Controllers/User/ProfileController.php:17
* @route '/user/profile'
*/
profile.url = (options?: RouteQueryOptions) => {
    return profile.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::profile
* @see Http/Controllers/User/ProfileController.php:17
* @route '/user/profile'
*/
profile.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\User\ProfileController::profile
* @see Http/Controllers/User/ProfileController.php:17
* @route '/user/profile'
*/
profile.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: profile.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\User\ProfileController::profile
* @see Http/Controllers/User/ProfileController.php:17
* @route '/user/profile'
*/
const profileForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: profile.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\User\ProfileController::profile
* @see Http/Controllers/User/ProfileController.php:17
* @route '/user/profile'
*/
profileForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: profile.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\User\ProfileController::profile
* @see Http/Controllers/User/ProfileController.php:17
* @route '/user/profile'
*/
profileForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: profile.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

profile.form = profileForm

const user = {
    dashboard: Object.assign(dashboard, dashboard),
    profile: Object.assign(profile, profile),
}

export default user