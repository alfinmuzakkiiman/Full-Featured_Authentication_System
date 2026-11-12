import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::request
* @see Http/Controllers/Auth/PasswordResetOtpController.php:25
* @route '/forgot-password'
*/
export const request = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: request.url(options),
    method: 'get',
})

request.definition = {
    methods: ["get","head"],
    url: '/forgot-password',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::request
* @see Http/Controllers/Auth/PasswordResetOtpController.php:25
* @route '/forgot-password'
*/
request.url = (options?: RouteQueryOptions) => {
    return request.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::request
* @see Http/Controllers/Auth/PasswordResetOtpController.php:25
* @route '/forgot-password'
*/
request.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: request.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::request
* @see Http/Controllers/Auth/PasswordResetOtpController.php:25
* @route '/forgot-password'
*/
request.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: request.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::request
* @see Http/Controllers/Auth/PasswordResetOtpController.php:25
* @route '/forgot-password'
*/
const requestForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: request.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::request
* @see Http/Controllers/Auth/PasswordResetOtpController.php:25
* @route '/forgot-password'
*/
requestForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: request.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::request
* @see Http/Controllers/Auth/PasswordResetOtpController.php:25
* @route '/forgot-password'
*/
requestForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: request.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

request.form = requestForm

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::email
* @see Http/Controllers/Auth/PasswordResetOtpController.php:35
* @route '/forgot-password'
*/
export const email = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: email.url(options),
    method: 'post',
})

email.definition = {
    methods: ["post"],
    url: '/forgot-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::email
* @see Http/Controllers/Auth/PasswordResetOtpController.php:35
* @route '/forgot-password'
*/
email.url = (options?: RouteQueryOptions) => {
    return email.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::email
* @see Http/Controllers/Auth/PasswordResetOtpController.php:35
* @route '/forgot-password'
*/
email.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: email.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::email
* @see Http/Controllers/Auth/PasswordResetOtpController.php:35
* @route '/forgot-password'
*/
const emailForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: email.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::email
* @see Http/Controllers/Auth/PasswordResetOtpController.php:35
* @route '/forgot-password'
*/
emailForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: email.url(options),
    method: 'post',
})

email.form = emailForm

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::reset
* @see Http/Controllers/Auth/PasswordResetOtpController.php:67
* @route '/reset-password'
*/
export const reset = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reset.url(options),
    method: 'get',
})

reset.definition = {
    methods: ["get","head"],
    url: '/reset-password',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::reset
* @see Http/Controllers/Auth/PasswordResetOtpController.php:67
* @route '/reset-password'
*/
reset.url = (options?: RouteQueryOptions) => {
    return reset.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::reset
* @see Http/Controllers/Auth/PasswordResetOtpController.php:67
* @route '/reset-password'
*/
reset.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reset.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::reset
* @see Http/Controllers/Auth/PasswordResetOtpController.php:67
* @route '/reset-password'
*/
reset.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reset.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::reset
* @see Http/Controllers/Auth/PasswordResetOtpController.php:67
* @route '/reset-password'
*/
const resetForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reset.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::reset
* @see Http/Controllers/Auth/PasswordResetOtpController.php:67
* @route '/reset-password'
*/
resetForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reset.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::reset
* @see Http/Controllers/Auth/PasswordResetOtpController.php:67
* @route '/reset-password'
*/
resetForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reset.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

reset.form = resetForm

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::update
* @see Http/Controllers/Auth/PasswordResetOtpController.php:123
* @route '/reset-password'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/reset-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::update
* @see Http/Controllers/Auth/PasswordResetOtpController.php:123
* @route '/reset-password'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::update
* @see Http/Controllers/Auth/PasswordResetOtpController.php:123
* @route '/reset-password'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::update
* @see Http/Controllers/Auth/PasswordResetOtpController.php:123
* @route '/reset-password'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::update
* @see Http/Controllers/Auth/PasswordResetOtpController.php:123
* @route '/reset-password'
*/
updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(options),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::resend
* @see Http/Controllers/Auth/PasswordResetOtpController.php:93
* @route '/forgot-password/resend-otp'
*/
export const resend = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resend.url(options),
    method: 'post',
})

resend.definition = {
    methods: ["post"],
    url: '/forgot-password/resend-otp',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::resend
* @see Http/Controllers/Auth/PasswordResetOtpController.php:93
* @route '/forgot-password/resend-otp'
*/
resend.url = (options?: RouteQueryOptions) => {
    return resend.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::resend
* @see Http/Controllers/Auth/PasswordResetOtpController.php:93
* @route '/forgot-password/resend-otp'
*/
resend.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resend.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::resend
* @see Http/Controllers/Auth/PasswordResetOtpController.php:93
* @route '/forgot-password/resend-otp'
*/
const resendForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resend.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::resend
* @see Http/Controllers/Auth/PasswordResetOtpController.php:93
* @route '/forgot-password/resend-otp'
*/
resendForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resend.url(options),
    method: 'post',
})

resend.form = resendForm

/**
* @see routes/web.php:59
* @route '/confirm-password'
*/
export const confirm = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirm.url(options),
    method: 'get',
})

confirm.definition = {
    methods: ["get","head"],
    url: '/confirm-password',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:59
* @route '/confirm-password'
*/
confirm.url = (options?: RouteQueryOptions) => {
    return confirm.definition.url + queryParams(options)
}

/**
* @see routes/web.php:59
* @route '/confirm-password'
*/
confirm.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirm.url(options),
    method: 'get',
})

/**
* @see routes/web.php:59
* @route '/confirm-password'
*/
confirm.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: confirm.url(options),
    method: 'head',
})

/**
* @see routes/web.php:59
* @route '/confirm-password'
*/
const confirmForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: confirm.url(options),
    method: 'get',
})

/**
* @see routes/web.php:59
* @route '/confirm-password'
*/
confirmForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: confirm.url(options),
    method: 'get',
})

/**
* @see routes/web.php:59
* @route '/confirm-password'
*/
confirmForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: confirm.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

confirm.form = confirmForm

const password = {
    request: Object.assign(request, request),
    email: Object.assign(email, email),
    reset: Object.assign(reset, reset),
    update: Object.assign(update, update),
    resend: Object.assign(resend, resend),
    confirm: Object.assign(confirm, confirm),
}

export default password