import { login } from "../api/api.js";
import { html } from "../lib.js";
import { updateUserNav } from '../app.js'


const loginTemplate = (onSubmit) => html`

        <!-- Login Page ( Only for Guest users ) -->
        <section id="login-page" class="auth">
            <form @submit=${onSubmit} id="login">

                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Login</h1>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

                    <label for="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password">
                    <input type="submit" class="btn submit" value="Login">
                    <p class="field">
                        <span>If you don't have profile click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>
`;

export async function loginPage(context) {

    context.render(loginTemplate(onSubmit))

    async function onSubmit(event){
        event.preventDefault()

        const formData = new FormData(event.target)

        const email = formData.get('email').trim()
        const password = formData.get('password').trim()

        if (email == '' || password == '') {
            return alert('All fields are required!')
        }

        await login(email, password)
        updateUserNav()
        context.page.redirect('/')


    }

}