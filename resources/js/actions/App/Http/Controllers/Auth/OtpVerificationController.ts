import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::show
* @see Http/Controllers/Auth/OtpVerificationController.php:39
* @route '/verify-email'
*/
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/verify-email',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::show
* @see Http/Controllers/Auth/OtpVerificationController.php:39
* @route '/verify-email'
*/
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::show
* @see Http/Controllers/Auth/OtpVerificationController.php:39
* @route '/verify-email'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::show
* @see Http/Controllers/Auth/OtpVerificationController.php:39
* @route '/verify-email'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::show
* @see Http/Controllers/Auth/OtpVerificationController.php:39
* @route '/verify-email'
*/
const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::show
* @see Http/Controllers/Auth/OtpVerificationController.php:39
* @route '/verify-email'
*/
showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::show
* @see Http/Controllers/Auth/OtpVerificationController.php:39
* @route '/verify-email'
*/
showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::verify
* @see Http/Controllers/Auth/OtpVerificationController.php:65
* @route '/verify-email'
*/
export const verify = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(options),
    method: 'post',
})

verify.definition = {
    methods: ["post"],
    url: '/verify-email',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::verify
* @see Http/Controllers/Auth/OtpVerificationController.php:65
* @route '/verify-email'
*/
verify.url = (options?: RouteQueryOptions) => {
    return verify.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::verify
* @see Http/Controllers/Auth/OtpVerificationController.php:65
* @route '/verify-email'
*/
verify.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::verify
* @see Http/Controllers/Auth/OtpVerificationController.php:65
* @route '/verify-email'
*/
const verifyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: verify.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::verify
* @see Http/Controllers/Auth/OtpVerificationController.php:65
* @route '/verify-email'
*/
verifyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: verify.url(options),
    method: 'post',
})

verify.form = verifyForm

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::resend
* @see Http/Controllers/Auth/OtpVerificationController.php:106
* @route '/resend-otp'
*/
export const resend = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resend.url(options),
    method: 'post',
})

resend.definition = {
    methods: ["post"],
    url: '/resend-otp',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::resend
* @see Http/Controllers/Auth/OtpVerificationController.php:106
* @route '/resend-otp'
*/
resend.url = (options?: RouteQueryOptions) => {
    return resend.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::resend
* @see Http/Controllers/Auth/OtpVerificationController.php:106
* @route '/resend-otp'
*/
resend.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resend.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::resend
* @see Http/Controllers/Auth/OtpVerificationController.php:106
* @route '/resend-otp'
*/
const resendForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resend.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::resend
* @see Http/Controllers/Auth/OtpVerificationController.php:106
* @route '/resend-otp'
*/
resendForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resend.url(options),
    method: 'post',
})

resend.form = resendForm

const OtpVerificationController = { show, verify, resend }

export default OtpVerificationController