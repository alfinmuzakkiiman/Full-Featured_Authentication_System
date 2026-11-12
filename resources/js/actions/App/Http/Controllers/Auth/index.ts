import AuthenticatedSessionController from './AuthenticatedSessionController'
import RegisteredUserController from './RegisteredUserController'
import GoogleAuthController from './GoogleAuthController'
import PasswordResetOtpController from './PasswordResetOtpController'
import OtpVerificationController from './OtpVerificationController'

const Auth = {
    AuthenticatedSessionController: Object.assign(AuthenticatedSessionController, AuthenticatedSessionController),
    RegisteredUserController: Object.assign(RegisteredUserController, RegisteredUserController),
    GoogleAuthController: Object.assign(GoogleAuthController, GoogleAuthController),
    PasswordResetOtpController: Object.assign(PasswordResetOtpController, PasswordResetOtpController),
    OtpVerificationController: Object.assign(OtpVerificationController, OtpVerificationController),
}

export default Auth