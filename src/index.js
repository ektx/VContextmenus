
import main from './components/'

const VContextmenus = {}

const install = function(Vue) {
	Vue.component('VContextmenus', main)
}

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}

module.exports = Object.assign(VContextmenus, {install})