import {
  EnterNameContainer, EnterNameForm,
  EnterNameSubmit,
  EnterNameText,
  EnterNameTextField
} from "views/Home/EnterName/EnterName.styles";
import {useEffect, useState} from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import {useAppDispatch} from "store/hooks";
import {updateHomeScreen} from "store/ui/HomeScreen/HomeScreen.slice";
import {Controller, useForm} from "react-hook-form";
import * as UserServiceApi from 'apis/UserServiceApi';
import {createUser} from "apis/UserServiceApi";

interface EnterNameProps {
  bgColor: string
}

function EnterName(props: EnterNameProps) {
  const {bgColor} = props;
  const [activeField, setActiveField] = useState(false);
  const [onSubmitClick, setOnSubmitClick] = useState(false);

  const dispatch = useAppDispatch();
  const {handleSubmit, reset, control} = useForm({mode: 'onChange'});

  useEffect(() => {
    Aos.init();
  }, [])

  const onSubmit = async (data:any) => {
    console.log(data);
    const user = await UserServiceApi.createUser({
      fullName: data.fullName
    });
    setOnSubmitClick(true);
    dispatch(updateHomeScreen('WelcomeScreen'));
  }

  return (
    <EnterNameContainer data-aos={'fade-up'} data-aos-duration={2000}>
      <EnterNameForm>
        <EnterNameText backgroundColor={bgColor}> Please enter your full name. </EnterNameText>
        <Controller name={'fullName'} control={control} defaultValue={""}
                    rules={{
                      required: {
                        value: true,
                        message: 'Please enter your full name.'
                      }
                    }} render={({field: {onChange, value}, fieldState: {error}}) => (
          <EnterNameTextField onChange={onChange} value={value} backgroundColor={bgColor} required label="Full Name"
                              clickedField={activeField} size={'small'} error={!!error}
                              helperText={error ? error.message : ''}
                              onClick={() => setActiveField(true)} onBlur={() => setActiveField(false)}/>
        )}/>

        <EnterNameSubmit backgroundColor={bgColor} onClick={handleSubmit(onSubmit)} disabled={onSubmitClick}>
          Submit
        </EnterNameSubmit>
      </EnterNameForm>
    </EnterNameContainer>
  )
}

export default EnterName;
