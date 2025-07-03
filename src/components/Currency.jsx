import React from "react";
import { Icon } from "../utils/utils";

const Currency = ({ status }) => {
  return <>{status ? <Icon name="e903" /> : <Icon name="e905" />}</>;
};

export default Currency;
