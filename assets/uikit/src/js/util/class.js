import { attr } from './attr';
import { isUndefined, toNodes } from './lang';

export function addClass(element, ...args) {
    apply(element, args, 'add');
}

export function removeClass(element, ...args) {
    apply(element, args, 'remove');
}

export function removeClasses(element, cls) {
    attr(element, 'class', (value) => (value || '').replace(new RegExp(`\\b${cls}\\b`, 'g'), ''));
}

export function replaceClass(element, ...args) {
    args[0] && removeClass(element, args[0]);
    args[1] && addClass(element, args[1]);
}

export function hasClass(element, cls) {
    [cls] = getClasses(cls);
    for (const node of toNodes(element)) {
        if (cls && node.classList.contains(cls)) {
            return true;
        }
    }
    return false;
}

export function toggleClass(element, cls, force) {
    const classes = getClasses(cls);

    if (!isUndefined(force)) {
        force = !!force;
    }

    for (const node of toNodes(element)) {
        for (const cls of classes) {
            node.classList.toggle(cls, force);
        }
    }
}

function apply(element, args, fn) {
    args = args.reduce((args, arg) => args.concat(getClasses(arg)), []);

    for (const node of toNodes(element)) {
        node.classList[fn](...args);
    }
}

function getClasses(str) {
    return String(str).split(/\s|,/).filter(Boolean);
}
