
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		layerMod: {
			status: false
		},

		// 右键菜单
		contextmenu: {
			data: {},
			evt: null
		}
	},

	actions: {

	},

	mutations: {
		// 显示隐藏弹层
		setLayerStatus (state, data) {
			state.layerMod = data
		},

		// 设置方法
		setContextmenu (state, data) {
			state.contextmenu = data
		},

		// 格式化后返回数据
		formatContextmenu (state, data) {
			state.contextmenu = {
				data,
				evt: null
			}
		}
	},

	// strict: debug
})
