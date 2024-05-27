/**
   * Easy selector helper function
   */
const select = (el, all = false) => {
    el = el.trim()
    if (all) {
        return [...document.querySelectorAll(el)]
    } else {
        return document.querySelector(el)
    }
}

/**
   * Easy event listener function
   */
const on = (type, el, listener, all = false) => {
    if (all) {
        select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
        select(el, all).addEventListener(type, listener)
    }
}

/**
   * Easy on scroll event listener 
   */
const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
}

/**
   * Scrolls to an element with header offset
   */
const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
        offset -= 10
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
    })
}

export { select, on, onscroll, scrollto }