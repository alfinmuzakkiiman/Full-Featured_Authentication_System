import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\User\ProfileController::show
* @see Http/Controllers/User/ProfileController.php:17
* @route '/admin/profile'
*/
const show2b603298152ec5dd9b14768a8a90e70d = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show2b603298152ec5dd9b14768a8a90e70d.url(options),
    method: 'get',
})

show2b603298152ec5dd9b14768a8a90e70d.definition = {
    methods: ["get","head"],
    url: '/admin/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\ProfileController::show
* @see Http/Controllers/User/ProfileController.php:17
* @route '/admin/profile'
*/
show2b603298152ec5dd9b14768a8a90e70d.url = (options?: RouteQueryOptions) => {
    return show2b603298152ec5dd9b14768a8a90e70d.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::show
* @see Http/Controllers/User/ProfileController.php:17
* @route '/admin/profile'
*/
show2b603298152ec5dd9b14768a8a90e70d.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show2b603298152ec5dd9b14768a8a90e70d.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\User\ProfileController::show
* @see Http/Controllers/User/ProfileController.php:17
* @route '/admin/profile'
*/
show2b603298152ec5dd9b14768a8a90e70d.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show2b603298152ec5dd9b14768a8a90e70d.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\User\ProfileController::show
* @see Http/Controllers/User/ProfileController.php:17
* @route '/admin/profile'
*/
const show2b603298152ec5dd9b14768a8a90e70dForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show2b603298152ec5dd9b14768a8a90e70d.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\User\ProfileController::show
* @see Http/Controllers/User/ProfileController.php:17
* @route '/admin/profile'
*/
show2b603298152ec5dd9b14768a8a90e70dForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show2b603298152ec5dd9b14768a8a90e70d.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\User\ProfileController::show
* @see Http/Controllers/User/ProfileController.php:17
* @route '/admin/profile'
*/
show2b603298152ec5dd9b14768a8a90e70dForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show2b603298152ec5dd9b14768a8a90e70d.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show2b603298152ec5dd9b14768a8a90e70d.form = show2b603298152ec5dd9b14768a8a90e70dForm
/**
* @see \App\Http\Controllers\User\ProfileController::show
* @see Http/Controllers/User/ProfileController.php:17
* @route '/user/profile'
*/
const show24336b274ff0444f46cda8a0a44a347b = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show24336b274ff0444f46cda8a0a44a347b.url(options),
    method: 'get',
})

show24336b274ff0444f46cda8a0a44a347b.definition = {
    methods: ["get","head"],
    url: '/user/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\ProfileController::show
* @see Http/Controllers/User/ProfileController.php:17
* @route '/user/profile'
*/
show24336b274ff0444f46cda8a0a44a347b.url = (options?: RouteQueryOptions) => {
    return show24336b274ff0444f46cda8a0a44a347b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::show
* @see Http/Controllers/User/ProfileController.php:17
* @route '/user/profile'
*/
show24336b274ff0444f46cda8a0a44a347b.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show24336b274ff0444f46cda8a0a44a347b.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\User\ProfileController::show
* @see Http/Controllers/User/ProfileController.php:17
* @route '/user/profile'
*/
show24336b274ff0444f46cda8a0a44a347b.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show24336b274ff0444f46cda8a0a44a347b.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\User\ProfileController::show
* @see Http/Controllers/User/ProfileController.php:17
* @route '/user/profile'
*/
const show24336b274ff0444f46cda8a0a44a347bForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show24336b274ff0444f46cda8a0a44a347b.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\User\ProfileController::show
* @see Http/Controllers/User/ProfileController.php:17
* @route '/user/profile'
*/
show24336b274ff0444f46cda8a0a44a347bForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show24336b274ff0444f46cda8a0a44a347b.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\User\ProfileController::show
* @see Http/Controllers/User/ProfileController.php:17
* @route '/user/profile'
*/
show24336b274ff0444f46cda8a0a44a347bForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show24336b274ff0444f46cda8a0a44a347b.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show24336b274ff0444f46cda8a0a44a347b.form = show24336b274ff0444f46cda8a0a44a347bForm

/**
* Multiple routes resolve to \App\Http\Controllers\User\ProfileController::show, so this export is a
* dictionary keyed by URI rather than a callable, with the verbs prefixed where two routes share a URI.
* Call a specific route with `show['<key>'](...)`, or import the route by name from your
* generated `routes/` directory.
*/
export const show = {
    '/admin/profile': show2b603298152ec5dd9b14768a8a90e70d,
    '/user/profile': show24336b274ff0444f46cda8a0a44a347b,
}

/**
* @see \App\Http\Controllers\User\ProfileController::updateAvatar
* @see Http/Controllers/User/ProfileController.php:40
* @route '/profile/avatar'
*/
export const updateAvatar = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateAvatar.url(options),
    method: 'post',
})

updateAvatar.definition = {
    methods: ["post"],
    url: '/profile/avatar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\User\ProfileController::updateAvatar
* @see Http/Controllers/User/ProfileController.php:40
* @route '/profile/avatar'
*/
updateAvatar.url = (options?: RouteQueryOptions) => {
    return updateAvatar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::updateAvatar
* @see Http/Controllers/User/ProfileController.php:40
* @route '/profile/avatar'
*/
updateAvatar.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateAvatar.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\User\ProfileController::updateAvatar
* @see Http/Controllers/User/ProfileController.php:40
* @route '/profile/avatar'
*/
const updateAvatarForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateAvatar.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\User\ProfileController::updateAvatar
* @see Http/Controllers/User/ProfileController.php:40
* @route '/profile/avatar'
*/
updateAvatarForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateAvatar.url(options),
    method: 'post',
})

updateAvatar.form = updateAvatarForm

/**
* @see \App\Http\Controllers\User\ProfileController::destroyAvatar
* @see Http/Controllers/User/ProfileController.php:61
* @route '/profile/avatar'
*/
export const destroyAvatar = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyAvatar.url(options),
    method: 'delete',
})

destroyAvatar.definition = {
    methods: ["delete"],
    url: '/profile/avatar',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\User\ProfileController::destroyAvatar
* @see Http/Controllers/User/ProfileController.php:61
* @route '/profile/avatar'
*/
destroyAvatar.url = (options?: RouteQueryOptions) => {
    return destroyAvatar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::destroyAvatar
* @see Http/Controllers/User/ProfileController.php:61
* @route '/profile/avatar'
*/
destroyAvatar.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyAvatar.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\User\ProfileController::destroyAvatar
* @see Http/Controllers/User/ProfileController.php:61
* @route '/profile/avatar'
*/
const destroyAvatarForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyAvatar.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\User\ProfileController::destroyAvatar
* @see Http/Controllers/User/ProfileController.php:61
* @route '/profile/avatar'
*/
destroyAvatarForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyAvatar.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyAvatar.form = destroyAvatarForm

const ProfileController = { show, updateAvatar, destroyAvatar }

export default ProfileController