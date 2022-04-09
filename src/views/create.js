import { createNewGame } from "../api/data.js";
import { html } from "../lib.js";


const createTemplate = (onSubmit) => html`
        <!-- Create Page ( Only for logged-in users ) -->
        <section id="create-page" class="auth">
            <form @submit=${onSubmit} id="create">
                <div class="container">

                    <h1>Create Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" placeholder="Enter game title...">

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" placeholder="Enter game category...">

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary"></textarea>
                    <input class="btn submit" type="submit" value="Create Game">
                </div>
            </form>
        </section>
`;


export async function createPage(context) {

    context.render(createTemplate(onSubmit))

    async function onSubmit(ev) {
        ev.preventDefault()

        const formData = new FormData(ev.target)

        const title = formData.get('title').trim()
        const category = formData.get('category').trim()
        const maxLevel = formData.get('maxLevel').trim()
        const imageUrl = formData.get('imageUrl').trim()
        const summary = formData.get('summary').trim()
        
        if (title == '' || category == '' || maxLevel == '' || imageUrl == '' || summary == '') {
            return alert('All fields required!')
        }

        await createNewGame({
            title,
            category,
            maxLevel,
            imageUrl,
            summary
        })
        context.page.redirect('/')

    }
}