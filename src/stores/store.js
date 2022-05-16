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
import Topics from './modules/topics'
import Topic from './modules/topic'
import TypeCommission from "./modules/typeCommission";
import TypeCommissionDetail from "./modules/typeCommissionDetail";
import TypeTopic from "./modules/typeTopic";
import TypeTopicDetail from "./modules/typeTopicDetail";
import Auth from "./modules/auth"
import Appeal from "./modules/appeal"
import AppealDetail from "./modules/appealDetail"
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
		topics: Topics,
		topic: Topic,
		typeCommission: TypeCommission,
		typeCommissionDetail: TypeCommissionDetail,
		typeTopic:TypeTopic,
		typeTopicDetail:TypeTopicDetail,
		auth: Auth,
		appeal:Appeal,
		appealDetail: AppealDetail,
	}
})