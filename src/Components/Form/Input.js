/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer } from "react";
import "./Input.css";
import validator from "../../validators/Validator";


const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": {
      return {
        ...state,
        value: action.value,
        isValid: validator(action.value, action.validations),
      
      };
    }
    default: {
      return state;
    }
  }

};

export default function Input(props) {
  const [mainInput, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });
  const { value, isValid } = mainInput;
  const { id , onInputHandler} = props;

  useEffect(() => {
   onInputHandler(id, value, isValid);

  }, [value]);
  
  const onChangeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      value: event.target.value,
      validations: props.validations,
      isValid: true,
    });
   
  };
  const element =
    props.element === "input" ? (
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={`${props.className} ${
          mainInput.isValid ? "sucess" : "error"
        }`}
        value={mainInput.value}
        onChange={onChangeHandler}
      />
    ) : (
      <textarea
        placeholder={props.placeholder}
        className={`${props.className} ${
          mainInput.isValid ? "sucess" : "error"
        }`}
        value={mainInput.value}
        onChange={onChangeHandler}
      />
    );

  return <div>{element}</div>;
}
