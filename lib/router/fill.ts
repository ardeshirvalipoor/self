import { ISelf } from '../../components/self'
import { IRouteParams } from './interfaces'
import router from './index'

export function fill(container: ISelf<HTMLElement>) {
    return {
        with: (routes: any, { currentRoute = '/' } = { currentRoute: '/' }) => {
            const pages: { [index: string]: any } = {}
            let currentPage = routes[currentRoute]()
            container.append(currentPage)
            currentPage.enter()
            pages[currentRoute] = currentPage
            Object.entries(routes).map(([route, P]: any) => {
                router.when(route, async (routeParams: IRouteParams) => await switchPage(route, P, routeParams))
            })
            async function switchPage(route: string, P: any, routeParams: any) {
                if (route == currentRoute) return
                router.busy()
                await currentPage.exit(routeParams)
                currentPage = await findOrAppendPage(route, P)
                await currentPage.enter(routeParams)
                router.free()
                currentRoute = route
            }
            async function findOrAppendPage(route: string, P: any) {
                if (pages[route] == undefined) {
                    pages[route] = await P()
                    container.append(pages[route])
                }
                return pages[route]
            }
        }
    }
}