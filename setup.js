import { routes } from "./routes.config.js"

let createApp
window.onload = async() => {
    await window.prerender()
    import('vue')
        .then(component => {
            createApp = component.createApp
            Setup.serve('main')
        })
}

window.app = null
const Setup = {
    serve: (container) => {
        mountPath(window.location.hash, container, true)
        window.addEventListener('hashchange', () => {
            mountPath(window.location.hash, container)
        })
    },
    updateMetaInformation: (el) => {
        let metatags = {}
        el.meta.forEach(meta => {
            metatags[meta.name] = meta.content
        })

        document.title = metatags?.title
        document.querySelector('meta[name="description"]')?.setAttribute("content", metatags?.description)
    }
}

const mountPath = (route, container, isFirstTime) => {
    if (route) {
        const p = routes.find(el => el.path === route.replace('#', ''))
        Setup.updateMetaInformation(p)
        import('./bundles/' + p.component.replace('.vue', '.js'))
            .then((script) => {
                if (window.app) window.app.unmount()
                window.app = createApp(script.default)
                window.app.mount(container)
            })
    }
    else 
    {
        let mainUrl = window.location.pathname
        const p = routes.find(el => el.path === mainUrl)
        Setup.updateMetaInformation(p)
        import('./bundles/' + p.component.replace('.vue', '.js'))
            .then((script) => {
                if (window.app) window.app.unmount()
                window.app = createApp(script.default)
                window.app.mount(container)
                window.history.replaceState(null, '', window.location.origin + '/#' + p.path)
            })
    }
}

export default Setup