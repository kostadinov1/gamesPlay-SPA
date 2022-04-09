import { getAllGames } from "../api/data.js";
import { html, render } from "../lib.js";


const catalogueTemplate = (allGames) => html`

        <!-- Catalogue -->
        <section id="catalog-page">
            <h1>All Games</h1>
                ${allGames.length == 0 ? html`<h3 class="no-articles">No articles yet</h3>`
                : allGames.map(gameCard)}

            
        </section>
`;

const gameCard = (game) => html`
<div class="allGames">
    <div class="allGames-info">
        <img src="${game.imageUrl}">
        <h6>${game.category}</h6>
        <h2>${game.title}</h2>
        <a href="/details/${game._id}" class="details-button">Details</a>
    </div>
</div>
`;


export async function cataloguePage(context) {

    const allGames = await getAllGames()

    context.render(catalogueTemplate(allGames))
}