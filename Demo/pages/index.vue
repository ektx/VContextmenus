<template>
	<div>
		<div class="demo color" @contextmenu.prevent="contextmenuEvt('contextmenus', $event)">
			<h1>菜单</h1>
			<h2>右击试试</h2>
		</div>
		<div class="demo" @contextmenu.prevent="contextmenuEvt('contextmenus2', $event)">
			<h1>Menu</h1>
			<h2>Right Click!</h2>
		</div>

		<!-- 引用 -->
		<VContextmenus></VContextmenus>
	</div>
</template>

<script>
	import store from '../assets/js/store'
	import VContextmenus from '../components/VContextmenus/index'

	export default {
		name: 'index',
		components: {
			VContextmenus
		},
		data () {
			return {
				// 右键菜单
				contextmenus2: [
					{
						title: 'Welcome',
						disabled: false,
						evt: function() {
							console.log(':)')
						}
					},
					{
						title: 'Disabled',
						disabled: true
					},
					{
						title: 'Share',
						children: [
							{
								title: 'E-mail',
								disabled: true
							},
							{
								title: 'AirDrop',
								evt: function() {
									console.log('Not !')
								}
							},
							{
								title: 'Others..',
								children: [
									{
										title: 'QQ',
										disabled: true
									},
									{
										title: 'WeChat',
										evt: function() {
											console.log('WeChat')
										}
									},
									{
										title: 'Meassage',
										evt: function() {
											console.error('Meassage')
										}
									}
								]
							}
						]
					},
					{
						type: 'separator'
					},
					{
						title: 'Delete',
						evt: function() {
							console.log('del')
						}
					}
				],
				contextmenus: [
					{
						title: '欢迎',
						disabled: false,
						evt: function() {
							console.log(':)')
						}
					},
					{
						title: '不可用',
						disabled: true
					},
					{
						title: '分享',
						children: [
							{
								title: '邮件',
								disabled: true
							},
							{
								title: 'AirDrop',
								evt: function() {
									console.log('Not !')
								}
							},
							{
								title: '其它',
								children: [
									{
										title: 'QQ',
										disabled: true
									},
									{
										title: '微信',
										evt: function() {
											console.log('微信')
										}
									},
									{
										title: '信息',
										evt: function() {
											console.warn('信息')
										}
									}
								]
							}
						]
					},
					{
						type: 'separator'
					},
					{
						title: '删除',
						evt: function() {
							console.error('删除')
						}
					}
				]
			}
		},
		methods: {

			// 动态传入右键菜单内容
			contextmenuEvt (type, evt) {

				store.commit('setContextmenu', {
					data: this[type], 
					evt
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
div.demo {
	height: 100vh;
	width: 100vw;

	&.color {
		background: #eee
	}
}

</style>