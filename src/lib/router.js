import { buildRoutePath } from './build-route-path.js'
class Route {
  constructor(method, path, handler) {
    this.method = method
    this.path = buildRoutePath(path)
    this.handler = handler
  }
}

export class Router {
  #routes = []
  GET(path, handler) {
    const route = new Route('GET', path, handler)
    this.#routes.push(route)
  }

  POST(path, handler) {
    const route = new Route('POST', path, handler)
    this.#routes.push(route)
  }

  find(method, url) {
    return this.#routes.find((route) => {
      return route.method === method && route.path.test(url)
    })
  }
}
