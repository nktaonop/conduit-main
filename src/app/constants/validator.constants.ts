export const emailValidator = {
    required: {
        value: true,
        message: 'this field is required'
    },
    pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Entered value does not match email format"
    }
}

export const simpleControlValidator = {
    required: {
        value: true,
        message: 'this field is required'
    }
}
