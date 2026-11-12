import Auth from './Auth'
import Admin from './Admin'
import User from './User'
import Settings from './Settings'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    Admin: Object.assign(Admin, Admin),
    User: Object.assign(User, User),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers