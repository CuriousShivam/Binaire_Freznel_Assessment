// responseStructure.js

export default function responseStructure(req, res, next) {
    //Standard 2xx/3xx Success Handler
    res.ok = (message = 'Success', data = {}, statusCode = 200) => {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    };

    //Standard 4xx/5xx Operational Error Handler
    res.error = (message = 'An unexpected error occurred', statusCode = 500, errors = null) => {
        return res.status(statusCode).json({
            success: false,
            message,
            ...(errors && {errors}), // Appends validation matrices if they exist
        });
    };

    next();
}
