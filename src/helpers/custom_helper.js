// This is the literal CRUD HTTP methods.
import { post, del, get, put } from "./api_helper"

// These are the routes e.g. const POST_FAKE_LOGIN = "/post-fake-login"
import * as url from "./url_helper"

// AUTH METHODS ------------------------------------------------------------
export const postCustomLogin = async ({ email, password }) => {
    // Use API method to get all users.
    const users = await get(url.CUSTOM_GET_USERS);
    console.log("Users: ", users);

    // Check if user exists and then if valid. If not, throws Error and updates store.
    const foundUser = users.find(usr => usr.email === email)

    if (!foundUser) {
        throw new Error("User not found for email.");
    }

    const userValid = foundUser.password === password;

    if (!userValid) {
        throw new Error("Password is incorrect.");
    }

    // If found, it then sets user to localStorage and updates store.    
    return foundUser;
}