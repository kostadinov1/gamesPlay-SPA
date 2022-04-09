// here are the requirests
import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllGames() {
    return api.get('/data/games?sortBy=_createdOn%20desc')
}

export async function getNewGames() {
    return api.get('/data/games?sortBy=_createdOn%20desc&distinct=category')
}

export async function createNewGame(game) {
    return api.post('/data/games', game)
}


export async function getGameDetailsById(gameId) {
    return api.get('/data/games/' + gameId)
}


export async function editGameById(gameId, game) {
    return api.put('/data/games/' + gameId, game)
}


export async function deleteGameById(gameId) {
    return api.del('/data/games/' + gameId)
}


export async function loadAllComments(gameId){
    return api.get(`/data/comments?where=gameId%3D%22${gameId}%22`)
}

export async function createNewComment(gameId, comment) {
    return api.post('/data/comments',{ gameId, comment})
}