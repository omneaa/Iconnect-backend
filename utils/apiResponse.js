class ApiResponse {
    constructor(data, statusCode, message) {
        this.data = data;
        this.status = statusCode;
        this.message = message;
    }

    toJsonResponse(res) {
        return res.status(this.status).json({ message: this.message, data: this.data,  });
    }

    static success(res, data, status=200, message = 'Operation successful') {
        return new ApiResponse(data, status, message).toJsonResponse(res);
    }

    static send(res, status=204) {
        return res.status(status).send();
    }

    static error(res, status=500, message = 'Internal Server Error') {
        return new ApiResponse(null, status, message).toJsonResponse(res);
    }
}

module.exports = ApiResponse;


