import { URL } from 'url'
import fetch from 'node-fetch'

const interceptors = {}

const fetchClosure = () => (url, options) => {
    const { pathname } = new URL(url)
    console.log("interceptors", interceptors)
    if (interceptors[pathname]) {
        return interceptors[pathname](url, options)
    }
    return fetch(url, options)
}

const use = (pattern, interceptor) => {
    console.log(pattern, interceptor)
    interceptors[pattern] = interceptor
    console.log(interceptors)
    return use
}

global.fetch = global.fetch || fetchClosure(interceptors)

export default ({ use, fetch: global.fetch })
