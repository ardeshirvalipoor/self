import { elements } from './elements-db'

export const mounter = {
    init() {
        new MutationObserver(mutations => {
            mutations.map(m => findChildrenAndEmitId(m.addedNodes[0]))
        }).observe(document.body, { childList: true, subtree: true, characterData: false })
    }
}

function findChildrenAndEmitId(el: Node | Element) {
    if (el) {
        if (el instanceof Element) {
            const possibleId = el.attributes.getNamedItem('id')
            if (possibleId && elements[possibleId.value] && 'mounted' in elements[possibleId.value]) elements[possibleId.value].mounted()
        }
        for (let i = 0; i < el.childNodes.length; i++) {
            findChildrenAndEmitId(el.childNodes[i])
        }
    }
}