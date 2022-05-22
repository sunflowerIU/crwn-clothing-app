import { FormInputLabel, Input, Group } from "./form-input.styles";

const InputForm = ({ label, ...otherInputProps }) => {
  return (
    <Group>
      <Input  {...otherInputProps} />
      {label && (
        <FormInputLabel shrink={otherInputProps.value.length ? true : false}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default InputForm;
