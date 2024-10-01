import { object, string, date } from 'yup';
import { differenceInYears } from 'date-fns';
export const loginSchema = object().shape({
        email: string().email('Invalid email').required('Email is required'),
        password:string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters').max(20, 'Password must be at most 20 characters')
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
                /[!@#$%^&*(),.?":{}|<>]/,
                "Password must contain at least one special character",
              )
});

export const registerSchema = object().shape({
        firstName:string().required('First name is required'),
        secondName:string().optional(),
        gender:string().required('Gender is required'),
        dob:date()
        .required('Date of birth is required')
        .test(
          'is-over-18',
          'You must be at least 18 years old',
          function (value) {
            return differenceInYears(new Date(), new Date(value)) >= 18;
          }
        ),
        email: string().email('Invalid email').required('Email is required'),
        password:string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters').max(20, 'Password must be at most 20 characters')
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
                /[!@#$%^&*(),.?":{}|<>]/,
                "Password must contain at least one special character",
              )
})