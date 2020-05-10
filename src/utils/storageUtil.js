// 因为原生的 HTML5本地存储在低版本浏览器不兼容，所以引用 store 库，让所有浏览器都兼容，并且语法更简单，而且 store 这个库遇到对象或者数组在存储的时候会自动帮我们调用 JSON.stringify() 先转成 JSON 字符串，在取值得时候如果返回一个 JSON 格式的对象或数组，也会自动调用 JSON.parse() 帮我们转好
import store from 'store'



const USER_KYE = 'user_key'

export default {
    // 保存 user
    saveUser(user) {
        // 原生写法
        // localStorage.setItem(USER_KYE,JSON.stringify(user))

        store.set(USER_KYE,user)
    },

    // 读取 user
    getUser() {
        // 原生写法
        // 如果 USER_KYE 有值就是 JSON 格式的字符串，如果没有值返回的就是 null，这样是不好的，最好 USER_KYE 没有值得时候返回一个 空对象，这样在 点什么属性的时候最起码不会报错
        // return  JSON.parse(localStorage.getItem(USER_KYE) || '{}' ) // 这里不能直接写 {}，因为 JSON.parse 接受一个 JSON 格式的字符串，所以需要写成 '{}'，如果直接写 {} 就是一个对象了，类型都不对

        return store.get(USER_KYE) || {}
    },

    // 删除 user
    removeUser() {
        // 原生写法
        // localStorage.removeItem(USER_KYE)
        
        store.remove(USER_KYE)
    }
}