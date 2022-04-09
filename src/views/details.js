import { createNewComment, deleteGameById, getGameDetailsById, loadAllComments } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";


const detailsTemplate = (userData, game, isOwner, comments, onDelete, addComment) => html`
        <!--Details Page-->
        <section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src="${game.imageUrl}" />
                    <h1>Bright</h1>
                    <span class="levels">MaxLevel: ${game.maxLevel}</span>
                    <p class="type">${game.category}</p>
                </div>

                <p class="text">
                    ${game.summary}
                </p>

                <div class="details-comments">
                <h2>Comments:</h2>
                ${comments ? html`                    
                    <ul>
                        <!-- list all comments for current game (If any) -->
                        ${comments.map(commentCard)}

                    </ul>` 
                    : html`<p class="no-comment">No comments.</p> `}
                </div>
                    
                

                ${isOwner ? html` 
                <div class="buttons">
                    <a href="/edit/${game._id}" class="button">Edit</a>
                    <a @click=${onDelete} href="javasript:void(0)" class="button">Delete</a>
                </div>`
                : null}

               
            </div>

            <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
            ${userData ? html`<article class="create-comment">
                <label>Add new comment:</label>
                <form @submit=${addComment} class="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>
            </article> `
            : null}
            

        </section>
`;

const commentCard = (comment) => html`
<li class="comment">
    <p>Content: ${comment.comment}</p>
</li>
`;


export async function detailsPage(context) {
    const game = await getGameDetailsById(context.params.id)
    const comments = await loadAllComments(game._id)

    const userData = getUserData()
    const isOwner = userData && game._ownerId == userData.id

    context.render(detailsTemplate(userData, game, isOwner, comments, onDelete, addComment))

    async function onDelete(ev) {
        ev.preventDefault()

        const choice = confirm('Are you sure you want to DELETE this game?')

        if (choice) {
                    await deleteGameById(context.params.id)
                    context.page.redirect('/') 
        }

    }

    async function addComment(ev) {
        ev.preventDefault()

        const formData = new FormData(ev.target)

        const comment = formData.get('comment')

        await createNewComment(context.params.id, comment)
        context.page.redirect(`/details/${context.params.id}`)


    }

}