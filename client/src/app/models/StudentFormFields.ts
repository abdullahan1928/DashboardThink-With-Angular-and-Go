export interface IStudent {
    name: string;
    email: string;
    password: string;
    phone: string;
    admissionDate: Date;
}

const StudentFormFields = [
    {
        type: 'text',
        placeholder: 'Enter student Name',
        formControlName: 'name',
        hint: 'Required. Max 20 characters allowed.',
        errors: [
            {
                name: 'required',
                message: 'Name is required',
            },
            {
                name: 'maxlength',
                message: 'Max 20 characters allowed',
            },
            {
                name: 'minlength',
                message: 'Min 3 characters required',
            },
            {
                name: 'pattern',
                message: 'Only alphabets allowed',
            },
        ],
    },
    {
        type: 'email',
        placeholder: 'Enter student Email',
        formControlName: 'email',
        hint: 'Required. Must be a valid email.',
        errors: [
            {
                name: 'required',
                message: 'Email is required',
            },
            {
                name: 'email',
                message: 'Must be a valid email',
            },
        ],
    },
    {
        type: 'tel',
        placeholder: 'Enter student Phone No.',
        formControlName: 'phone',
        hint: 'Enter 11-digit phone no.',
        errors: [
            {
                name: 'required',
                message: 'Phone no. is required',
            },
            {
                name: 'pattern',
                message: 'Only numbers allowed',
            },
            {
                name: 'minlength',
                message: 'Min 11 characters required',
            },
            {
                name: 'maxlength',
                message: 'Max 11 characters allowed',
            },
        ],
    },
    {
        type: 'password',
        placeholder: 'Enter student Password',
        formControlName: 'password',
        hint: 'Required. Min 8 characters allowed.',
        errors: [
            {
                name: 'required',
                message: 'Password is required',
            },
            {
                name: 'pattern',
                message: 'Enter a valid password',
            },
            {
                name: 'minlength',
                message: 'Min 8 characters required',
            },
            {
                name: 'maxlength',
                message: 'Max 20 characters allowed',
            },
        ],
    },
]

export default StudentFormFields