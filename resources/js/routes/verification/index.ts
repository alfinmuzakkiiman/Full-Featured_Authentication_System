import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::notice
* @see Http/Controllers/Auth/OtpVerificationController.php:39
* @route '/verify-email'
*/
export const notice = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: notice.url(options),
    method: 'get',
})

notice.definition = {
    methods: ["get","head"],
    url: '/verify-email',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::notice
* @see Http/Controllers/Auth/OtpVerificationController.php:39
* @route '/verify-email'
*/
notice.url = (options?: RouteQueryOptions) => {
    return notice.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::notice
* @see Http/Controllers/Auth/OtpVerificationController.php:39
* @route '/verify-email'
*/
notice.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: notice.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::notice
* @see Http/Controllers/Auth/OtpVerificationController.php:39
* @route '/verify-email'
*/
notice.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: notice.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::notice
* @see Http/Controllers/Auth/OtpVerificationController.php:39
* @route '/verify-email'
*/
const noticeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: notice.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::notice
* @see Http/Controllers/Auth/OtpVerificationController.php:39
* @route '/verify-email'
*/
noticeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: notice.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\OtpVerificationController::notice
* @see Http/Controllers/Auth/OtpVerificationController.php:39
* @route '/verify-email'
*/
noticeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: notice.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

notice.form = noticeForm

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

const verification = {
    notice: Object.assign(notice, notice),
    verify: Object.assign(verify, verify),
    resend: Object.assign(resend, resend),
}

export default verification