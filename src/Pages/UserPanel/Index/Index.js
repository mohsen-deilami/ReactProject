import React, { useContext } from "react";
import AuthContext from "../../../Context/authContetxt";
import IndexBox from "../../../Components/UserPanel/IndexBox/IndexBox";

export default function Index() {
  const authContext = useContext(AuthContext);
 
  return (
    <div className="col-9">
      <div className="main">
        <div className="main__title">
          {authContext.userInfos && (
            <span className="main__title-text">
              Hello {""}
              <span className="main__title-name">{authContext.userInfos.name}</span>
              ،Welcome to the user panel
               you came
            </span>
          )}
        </div>
        <p className="main__desc">Through your account counter, you can view your recent orders
           View, manage your shipping and billing addresses and account details
           Edit your username and password.     </p>
        <div className="main__links">
          <div className="row">
            <IndexBox title="Orders" href="orders" />
            <IndexBox title="Purchased Courses" href="buyed" />
            <IndexBox title="   My wallet" href="money" />
            <IndexBox title="Account details  " href="infos" />
            <IndexBox title="   Support tickets " href="ticket" />
          </div>
        </div>
      </div>
    </div>
  );
}
