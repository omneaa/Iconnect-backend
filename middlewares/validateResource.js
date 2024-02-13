const customErrorResponse = (zodError) => {
	const errorDetails = {};
    zodError.errors.forEach((error) => {
        const fieldName = error.path[error.path.length - 1];
        errorDetails[fieldName] = {
            name: 'ValidatorError',
            message: error.message,
            type: error.validation,
            path: fieldName,
        };
    });

    return {
        message: 'Validation failed',
        data: errorDetails,
    };
};
const validate = (schema) => (req, res, next) => {
	try {
		schema.parse({
			body: req.body,
			query: req.query,
			params: req.params,
		});
		next();
	} catch (e) {
		const formattedError = customErrorResponse(e);
		return res.status(400).send(formattedError);
	}
};

module.exports = validate;
