# VContextmenus

右键菜单功能

## 使用方式

1. 复制此组件到你的 components 文件夹下

2. 在 vues 的 state 中添加共享状态与方法

> 请先确保你有使用 vuex

```javascript
{
	state: {
		contextmenus: {
			// 数据
			data: {},
			// 事件
			evt: null
		}
	},
	mutaions: {
		// 设置方法
		setContextmenu (state, data) {
			state.contextmenu = data
		},

		// 格式化后返回数据
		formatContextmenu (state, data) {
			state.contextmenu = {
				data, evt: null
			}
		}
	}
}
```

3. 在页面中调用组件

```html
<template>
	<main>
		<!-- 绑定事件 -->
		<div @contextmenu.prevent="rightClick"></div>

		<!-- 引用 -->
		<VContextmenus></VContextmenus>
	</main>
</template>

<script>
	import store from '../assets/js/store'
	// 引入
	import VContextmenus from '../components/VContextmenus/index'

	export default {
		components: {
			VContextmenus
		},
		data () {
			return {
				// 菜单内容
				menu: [ ... ]
			}
		},
		methods: {
			rightClick (evt) {
				store.commit('setContextmenu', {
					data: this.menu, evt
				})
			}
		}
	}
</script>
``` 

## 完整示例

将 demo 文件放到你的 vue webpack 项目中,替换其下的 src