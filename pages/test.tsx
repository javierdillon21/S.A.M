import React from "react";
import Input from "../components/input";

export default function Test() {
  return (
    <div>
      <Input type="select">
        <optgroup label="JUDA">
          <option>Sembrador|Semillero</option>
        </optgroup>
        <option></option>
      </Input>
    </div>
  );
}
