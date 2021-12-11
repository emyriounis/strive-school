import { checkSchema, validationResult } from "express-validator";

const schema = {
    comment: {
        in: ["body"],
        isString: {
            errorMessage: "Content validation failed, type must be string.",
        },
    },
    rate: {
        in: ["body"],
        isNumeric: {
            errorMessage: "Rating validation failed, type must be number.",
        },
    },
    productId: {
        in: ["body"],
        isString: {
            errorMessage: "Product ID validation failed, type must be string.",
        },
    },
};

export const checkReviewSchema = checkSchema(schema);

export const checkValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Review post validation has failed.");
        error.status = 400;
        error.errors = errors.array();
        next(error);
    }
    next();
};