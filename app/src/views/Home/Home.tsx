import Main from "components/layout/Main/Main";
import {useEffect, useState} from "react";
import {HomeWelcomeContainer} from "views/Home/Home.styles";
import {randomIntFromInterval} from "utils/helpers";
import EnterName from "views/Home/EnterName/EnterName";
import {useAppSelector} from "store/hooks";
import Welcome from "views/Home/Welcome/Welcome";

const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12',
  '#e74c3c', '#9b59b6', '#FB6964', '#342224',
  '#472E32', '#BDBB99', '#77B1A9', '#73A857']

function Home() {
  const [bgColor, setBgColor] = useState(colors[randomIntFromInterval(0, colors.length - 1)]);

  const screen = useAppSelector(state => state.homeScreen);

  useEffect(() => {
    setInterval(() => {
      let randomColor = colors[randomIntFromInterval(0, colors.length - 1)];
      // ensures a new color is picked for background
      while (bgColor == randomColor) {
        randomColor = colors[randomIntFromInterval(0, colors.length - 1)];
      }
      setBgColor(randomColor);
    }, 5000)
  }, []);

  const renderScreen = (screen: string) => {
    switch (screen) {
      case "EnterScreen":
        return <EnterName bgColor={bgColor}/>
      case "WelcomeScreen":
        return <Welcome/>
      case "AdminScreen":

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
