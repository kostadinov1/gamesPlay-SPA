import { getUserData, setUserData, clearUserData} from '../util.js'

const host = 'http://localhost:3030'

async function request(url, options) {
    try {
        const response = await fetch(host + url, options);

        if (response.ok != true) {
            if (response.status == 403) {
                clearUserData();  
            }
        const error = await response.json();
        throw new Error(error.message);   
        }   

        try {
            return await response.json();
        }
        catch (error) {
            return response;
        }
        // if (response.status == 204) {
        //     return response;
        // } else {
        //     return response.json();
        // }
    } catch(err) {
        alert(err.message);
        throw err;
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method, 
        headers: {}
    };
    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData(data);
    if (userData != null) {
        options.headers['X-Authorization'] = userData.token;
    }
    return options;
}


async function get(url) {
    return request(url, createOptions('get'));
}


async function post(url, data) {
    return request(url, createOptions('post', data));
}


async function put(url, data) {
    return request(url, createOptions('put', data))
}


async function del(url) {
    return request(url, createOptions('delete'));
}

async function login(email, password) {
    const response = await post('/users/login', {email, password});
    const userData = {
        email: response.email,
        id: response._id,
        token: response.accessToken
    };
    setUserData(userData);
}

async function register(email, password) {
     const response = await post('/users/register', {email, password});
     const userData = {
         email: response.email,
         id: response._id,
         token: response.accessToken
     };
    setUserData(userData);
}


async function logout() {
    get('/users/logout')
    clearUserData();
}

export {
    get,
    post,
    put, 
    del,
    login,
    logout,
    register,
    
}
