import { ErrorMessage, Field, Form, Formik, FormikProvider, useFormik } from "formik";
import React,{useEffect}from "react";
import { useTranslation } from "react-i18next";
import { connect, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import Loading from "../../../components/Loading/Loading.component";
import { RegisterTypes } from "../redux/register/register.types";
import { loginAction } from "../redux/login/login.actions";
import ErrorMessageShow from "../../../components/utilComponent/ErrorMessage.component";
import { ToastContainer, toast } from 'react-toastify';

const LoginCard = ({
  loginAction,
  loginStateData,
}: any) => {

  const history = useHistory();

  //! Design Code Start
  const script = document.createElement("script");
  script.src = "/js/alertDisapear.js";
  script.async = true;
  document.body.appendChild(script);
  //! Design Code End

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Enter email"),
    password: Yup.string().required("Enter password"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: any) => {
    await loginAction(values);
  };
  
  useEffect(() => {
    if (loginStateData?.data?.isSuccess === true) {
      history.push("/");
    }
  }, [loginStateData?.data?.isSuccess])

  const formik = useFormik({ initialValues, onSubmit, validationSchema });

  return (
    <FormikProvider value={formik}>
      {loginStateData?.loading ? (
        <Loading />
      ) : (
        <div className="login-card-content">

          <ToastContainer/>

          <h3>
           Login Panel
          </h3>
          <Form>
            <div className="input-group mb-3">
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope"></span>
                </div>
              </div>
              <Field
                type="text"
                className="form-control"
                name="email"
                placeholder="Email"
              />
            </div>
            <ErrorMessageShow formik={formik} name="email" />
            <div className="input-group mb-3">
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
              <Field
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <ErrorMessageShow formik={formik} name="password" />
            <div className="row">
              <div className="col-12 forgot-password">
                <Link to="/forget-password">
                  Forgot Password
                </Link>
              </div>
            </div>
            <div className="mb-1 login-submit">
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </div>
          </Form>
          <h3 className="login-signup">
            Already have an account?
            <span className="login-signup-link">
              <Link to="/register">
               Register
              </Link>
            </span>
          </h3>
        </div>
      )}
    </FormikProvider>
  );
};

const mapStateToProps = (state: any) => {
  return {
    loginStateData: state?.loginState
  };
};

export default connect(mapStateToProps, { loginAction })(LoginCard);
