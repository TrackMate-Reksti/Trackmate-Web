import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";

interface DropdownProps {
  isMulti: boolean;
  tipe: string;
  placeholder: string;
  onChange?:
    | ((
        newValue:
          | MultiValue<{ value: string; label: string }>
          | SingleValue<{ value: string; label: string }>,
        actionMeta: ActionMeta<{ value: string; label: string }>
      ) => void)
    | undefined;
  value?: { value: string; label: string };
  options: any;
  required?: boolean;
}

const Dropdown = ({
  isMulti,
  tipe,
  placeholder,
  onChange,
  options,
  value,
  required,
}: DropdownProps) => {
  return tipe == "hollow" ? (
    <Select
      defaultValue={value}
      isMulti={isMulti}
      required={required}
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      isSearchable={true}
      theme={(theme) => ({
        ...theme,
        borderRadius: 10,
        border: 0,
        colors: {
          ...theme.colors,
          primary: "#8057D9",
        },
      })}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "rgba(246, 243, 253, 0.00)",
          border: state.isFocused ? 0 : 0,
          boxShadow: state.isFocused ? "0px" : "0px",
          "&:hover": {
            border: state.isFocused ? 0 : 0,
          },
        }),
        container: (base) => ({
          ...base,
          width: "fit-content",
        }),
        valueContainer: (base) => ({
          ...base,
          background: "rgba(246, 243, 253, 0.00)",
          color: "#363062",
          width: "100%",
          padding: 0,
          alignItems: "center",
        }),
        singleValue: (base) => ({
          ...base,
          background: "rgba(246, 243, 253, 0.00)",
          color: "#363062",
          width: "100%",
          height: "fit-content",
        }),
        input: (base) => ({
          ...base,
          background: "rgba(246, 243, 253, 0.00)",
          color: "#363062",
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 0,
          marginBottom: 0,
        }),
        indicatorSeparator: (base) => ({
          ...base,
          display: "none",
        }),
      }}
    />
  ) : (
    <Select
      defaultValue={value}
      required={required}
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      isMulti={isMulti}
      isSearchable={true}
      theme={(theme) => ({
        ...theme,
        borderRadius: 10,
        border: 2,

        colors: {
          ...theme.colors,
          primary: "#8057D9",
        },
      })}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: state.isFocused ? "" : "2px solid #6B6B6B",
          "&:hover": {
            borderColor: state.isFocused ? "#8057D9" : "#8057D9",
          },
        }),
      }}
    />
  );
};

export default Dropdown;
