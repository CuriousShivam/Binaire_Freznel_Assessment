import {v4 as uuidv4} from 'uuid';
import dataGroup from "../core/QueueManager.js";

// Initialize User
const initUser = async (req, res) => {

    // Check if the frontend sent a cookie

    // Return success response
    return res.status(200).json({
        success: true,
        message: req?.isNewUser ? 'New user registered' : 'Existing user recognized',
        userId:  req?.userId
    });
}

function ensureUserSession(req, res, next) {
    // Extract or create user id
    console.log('ensuring user session');
    let userId = req.cookies.userId || req.headers['x-user-id'];
    let isNewUser = false;

    if (!userId || !dataGroup.hasUser(userId)) {
        userId = uuidv4();
        dataGroup.registerUser(userId);
        isNewUser = true;
        res.cookie('userId', userId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 365 * 24 * 60 * 60 * 1000
        });

        res.set({
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
        });
    }

    req.userId = userId;
    req.isNewUser = isNewUser;

    next();
}

export {initUser, ensureUserSession};