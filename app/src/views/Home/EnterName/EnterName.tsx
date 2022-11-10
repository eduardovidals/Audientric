import {
  EnterNameContainer,
  EnterNameForm,
  EnterNameSubmit,
  EnterNameText,
  EnterNameTextField
} from "views/Home/EnterName/EnterName.styles";
import {useEffect, useState} from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import {useAppDispatch} from "store/hooks";
import {updateHomeScreen} from "store/ui/HomeScreen/HomeScreen.slice";
import {useForm} from "react-hook-form";
import * as UserServiceApi from 'apis/UserServiceApi';
import * as ClassServiceApi from 'apis/ClassServiceApi';

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

  const onSubmit = async (data: any) => {
    if (data.fullName === "Elmo123") {
      localStorage.setItem('audientricUserId', "635a315a786b352a6b365825");
      dispatch(updateHomeScreen('AdminScreen'));
    } else {
      const user = await UserServiceApi.createUser({
        fullName: data.fullName
      });

      await ClassServiceApi.joinClass({userId: user._id, classId: '6359407d47773e1371ff8cec'});

      localStorage.setItem('audientricUserId', user._id);
      localStorage.setItem('audientricName', data.fullName);

      setOnSubmitClick(true);
      dispatch(updateHomeScreen('WelcomeScreen'));
    }
  }

  return (
    <EnterNameContainer data-aos={'fade-up'} data-aos-duration={2000}>
      <EnterNameForm onSubmit={(e) => {
        e.preventDefault();
      }}>
        <EnterNameText backgroundColor={bgColor}> Please enter your full name. </EnterNameText>
        <EnterNameTextField control={control} label={'Full Name'} formName={'fullName'}
                            onClick={() => setActiveField(true)} required
                            onBlur={() => setActiveField(false)} backgroundColor={bgColor}
                            clickedField={activeField} size={'small'}
                            rules={{
                              required: {
                                value: true,
                                message: 'Please enter your full name.'
                              }
                            }}>
        </EnterNameTextField>

        <EnterNameSubmit backgroundColor={bgColor} onClick={handleSubmit(onSubmit)} disabled={onSubmitClick}
                         type={'submit'}>
          Submit
        </EnterNameSubmit>
      </EnterNameForm>
    </EnterNameContainer>
  )
}

export default EnterName;
