import Typed from "react-typed";
import Aos from 'aos';
import {useEffect, useState} from "react";
import {PleaseWaitText, WaveEmoji, WelcomeContainer, WelcomeText} from "views/Home/Welcome/Welcome.styles";
import openSocket from "socket.io-client";
import * as UserServiceApi from "apis/UserServiceApi";
import Main from "components/layout/Main/Main";
import Loading from "components/common/Loading/Loading";


function Welcome() {
  const [showCursor, setShowCursor] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Aos.init();
  }, [])

  const {loading, error, response: data} = UserServiceApi.useGetUsersGET();

  if (loading) {
    return (
      <Main>
        <Loading/>
      </Main>
    )
  }

  return (
    <WelcomeContainer>
      <h1>
        <Typed strings={[`${data.users.length} users online`]} typeSpeed={40} startDelay={800}/>
      </h1>
      {
        showCursor ?
          <WelcomeText data-aos={'fade-up'} data-aos-duration={1500}>
            <Typed strings={['Hello, Eduardo &#x1F44B;']} typeSpeed={40} startDelay={1000}
                   onComplete={() => {
                     setShowCursor(false)
                   }}/>
          </WelcomeText>
          :
          <>
            <WelcomeText>
              Hello, Eduardo <WaveEmoji>👋</WaveEmoji>
            </WelcomeText>

            <PleaseWaitText>
              <Typed strings={['Please wait until the host starts the class.']} typeSpeed={40} startDelay={800}/>
            </PleaseWaitText>
          </>
      }

    </WelcomeContainer>
  )
}

export default Welcome;
