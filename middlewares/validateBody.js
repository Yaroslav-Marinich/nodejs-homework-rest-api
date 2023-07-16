const { HttpError } = require("../helpers/HttpError");

const validateBody = (schema) => {
  return (res, _, next) => {
    const validatedData = schema.validate(res.body, { convert: false });
    const { error } = validatedData;

    if (error) {
      next(new HttpError(400, error.message));
    }

    next();
  };
};

module.exports = validateBody;
