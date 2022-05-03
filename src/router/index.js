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
		path: '/asr-commission/comment/commission/:commissionId',
		name: 'asr-commission-comment-commission',
		meta: {requireAuth : true},
		component: CheckedActivity
	},
	{
		path: '/asr-topic/checked/topic/:topicId',
		name: 'asr-topic-checked-topic',
		meta: {requireAuth : true},
		component: CheckedActivity
	},
	{
		path: '/asr-topic/checked/topic/:topicId',
		name: 'asr-topic-comment-topic',
		meta: {requireAuth : true},
		component: CheckedActivity
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