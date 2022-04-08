import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, EventHandler, useContext, useState } from "react";
import {
  ChangeHandler,
  Control,
  Controller,
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

/**
 * Generic `<input>` element for the app, able of
 * suppor `<textarea>` and `<select>` elements; also
 * handling `react-hook-form` and its error message.
 * This input can take the form of all types of inputs
 * in html, between other things.
 *
 * TODO: fix bug: when an error appear in two adjacent
 * fields, and on of them is fixed, this grows.
 *
 * @param props - Contains all the possible configuration
 * to the input element.
 *
 * @param toBeEdited - Allows the field to be editable.
 *
 * @param setOnEditing - Callback to set the
 * `editing` state as true.
 *
 * */
export default function Input(props: {
  children?: React.ReactNode;
  name?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  errorCondition?: FieldError;
  errorText?: string;
  onChange?: ChangeEventHandler | ((e: HTMLSelectElement) => void) | Function;
  label?: string;
  type?:
    | "textarea"
    | "select"
    | "react-select"
    | "checkbox"
    | "datalist"
    | "date"
    | "number"
    | "radio"
    | "password"
    | "text"
    | "month"
    | "time";
  reactSelectOptions?:
    | { label: string; value: string | number | boolean }[]
    | undefined;
  isReactSelectSearchable?: boolean;
  isReactSelectCreatable?: boolean;
  reactSelectRequired?: boolean;
  formControl?: unknown;
  defaultValue?: string | number | undefined;
  defaultChecked?: boolean;
  sizeText?: "xs" | "sm" | "base" | "lg" | "xl";
  className?: string;
  classNameInput?: string;
  readOnly?: boolean;
  disabled?: boolean;
  value?: string;
  toBeEdited?: boolean;
  setOnEditing?: Function;
  step?: string;
}) {
  const [isReadOnly, setIsReadOnly] = useState(props.readOnly === true);
  const sizeText = props.sizeText || "sm";

  let className = `max-w-full bg-white focus:border text-${sizeText} text-gray-800 rounded flex-srink flex-auto ${
    props.type === "checkbox" && "w-5 h-5"
  } ${props.classNameInput}`;

  if (props.type !== "react-select")
    className += " border-2 border-gray-300 p-1";

  let propsInput: { [input: string]: unknown } = {
    name: props.name || undefined,
    className,
    placeholder: props.placeholder || undefined,
    disabled: props.disabled,
    value: props.value,
    step: props.step,
    defaultValue: props.defaultValue,
    readOnly: props.readOnly,
    ...(props.register || undefined),
  };

  if (props.onChange) propsInput.onChange = props.onChange as ChangeHandler;
  if (props.readOnly)
    propsInput.onClick = (e: React.MouseEvent) => {
      e.preventDefault();
    };

  function getInputElement() {
    /* console.log('insideInput is readonly::', props.readOnly)
     * console.log('insideInput is ISREADONLY::', isReadOnly) */

    return props.type === "textarea" ? (
      <textarea {...propsInput} />
    ) : props.type === "react-select" ? (
      props.formControl ? (
        <Controller
          control={props.formControl as Control}
          name={props.name || ""}
          rules={{ required: props.reactSelectRequired }}
          render={({ field }) =>
            props.isReactSelectCreatable ? (
              <div
                className={`w-full ${
                  props.readOnly ? "pointer-events-none" : "pointer-events-auto"
                }`}
              >
                <CreatableSelect
                  {...field}
                  value={props.reactSelectOptions?.find(
                    (o) => o?.value === field.value
                  )}
                  onChange={(val) => field.onChange(val?.value)}
                  placeholder="Seleccione..."
                  className={className}
                  options={props.reactSelectOptions}
                  isSearchable={
                    !props.readOnly && Boolean(props.isReactSelectSearchable)
                  }
                  formatCreateLabel={(inputValue) => (
                    <span>Añadir "{inputValue}"</span>
                  )}
                  isDisabled={props.disabled}
                  style={{ pointerEvents: isReadOnly ? "none" : "auto" }}
                />
              </div>
            ) : (
              <div
                className={`w-full ${
                  props.readOnly ? "pointer-events-none" : "pointer-events-auto"
                }`}
              >
                <Select
                  {...field}
                  value={props.reactSelectOptions?.find(
                    (o) => o?.value === field.value
                  )}
                  onChange={(val) => field.onChange(val?.value)}
                  placeholder="Seleccione..."
                  className={className}
                  options={props.reactSelectOptions}
                  isSearchable={
                    !props.readOnly && Boolean(props.isReactSelectSearchable)
                  }
                  isDisabled={props.disabled}
                />
              </div>
            )
          }
        />
      ) : (
        <div
          className={`w-full ${
            props.readOnly ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          <Select
            placeholder="Seleccione..."
            onChange={props.onChange as any}
            className={className}
            options={props.reactSelectOptions}
            isSearchable={Boolean(props.isReactSelectSearchable)}
            isDisabled={props.disabled}
          />
        </div>
      )
    ) : props.type === "select" ? (
      <select {...propsInput}> {props.children}</select>
    ) : props.type === "datalist" ? (
      <>
        <input
          {...propsInput}
          list={props.name || props.label}
          onClick={(e) => {
            // cleaning on clean
            if (!props.readOnly) e.currentTarget.value = "";
          }}
        />
        <datalist id={props.name || props.label}>{props.children}</datalist>
      </>
    ) : (
      <input
        type={props.type || "text"}
        {...propsInput}
        defaultChecked={props.defaultChecked}
      />
    );
  }

  let input = (
    <>
      <div
        className="flex gap-4 items-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {getInputElement()}
        {props.toBeEdited && (
          <FontAwesomeIcon
            className="mr-2 text-xl text-gray-600 hover:text-black cursor-pointer"
            icon="edit"
            onClick={(e) => {
              setIsReadOnly(false);
              if (props.setOnEditing !== undefined) props.setOnEditing(true);
            }}
          />
        )}
      </div>

      <span className={`text-red-500`}>
        {props.errorCondition !== undefined &&
          props.errorCondition &&
          (props.errorText !== undefined
            ? props.errorText
            : "Campo obligatorio")}
      </span>
    </>
  );

  if (props.label === undefined) {
    return <div className={`${props.className}`}>{input}</div>;
  } else {
    return (
      <label
        className={` flex ${
          props.type !== "checkbox" ? "flex-col" : "items-center"
        } ${props.className}`}
      >
        <span className={`${props.type === "checkbox" ? "mr-2" : ""} text-sm`}>
          {props.label}
        </span>
        {input}
      </label>
    );
  }
}
