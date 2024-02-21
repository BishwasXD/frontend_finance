import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";

import "../styles/UserForm.css";

const UserForm = () => {
  const [response, setResponse] = useState();
  const [isSignup, setSignUp] = useState(true);

  interface InitialValues {
    email: string;
    password: string;
    confirm_password: string;
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
       confirm_password: "",
    } as InitialValues,

    validate: (values) => {
      const errors = {} as InitialValues;

      // Email Validation
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      // Password validation
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
      }

      // Confirm_password validation
      if(isSignup){
      if (!values.confirm_password) {
        errors.confirm_password = "Confirm Password is required";
      } else if (values.confirm_password !== values.password) {
        errors.confirm_password = "Passwords do not match";
      }
    }
      return errors;
    },

    onSubmit: async (values, {resetForm}) => {
    
   
    const signupUrl ="http://127.0.0.1:8000/accounts/register"
    const loginUrl = "http://127.0.0.1:8000/accounts/login"
   
      try {
        const response = await axios.post(isSignup ? signupUrl : loginUrl , values);
        console.log(response.data.token)
        setResponse(response.data.message);
        resetForm()
      } catch (error) {
        setResponse(error.response.data.message);
      }
    },
  });

  return (
    <div id="form-container">
      <div id="reponse-from-server">{response}</div>
      <form onSubmit={formik.handleSubmit} id="user-form">
        {
            isSignup ?(
              <div className="sign-log" style={{ width: '70px' }}>SignUp</div>
            )
            : (
                <div className="sign-log" >Login</div>
            )
        }
        <input
          type="text"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="Email"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error">{formik.errors.email}</div>
        )}

        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Password"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="error">{formik.errors.password}</div>
        )}

        {isSignup && (
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirm_password}
            placeholder="Confirm Password"
          />
        )}
        {formik.touched.confirm_password &&
          formik.errors.confirm_password &&
          isSignup && (
            <div className="error">{formik.errors.confirm_password}</div>
          )}

        
        {
            isSignup ? (
                <button type="submit">SignUp</button>
            ):(
                <button type="submit">Login</button>
            )
        }
        {isSignup ? (
          <div id="change-opt">
            Already have an account?
            <a onClick={() => setSignUp(false)}>Login</a>
          </div>
        ) : (
          <div id="change-opt">
            Don't have an account?
            <a onClick={() => setSignUp(true)}>Sign Up</a>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserForm;
