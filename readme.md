# VContextmenus

右键菜单功能

## 使用方式

1. 安装

```shell
yarn add v-contextmenus
```

2. 在 vues 的 state 中添加共享状态与方法

> 请先确保你有使用 vuex

```javascript
{
	state: {
		contextmenus: {
			// 状态
			show: true
			// 数据
			data: {},
			// 事件
			evt: null
		}
	},
	mutaions: {
		// 设置方法
		setContextmenu (state, data) {
			if (Object.keys(data).length > 1) {
				state.contextmenu = data
			} else {
				state.contextmenu.show = data.show
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
	// 引入 store
	import store from '../assets/js/store'
	// 引入
	import VContextmenus from '../components/VContextmenus'

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
			// 自定义事件
			rightClick (evt) {
				store.commit('setContextmenu', {
					data: this.menu, evt
				})
			}
		}
	}
</script>
``` 

## 事件方法

* store.commit('setContextmenu', {data, evt})

@data 菜单内容
@evt 鼠标事件

展示菜单功能

* 

## 完整示例

将 demo 文件放到你的 vue webpack 项目中,替换其下的 src