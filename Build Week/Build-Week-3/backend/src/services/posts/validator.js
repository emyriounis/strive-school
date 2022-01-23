import { checkSchema } from 'express-validator'

export const postBodyValidator = checkSchema({
    text: { in: ['body'],
        isLength: {
            options: { min: 1 },
            errorMessage: 'Insert a text'
        }
    },

})

export const experienceBodyValidator = checkSchema({

})

export const userBodyValidator = checkSchema({

})