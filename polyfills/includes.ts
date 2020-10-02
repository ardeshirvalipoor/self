if (!String.prototype.includes) {
    String.prototype.includes = function (search: string | any, start) {
        'use strict'

        if (search instanceof RegExp) {
            throw TypeError('first argument must not be a RegExp')
        }
        if (start === undefined) { start = 0 }
        return this.indexOf(search, start) !== -1
    }
}