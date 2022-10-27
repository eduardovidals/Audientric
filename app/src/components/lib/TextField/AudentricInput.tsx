import {Controller, UseControllerProps, useForm} from "react-hook-form";
import {convertToCamelCase} from "utils/helpers";
import {TextField, TextFieldProps} from "@mui/material";

type AudentricInputProps = TextFieldProps & {
  label: string,
  formName?: string,
  rules?: UseControllerProps['rules'],
  control?: UseControllerProps['control']
}

function AudentricInput(props: AudentricInputProps) {
  const {formName, rules, label, ...rest} = props;

  const {control} = useForm({mode: 'onChange'});

  return (
    <Controller name={formName ? formName : convertToCamelCase(label)} control={props.control ? props.control : control}
                defaultValue={""} rules={rules} render={({field: {onChange, value}, fieldState: {error}}) => (
      <TextField {...rest} onChange={onChange} value={value} label={label} error={!!error}
                 helperText={error ? error.message : ''}/>
    )}/>
  )
}

export default AudentricInput;
