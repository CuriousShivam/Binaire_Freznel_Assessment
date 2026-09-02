import {v4 as uuidv4} from 'uuid';
import dataGroup from "../core/QueueManager.js";

// Initialize User
const initUser = async (req, res) => {

    // 1. Check if the frontend sent a cookie
    let userId = req.cookies.userId;
    let isNewUser = false;

    // 2. If no cookie, OR the user isn't in our active memory, enroll them
    if (!userId || !dataGroup.hasUser(userId)) {
        userId = uuidv4();
        dataGroup.registerUser(userId);
        isNewUser = true;
    }

    // 3. Send the cookie back to the frontend
    res.cookie('userId', userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 365 * 24 * 60 * 60 * 1000 // Expires in 1 year
    });
    res.set({
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate', 'Pragma': 'no-cache', 'Expires': '0',
    });

    // 4. Return success response
    return res.status(200).json({
        success: true,
        message: isNewUser ? 'New user registered' : 'Existing user recognized',
        userId: userId
    });
}

export {initUser};