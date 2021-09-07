import { Field, Form, Formik, FormikProvider, useFormik } from "formik";
import React,{useEffect}from "react";
import {  useSelector , useDispatch} from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import ErrorMessageShow from "../../../components/utilComponent/ErrorMessage.component";
import { registerAction } from "../redux/register/register.actions";
import { REGEX } from "../../../utils/helpers/regex";
import { ToastContainer, toast } from 'react-toastify';

const RegisterCard = () => {
  
  const registerStateData = useSelector((state: any) => state.registerState);
  const loginStateData = useSelector((state: any) => state.loginState);
 
  const history = useHistory();
  const dispatch = useDispatch();

  if (registerStateData?.data?.isSuccess === true) {
    history.push("/login");
  }
  
  useEffect(() => {
    if (loginStateData?.data?.isSuccess === true) {
      history.push("/");
    }
  }, [loginStateData?.data?.isSuccess])

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };
   
  const onSubmit = async (values: any) => {
    delete values?.confirm_password;
    await dispatch(registerAction(values));
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, "Full Name must be at least 6 characters")
      .max(20, "Full Name must be at most 20 characters")
      .required("Enter full name"),
    email: Yup.string()
      .matches(REGEX.EMAIL_REGEX, "Email is not valid")
      .required("Enter email address"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Enter password"),
    confirm_password: Yup.string()
      .when("password", {
        is: (val: any) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      })
      .required("Enter confirm password"),
  });
  
  const formik = useFormik({ initialValues, onSubmit, validationSchema });

  return (
    <FormikProvider value={formik}>
      <>
        <div className="register-card-content">
          <ToastContainer/>
            <h3>
              Create You Account!
            </h3>
            <Form>
              <div className="input-group mb-3">
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user"></span>
                  </div>
                </div>
                <Field
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name"
                />
              </div>
              <ErrorMessageShow formik={formik} name="name" />

              <div className="input-group mb-3">
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email Address"
                />
              </div>
              <ErrorMessageShow formik={formik} name="email" />

              <div className="input-group mb-3">
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
                <Field
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <ErrorMessageShow formik={formik} name="password" />

              <div className="input-group mb-3">
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
                <Field
                  type="password"
                  className="form-control"
                  name="confirm_password"
                  placeholder="Confirm Password"
                />
              </div>
              <ErrorMessageShow formik={formik} name="confirm_password" />

              <div className="mb-1 login-submit register">
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-custom-hover"
                >
                 Register
                </button>
              </div>
            </Form>
            <h3 className="login-signup">
              Already have an account?
              <span className="login-signup-link">
                <Link to="/login">
                  Login
                </Link>
              </span>
            </h3>
          </div>
      </>
    </FormikProvider>
  );
};

export default RegisterCard;
