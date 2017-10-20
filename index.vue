
<template>
	<section v-show="showMenu" ref="contextMenu">
		<VContextMenusBody ref="contextmenu" :menus="menus"></VContextMenusBody>
	</section>
</template>

<script>
	
	import store from '../../assets/js/store'
	import VContextMenusBody from './body'

	export default {
		name: 'v-contextmenus',
		components: {
			VContextMenusBody
		},
		data () {
			return {
				showMenu: true
			}
		},
		computed: {
			menus () {
				return store.state.contextmenu.data
			}
		},
		watch: {
			menus (val, old) {

				// 显示菜单 DOM
				this.showMenu = true

				// 数据变化时自动关闭所有二级菜单
				this.$refs.contextmenu.hideOpenMenu('all')

				// 在 vuex 中如果有数据和鼠标事件的情况下我们格式化数据
				if (store.state.contextmenu.evt) 
					this.show(val, store.state.contextmenu.evt)
			}
		},
		methods: {
			/* 
				获取定位
				@evt mouse事件
			*/
			getPosition( evt ) {
				
				let state = {
					position:  {
						left: evt.clientX,
						top: evt.clientY,
					},
					show: true
				}

				this.$nextTick(() => {

					let _ = this.$el.querySelector('ul')
					let _H = _.scrollHeight
					let _W = _.scrollWidth
					if (window.innerHeight < state.position.top + _H) {
						state.position.top = window.innerHeight - _H
					}

					if (window.innerWidth < state.position.left + _W) {
						state.position.left = window.innerWidth - _W
					}
				})

				return state;

			},

			// 显示
			// @obj 菜单内容
			// @evt 鼠标事件
			show (obj, evt) {

				// 计算初始定位
				let newPosition = this.getPosition( evt )

				let formatData = function (arr) {

					if (Array.isArray(arr)) {
						arr.forEach( (val, i) => {

							if (val.hasOwnProperty('children')) {
								// 如果已经有了 inner 那就不在格式化对象
								if (!val.children.hasOwnProperty('inner')) {
									val.children = formatData( val.children )
								}
							}
						})
					}

					return {
						inner: arr,
						state: {
							show: false,
							position: {
								top: 0,
								left: 0
							}
						}
					}

				}

				// 格式化数组为对象
				formatData( obj )
				
				// 通知 vuex
				store.commit('formatContextmenu', {
					state: newPosition,
					inner: obj
				})
			},

			// 点击非菜单时关闭菜单功能
			// e 鼠标事件
			documentClick(e) {
				let el = this.$refs.contextMenu
				let target = e.target

				if (( el !== target) && !el.contains(target)) {
					this.showMenu = false
					// 调用子组件关闭菜单所有的打开状态
					this.$refs.contextmenu.hideOpenMenu('all')
				}
			},



		},
		created () {
			document.addEventListener('click', this.documentClick)
		},
		destroyed () {
			document.removeEventListener('click', this.documentClick)
		}

	}
</script>

<style lang="scss" scoped>

</style>