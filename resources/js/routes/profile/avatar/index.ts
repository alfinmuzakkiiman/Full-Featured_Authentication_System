import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\User\ProfileController::update
* @see Http/Controllers/User/ProfileController.php:40
* @route '/profile/avatar'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/profile/avatar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\User\ProfileController::update
* @see Http/Controllers/User/ProfileController.php:40
* @route '/profile/avatar'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::update
* @see Http/Controllers/User/ProfileController.php:40
* @route '/profile/avatar'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\User\ProfileController::update
* @see Http/Controllers/User/ProfileController.php:40
* @route '/profile/avatar'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\User\ProfileController::update
* @see Http/Controllers/User/ProfileController.php:40
* @route '/profile/avatar'
*/
updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\User\ProfileController::destroy
* @see Http/Controllers/User/ProfileController.php:61
* @route '/profile/avatar'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/profile/avatar',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\User\ProfileController::destroy
* @see Http/Controllers/User/ProfileController.php:61
* @route '/profile/avatar'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::destroy
* @see Http/Controllers/User/ProfileController.php:61
* @route '/profile/avatar'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\User\ProfileController::destroy
* @see Http/Controllers/User/ProfileController.php:61
* @route '/profile/avatar'
*/
const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\User\ProfileController::destroy
* @see Http/Controllers/User/ProfileController.php:61
* @route '/profile/avatar'
*/
destroyForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const avatar = {
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default avatar