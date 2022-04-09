// this is a bypass of the render html page util
// to get shorter and cleaner paths in the code 

import { html, render} from '../node_modules/lit-html/lit-html.js';
import { until } from '../node_modules/lit-html/directives/until.js';
import page from '../node_modules/page/page.mjs';

export {
    html,
    render,
    until,
    page
}