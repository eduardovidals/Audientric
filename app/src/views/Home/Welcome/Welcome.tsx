import Typed from "react-typed";
import Aos from 'aos';
import {useEffect, useState} from "react";
import {
  CurrentlyOnlineText,
  HelloContainer,
  PleaseWaitText,
  WaveEmoji,
  WelcomeContainer,
  WelcomeText
} from "views/Home/Welcome/Welcome.styles";
import * as ClassServiceApi from 'apis/ClassServiceApi'
import Main from "components/layout/Main/Main";
import Loading from "components/common/Loading/Loading";
import openSocket from "socket.io-client";
// @ts-ignore
import Odometer from 'react-odometerjs';
import 'assets/styles/odometer.css';
import {useAppDispatch} from "store/hooks";
import {updateHomeScreen} from "store/ui/HomeScreen/HomeScreen.slice";

function Welcome() {
  const [showWelcomeCursor, setShowWelcomeCursor] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  const createSocketConnection = () => {
    const socket = openSocket(process.env.REACT_APP_API_URL as string);
    socket.on("class event", data => {
      if (data.action === "join") {
        setUsers(prevUsers => [data.user, ...prevUsers]);
      }
    });
  };

  useEffect(() => {
    Aos.init();

    const getUsers = async () => {
      const classObj = await ClassServiceApi.getClassById({classId: '6359407d47773e1371ff8cec'});

      if (classObj.status === "started") {
        dispatch(updateHomeScreen("ActiveClassScreen"));
      }

      setUsers(classObj.users);
      setLoading(false);
    }

    getUsers();
    createSocketConnection();
    console.log(users);
  }, []);

  if (loading) {
    return (
      <Main>
        <Loading/>
      </Main>
    )
  }

  const showWelcomeText = () => {
    if (showWelcomeCursor) {
      return (
        <WelcomeText data-aos={'fade-up'} data-aos-duration={1500}>
          <Typed strings={[`Hello, ${window.localStorage.getItem('audientricName')} &#x1F44B;`]} typeSpeed={40}
                 startDelay={1000}
                 onComplete={() => {
                   setShowWelcomeCursor(false)
                 }}/>
        </WelcomeText>
      )
    }

    return (
      <>
        <WelcomeText data-aos={'fade-up'} data-aos-duration={1500}>
          Hello, {window.localStorage.getItem('audientricName')} <WaveEmoji>👋</WaveEmoji>
        </WelcomeText>

        <PleaseWaitText>
          <Typed strings={['Please wait until the host starts the class.']} typeSpeed={40} startDelay={800}/>
        </PleaseWaitText>
      </>
    )
  }

  return (
    <WelcomeContainer>
      {
        users.length == 1 ?
          <CurrentlyOnlineText>
            There is currently <Odometer value={users.length}/> user online.
          </CurrentlyOnlineText>
          :
          <CurrentlyOnlineText>
            There are currently <Odometer value={users.length}/> users online.
          </CurrentlyOnlineText>
      }


      <WelcomeText style={{marginRight: 9}}>
      </WelcomeText>
      <HelloContainer>
        {showWelcomeText()}
      </HelloContainer>
    </WelcomeContainer>
  )
}

export default Welcome;
