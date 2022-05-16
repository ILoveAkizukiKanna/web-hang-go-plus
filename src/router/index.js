import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

import Index from "../view/Index";
import Login from "../view/Login";
import CheckingActivities from "../view/CheckingActivities";
import CheckedActivities from "../view/CheckedActivities";
import UserCertification from "../view/UserCertification";
import CheckingActivity from "../view/CheckingActivity";
import CheckedActivity from "../view/CheckedActivity";
import Feedbacks from '@/view/Feedbacks'
import UserList from '@/view/UserList'
import AppliedCommission from '../view/AppliedCommission'
import Acommission from '../view/Acommission'
import Topics from '../view/Topics'
import Topic from '../view/Topic'
import TypeCommission from "../view/TypeCommission";
import TypeCommissionDetail from "../view/TypeCommissionDetail";
import TypeTopic from "../view/TypeTopic";
import TypeTopicDetail from "../view/TypeTopicDetail";
import Auth from "../view/Auth"
import Complaints from "../view/Complaints";
import Appeal from "../view/Appeal";
import AppealDetail from "../view/AppealDetail"
import Complaint from "../view/Complaint";

const routes = [
	{
		path: '/',
		redirect: '/index',
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/index',
		name: 'index',
		meta: {requireAuth : true},
		component: Index
	},
	{
		path: '/asr-activity/checking',
		name: 'asr-activity-checking',
		meta: {requireAuth : true},
		component: CheckingActivities
	},
	{
		path: '/asr-activity/active',
		name: 'asr-activity-active',
		meta: {requireAuth : true},
		component: CheckedActivities
	},
	{
		path: '/asr-user-manage/certification',
		name: 'asr-users-certification',
		meta: {requireAuth : true},
		component: UserCertification
	},
	{
		path: '/asr-activity/checking/activity/:activityId',
		name: 'asr-activity-checking-activity',
		meta: {requireAuth : true},
		component: CheckingActivity
	},
	{
		path: '/asr-activity/checked/activity/:activityId',
		name: 'asr-activity-checked-activity',
		meta: {requireAuth : true},
		component: CheckedActivity
	},
	{
		path: '/asr-user-manage/users',
		name: 'asr-users',
		meta: {requireAuth : true},
		component: UserList
	},
	{
		path: '/asr-user-auth/:userId',
		name: 'asr-user-auth',
		meta: {requireAuth : true},
		component: Auth
	},
	{
		path: '/asr-feedbacks',
		name: 'asr-feedbacks',
		meta: {requireAuth : true},
		component: Feedbacks
	},
	{
		path: '/asr-commission/applied/commission',
		name: 'asr-commission-applied-commission',
		meta: {requireAuth : true},
		component: AppliedCommission
	},
	{
		path: '/asr-commission/acommission/:commissionId',
		name: 'asr-commission-acommission',
		meta: {requireAuth : true},
		component: Acommission
	},
	{
		path: '/asr-topic/topics/',
		name: 'asr-topics',
		meta: {requireAuth : true},
		component: Topics
	},
	{
		path: '/asr-topic/topic/:topicId',
		name: 'asr-topic',
		meta: {requireAuth : true},
		component: Topic
	},
	{
		path: '/asr-commission/type/commission',
		name: 'asr-commission-type-commission',
		meta: {requireAuth : true},
		component: TypeCommission
	},
	{
		path: '/asr-commission/type/commission/detail/:typeId',
		name: 'asr-commission-type-commission-detail',
		meta: {requireAuth : true},
		component: TypeCommissionDetail
	},
	{
		path: '/asr-topic/type/topic',
		name: 'asr-topic-type-topic',
		meta: {requireAuth : true},
		component: TypeTopic
	},
	{
		path: '/asr-topic/type/topic/detail/:typeId',
		name: 'asr-topic-type-topic-detail',
		meta: {requireAuth : true},
		component: TypeTopicDetail
	},
	{
		path: '/asr-user-manage/complaints',
		name: 'asr-user-manage-complaints',
		meta: {requireAuth : true},
		component: Complaints
	},
	{
		path: '/asr-user-manage/complaint',
		name: 'asr-user-manage-complaint',
		meta: {requireAuth : true},
		component: Complaint
	},
	{
		path: '/asr-user-manage/appeal',
		name: 'asr-user-manage-appeal',
		meta: {requireAuth : true},
		component: Appeal
	},
	{
		path: '/asr-user-manage/appeal/detail:detailId',
		name: 'asr-user-manage-appeal-detail',
		meta: {requireAuth : true},
		component: AppealDetail
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/view/result/404'),
	},
	{
		path: '*',
		redirect: '/404',
	},
]

const router = new VueRouter({
	routes,
	mode: "history"
});

export default router