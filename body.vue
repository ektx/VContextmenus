
<template>
	<section class="contextmenu-body-mod">
		<template v-if="menus.state && menus.state.show">
		<ul 
			v-show="menus.state.show"
			:class="browser" 
			:style="{
				top: menus.state.position.top +'px',
				left: menus.state.position.left +'px'

			}"
		>
			<li v-for="(data, index) in menus.inner" :key="index">
				<div 
					v-if="'title' in data" 
					:key="index" 
					:class="{noEvt: data.disabled}" 
					@mouseover="contextmenuMouseOverLazy(index, $event)"
					@click="contextmenuClick(index, $event, data.evt)"
				>
					{{ data.title }}

					<i v-if="data.children"></i>
				</div>
				<div class="separator" :key="index" v-else-if="'type' in data"></div>

				<template v-if="data.children">
					<v-contextmenus-body :menus="data.children">
					</v-contextmenus-body>
				</template>
			</li>
		</ul>
		</template>
	</section>
</template>

<script>

	export default {
		name: 'v-contextmenus-body',
		props: ['menus'],
		data () {
			return {
				browser: '',
				openMenu: null,
				lazyShow: null
			}
		},
		methods: {
			/*
				右键菜单功能
				@index [number] 当前点击对象的索引
				@evt [event] 鼠标事件
			*/
			contextmenuMouseOverFun (index, evt) {

				let data = this.menus.inner[index]
				let _BCR = evt.target;

				if (!evt.target) return;

				_BCR = _BCR.getBoundingClientRect()

				this.hideOpenMenu()

				if (data.hasOwnProperty('children')) {

					this.openMenu = data.children.state

					this.$set(this.openMenu, 'show', true)

					this.$nextTick( ()=> {
						let childrenUL = evt.target.nextElementSibling.querySelector('ul')
						let ULBCR = childrenUL.getBoundingClientRect()

						let top = 0;
						let left = 0;


						if (window.innerHeight < _BCR.top + ULBCR.height) {
							top = window.innerHeight - ULBCR.height
						} else {
							top = _BCR.top
						}

						if (window.innerWidth < _BCR.left + _BCR.width + ULBCR.width) {
							left = window.innerWidth - ULBCR.width
						} else {

							left = _BCR.left + _BCR.width
						}

						this.$set(this.openMenu, 'position', {
							top,
							left
						})

					})
				
				}
			},

			/*
				鼠标懒处理功能
				@index [number] 当前点击对象的索引
				@evt [event] 鼠标事件
			*/
			contextmenuMouseOverLazy (index, evt) {
				
				clearTimeout(this.lazyShow)

				this.lazyShow = setTimeout(() => {
					this.contextmenuMouseOverFun(index, evt)
				}, 100)
			},

			/*
				点击事件
				@index 		[number] 	当前点击对象的索引
				@evt 		[event] 	鼠标事件
				@callback 	[function] 	回调事件
			*/
			contextmenuClick (index, evt, callback) {

				if (callback) callback()

			},

			hideOpenMenu (type = 'one') {

				let forArr = function(arr) {
					for (let val of arr) {
						if (val.children) {
							val.children = resetState(val.children)
						}
					}

					return arr
				}

				let resetState = function(obj) {

					for (let [key, val] of Object.entries(obj)) {
						if (key === 'inner') {

							val = forArr(val)
						}

						if (key === 'state') {
							obj.state.show = false
						}
					}

					return obj
				}

				if (this.openMenu) {
					if (type === 'all') {
						this.menus = resetState(this.menus)
					} else {
						this.$set(this.openMenu, 'show', false)
					}
				}

			}
		},  // end methods,
		mounted: function () {
			// 对于 safari 浏览器添加特殊的样式效果
			// backdrop-filter
			if ('safari' in window) {
				this.browser = 'safari'
			}
		}
	}
</script>

<style lang="scss" scoped>
.contextmenu-body-mod {

	ul {
		position: fixed;
		top: 100px;
		left: 100px;
		padding: 5px 0;
		font-size: 1rem;
		text-align: left;
		line-height: 1.8rem;
		white-space: nowrap;
		background: rgba(255, 255, 255, 1);
		border-radius: 3px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
		z-index: 1000;

		&.safari {
			background: rgba(255, 255, 255, .75);
			backdrop-filter: blur(5px) saturate(180%);
		}
	}
	
	li {
		user-select: none;

		div {
			padding: 0 15px 0 10px;
			cursor: pointer;

			i {
				float: right;
				width: 0em;
				margin-left: 5px;
				pointer-events: none;

				&:after {
					display: inline-block;
					content: '';
					margin-left: 2px;
					border: .3em solid transparent;
					border-left-color: inherit;
				}
			}
		}

		.noEvt {
			color: #aaa;
			cursor: default;
			pointer-events: none;
		}

		&:hover {
			background: #539BFF;
			color: #fff;

			& .noEvt {
				color: rgba(255, 255, 255, .5);
			}
		}

		.separator {
			margin: 2px 0;
			border-bottom: 2px solid #eee;
			pointer-events: none;
		}
	}
}	
</style>