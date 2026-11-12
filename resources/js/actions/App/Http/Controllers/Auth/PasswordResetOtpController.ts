import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::create
* @see Http/Controllers/Auth/PasswordResetOtpController.php:25
* @route '/forgot-password'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/forgot-password',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::create
* @see Http/Controllers/Auth/PasswordResetOtpController.php:25
* @route '/forgot-password'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::create
* @see Http/Controllers/Auth/PasswordResetOtpController.php:25
* @route '/forgot-password'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::create
* @see Http/Controllers/Auth/PasswordResetOtpController.php:25
* @route '/forgot-password'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::create
* @see Http/Controllers/Auth/PasswordResetOtpController.php:25
* @route '/forgot-password'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::create
* @see Http/Controllers/Auth/PasswordResetOtpController.php:25
* @route '/forgot-password'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::create
* @see Http/Controllers/Auth/PasswordResetOtpController.php:25
* @route '/forgot-password'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::sendOtp
* @see Http/Controllers/Auth/PasswordResetOtpController.php:35
* @route '/forgot-password'
*/
export const sendOtp = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendOtp.url(options),
    method: 'post',
})

sendOtp.definition = {
    methods: ["post"],
    url: '/forgot-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::sendOtp
* @see Http/Controllers/Auth/PasswordResetOtpController.php:35
* @route '/forgot-password'
*/
sendOtp.url = (options?: RouteQueryOptions) => {
    return sendOtp.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::sendOtp
* @see Http/Controllers/Auth/PasswordResetOtpController.php:35
* @route '/forgot-password'
*/
sendOtp.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendOtp.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::sendOtp
* @see Http/Controllers/Auth/PasswordResetOtpController.php:35
* @route '/forgot-password'
*/
const sendOtpForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sendOtp.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::sendOtp
* @see Http/Controllers/Auth/PasswordResetOtpController.php:35
* @route '/forgot-password'
*/
sendOtpForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sendOtp.url(options),
    method: 'post',
})

sendOtp.form = sendOtpForm

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::showResetForm
* @see Http/Controllers/Auth/PasswordResetOtpController.php:67
* @route '/reset-password'
*/
export const showResetForm = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showResetForm.url(options),
    method: 'get',
})

showResetForm.definition = {
    methods: ["get","head"],
    url: '/reset-password',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::showResetForm
* @see Http/Controllers/Auth/PasswordResetOtpController.php:67
* @route '/reset-password'
*/
showResetForm.url = (options?: RouteQueryOptions) => {
    return showResetForm.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::showResetForm
* @see Http/Controllers/Auth/PasswordResetOtpController.php:67
* @route '/reset-password'
*/
showResetForm.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showResetForm.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::showResetForm
* @see Http/Controllers/Auth/PasswordResetOtpController.php:67
* @route '/reset-password'
*/
showResetForm.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showResetForm.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::showResetForm
* @see Http/Controllers/Auth/PasswordResetOtpController.php:67
* @route '/reset-password'
*/
const showResetFormForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showResetForm.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::showResetForm
* @see Http/Controllers/Auth/PasswordResetOtpController.php:67
* @route '/reset-password'
*/
showResetFormForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showResetForm.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::showResetForm
* @see Http/Controllers/Auth/PasswordResetOtpController.php:67
* @route '/reset-password'
*/
showResetFormForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showResetForm.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showResetForm.form = showResetFormForm

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::reset
* @see Http/Controllers/Auth/PasswordResetOtpController.php:123
* @route '/reset-password'
*/
export const reset = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reset.url(options),
    method: 'post',
})

reset.definition = {
    methods: ["post"],
    url: '/reset-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::reset
* @see Http/Controllers/Auth/PasswordResetOtpController.php:123
* @route '/reset-password'
*/
reset.url = (options?: RouteQueryOptions) => {
    return reset.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::reset
* @see Http/Controllers/Auth/PasswordResetOtpController.php:123
* @route '/reset-password'
*/
reset.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reset.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::reset
* @see Http/Controllers/Auth/PasswordResetOtpController.php:123
* @route '/reset-password'
*/
const resetForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reset.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::reset
* @see Http/Controllers/Auth/PasswordResetOtpController.php:123
* @route '/reset-password'
*/
resetForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reset.url(options),
    method: 'post',
})

reset.form = resetForm

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::resendOtp
* @see Http/Controllers/Auth/PasswordResetOtpController.php:93
* @route '/forgot-password/resend-otp'
*/
export const resendOtp = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resendOtp.url(options),
    method: 'post',
})

resendOtp.definition = {
    methods: ["post"],
    url: '/forgot-password/resend-otp',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::resendOtp
* @see Http/Controllers/Auth/PasswordResetOtpController.php:93
* @route '/forgot-password/resend-otp'
*/
resendOtp.url = (options?: RouteQueryOptions) => {
    return resendOtp.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::resendOtp
* @see Http/Controllers/Auth/PasswordResetOtpController.php:93
* @route '/forgot-password/resend-otp'
*/
resendOtp.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resendOtp.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::resendOtp
* @see Http/Controllers/Auth/PasswordResetOtpController.php:93
* @route '/forgot-password/resend-otp'
*/
const resendOtpForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resendOtp.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\PasswordResetOtpController::resendOtp
* @see Http/Controllers/Auth/PasswordResetOtpController.php:93
* @route '/forgot-password/resend-otp'
*/
resendOtpForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resendOtp.url(options),
    method: 'post',
})

resendOtp.form = resendOtpForm

const PasswordResetOtpController = { create, sendOtp, showResetForm, reset, resendOtp }

export default PasswordResetOtpController