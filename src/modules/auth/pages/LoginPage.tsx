import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoginCard from "../components/LoginCard.component";
import { useTranslation } from "react-i18next";
import { connect, useSelector } from "react-redux";

const LoginPage = (loginStateData) => {

  const history = useHistory();

  const { t } = useTranslation();
  const localizeStateData = useSelector((state: any) => state.localizeState);

  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-8 right-item login-col">
                <div className="card">
                  <div className="card-body login-card-body">
                    <h2>
                      {t(
                        localizeStateData?.data?.commonItem?.projectTitleCapital
                      )}
                    </h2>
                    <p>
                      {t(
                        localizeStateData?.data?.commonItem?.applicationVersion
                      )}
                    </p>
                    <LoginCard />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 bottom-item" id="footer">
                <div className="login-footer">
                  <div className="footer-copyright">
                    <p>{t(localizeStateData?.data?.commonFooter?.copyRightAreRes)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state: any) => {
  return {
    loginStateData: state?.loginStateData,
  };
};
export default connect(mapStateToProps)(LoginPage);
