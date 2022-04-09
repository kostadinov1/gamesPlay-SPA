// here are is the routing
import * as api from './api/api.js'
import { logout } from './api/api.js'

import { render, page } from "./lib.js";
import { getUserData } from "./util.js";
import { cataloguePage } from './views/catalogue.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from "./views/home.js";
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';


const root = document.getElementById('main-content')
document.getElementById('logoutButton').addEventListener('click', onLogout)

window.api = api

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalogue', cataloguePage);
page('/create', createPage)
page('/details/:id', detailsPage)
page('/edit/:id', editPage)
updateUserNav();
page.start();




async function decorateContext(context, next){
    context.render = (content) => render(content, root);
    context.updateUserNav = updateUserNav;
    next()
}

async function onLogout() {
    await logout();
    updateUserNav();
    page.redirect('/')
}



export function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        document.getElementById('user').style.display = 'inline-block'
        document.getElementById('guest').style.display = 'none'
    } else {
        document.getElementById('user').style.display = 'none'
        document.getElementById('guest').style.display = 'inline-block'
    }
}