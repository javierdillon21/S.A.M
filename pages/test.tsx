import React from "react";
import Input from "../components/input";
import { GetFormatedDate } from "../src/utils/date";

export default function Test() {
  return (
    <div>
      <Input type="select">
        <optgroup label="JUDA">
          <option>Sembrador|Semillero</option>
        </optgroup>
      </Input>
      <span> {GetFormatedDate()}</span>
    </div>
  );
}
