'use client';

type ErrorMessage = {
    errors: any;
    field: string;
}

const Error = ({errors, field}: ErrorMessage) => {
    return <span className="error-message">{errors[field] && errors[field].message}</span>
}

export default Error;
