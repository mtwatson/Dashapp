import { ValidationError } from 'yup';

/**
 * Convert yup error into an error object where the keys are the fields and the values are the errors for that field
 * @param {ValidationError} err The yup error to convert
 * @returns {ErrorObject} The error object
 */
export function YupVerboseError(err){
    const object = {};

    err.inner.forEach((x) => {
        if (x.path !== undefined) {
            object[x.path] = x.errors;
        }
    });

    return object;
}