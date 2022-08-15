import React, { useState } from "react";

import NannyForm from "../loginForm/nannyForm";
import CustomerForm from "../loginForm/customerForm";

import { LOGIN_FORM } from "../../../content/form";
import "./index.css";
import CONSTANTS from "../../../constants";

interface IProps {
  content?: string;
  handleOnLogin?: () => void;
  changeForm: (e: string) => void;
}

const ModalContent = (props: IProps) => {
  const handleOnLogin = () => {};

  const { content, changeForm } = props;

  const disclaimContent = CONSTANTS.DISCLAIM_CONTENT;
  const [isFirstTabSelected, setIsFirstTabSelected] = useState(true);

  const tableHeadData = disclaimContent.cookieTableHeader;
  const th = tableHeadData.map((head, index) => <th key={index}>{head}</th>);
  const tb = disclaimContent.cookieUsageTable;
  const tBody = tb.map((data, index) => (
    <tr key={index}>
      <td>{Object.keys(data)}</td>
      <td>{Object.values(data)}</td>
    </tr>
  ));

  return (
    <>
      {content === "dis" ? (
        <div>
          {disclaimContent.content}
          <div>
            <h2>{disclaimContent.cookieTitle}</h2>
            <div>{disclaimContent.cookieDetail}</div>
          </div>
          <div>
            <table>
              <thead>
                <tr>{th}</tr>
              </thead>
              <tbody>{tBody}</tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          <div className={"modal-content-tabs"}>
            <div
              onClick={() => setIsFirstTabSelected(true)}
              className={
                isFirstTabSelected
                  ? "modal-content-tab-selected"
                  : "modal-content-tab"
              }
            >
              {LOGIN_FORM.NANNY_TAB}
            </div>
            <div
              onClick={() => setIsFirstTabSelected(false)}
              className={
                isFirstTabSelected
                  ? "modal-content-tab"
                  : "modal-content-tab-selected"
              }
            >
              {LOGIN_FORM.CUSTOMER_TAB}
            </div>
          </div>
          <div className={"modal-content-form"}>
            {isFirstTabSelected ? (
              <NannyForm
                handleOnLogin={() => handleOnLogin}
                changeForm={changeForm}
              />
            ) : (
              <CustomerForm
                handleOnLogin={() => handleOnLogin}
                changeForm={changeForm}
              />
            )}
          </div>{" "}
        </>
      )}
    </>
  );
};

export default ModalContent;
