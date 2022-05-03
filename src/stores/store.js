import Vue from "vue"
import Vuex from "vuex"

import User from './modules/user'
import CheckingActivities from './modules/checkingActivities'
import CheckingActivity from './modules/checkingActivity'
import CheckedActivities from "./modules/checkedActivities"
import CheckedActivity from "./modules/checkedActivity"
import UserCertification from "./modules/userCertification"
import Feedbacks from './modules/feedbacks'
import UserList from './modules/userList'
import AppliedCommission from './modules/appliedCommission'
import Acommission from './modules/acommission'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user: User,
		checkingActivities: CheckingActivities,
		checkingActivity: CheckingActivity,
		checkedActivities: CheckedActivities,
		checkedActivity: CheckedActivity,
		userCertification: UserCertification,
		feedbacks: Feedbacks,
		userList: UserList,
		appliedCommission: AppliedCommission,
		acommission: Acommission,
	}
})