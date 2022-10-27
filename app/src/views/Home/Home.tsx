import Main from "components/layout/Main/Main";
import {useEffect, useState} from "react";
import {HomeWelcomeContainer} from "views/Home/Home.styles";
import {randomIntFromInterval} from "utils/helpers";
import EnterName from "views/Home/EnterName/EnterName";
import {useAppDispatch, useAppSelector} from "store/hooks";
import Welcome from "views/Home/Welcome/Welcome";
import Admin from "views/Home/Admin/Admin"
import openSocket from "socket.io-client";
import {updateHomeScreen} from "store/ui/HomeScreen/HomeScreen.slice";
import ActiveClass from "views/Home/ActiveClass/ActiveClass";

const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12',
  '#9b59b6', '#FB6964', '#342224',
  '#472E32', '#BDBB99', '#77B1A9', '#73A857']

function Home() {
  const [bgColor, setBgColor] = useState(colors[randomIntFromInterval(0, colors.length - 1)]);

  const screen = useAppSelector(state => state.homeScreen);
  const dispatch = useAppDispatch();

  const createSocketConnection = () => {
    const socket = openSocket(process.env.REACT_APP_API_URL as string);

    socket.on("class event", data => {
      if (data.status === "started" && window.localStorage.getItem('audientricUserId') !== '635a315a786b352a6b365825') {
        dispatch(updateHomeScreen('ActiveClassScreen'))
      }

      switch (data.status) {
        case "started": {
          if (window.localStorage.getItem('audientricUserId') !== '635a315a786b352a6b365825') {
            dispatch(updateHomeScreen('ActiveClassScreen'))
          }
          break;
        }
        case "initial": {
          if (window.localStorage.getItem('audientricUserId') !== '635a315a786b352a6b365825') {
            dispatch(updateHomeScreen('WelcomeScreen'))
          }
          break;
        }

      }
    });
  };

  useEffect(() => {
    setInterval(() => {
      let randomColor = colors[randomIntFromInterval(0, colors.length - 1)];
      // ensures a new color is picked for background
      while (bgColor == randomColor) {
        randomColor = colors[randomIntFromInterval(0, colors.length - 1)];
      }
      setBgColor(randomColor);
    }, 5000);
    createSocketConnection();
  }, []);

  const renderScreen = (screen: string) => {
    switch (screen) {
      case "EnterScreen":
        return <EnterName bgColor={bgColor}/>
      case "WelcomeScreen":
        return <Welcome/>
      case "AdminScreen":
        return <Admin/>
      case "ActiveClassScreen":
        return <ActiveClass/>
      default:
        return <EnterName bgColor={bgColor}/>
    }
  }

  return (
    <Main>
      <HomeWelcomeContainer backgroundColor={bgColor}>
        {renderScreen(screen)}
      </HomeWelcomeContainer>
    </Main>
  )
}

export default Home;
