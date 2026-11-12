import ProfileController from './ProfileController'
import DashboardController from './DashboardController'

const User = {
    ProfileController: Object.assign(ProfileController, ProfileController),
    DashboardController: Object.assign(DashboardController, DashboardController),
}

export default User