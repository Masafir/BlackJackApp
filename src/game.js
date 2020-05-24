import React, { useState, useEffect } from 'react'
import cards from './cards';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;
const Button = styled.button` 
  padding: 5px;
  color: white;
  background-color: ${props => props.color};
  border: none;
  border-radius: 5px;
  margin-left: 5px;
`;
const View = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
padding: 5px;
`;

export default function Game(props){
  const [money,setMoney] = useState(10000);
  const [playerWin,setPlayerWin] = useState();
  const [playerLoose,setPlayerLoose] = useState(false);
  const [win,setWin] = useState();
  const [loose,setLoose] = useState();
  const [dealerHand,setDealerHand] = useState([]);
  const [playerHand,setPlayerHand] = useState([]);
  const [actualCards,setActualCards] = useState(cards);
  const [dealerScore,setDealerScore] = useState(0);
  const [playerScore,setPlayerScore] = useState(0);
  const [gameStarted,setGameStarted] = useState(false);

  const getRandomCard = () => {
    const ranDom = Math.floor(Math.random() * Math.floor(actualCards.length));
    let newArray = [...actualCards];
    let card = newArray[ranDom];
    newArray.splice(ranDom,1);
    setActualCards(newArray);
    return card;
  };
  const resetGame = () => {
    setActualCards(cards);
    setDealerHand([]);
    setPlayerHand([]);
    setPlayerScore([]);
    setDealerHand([]);
    setGameStarted(false);
    setPlayerWin();
    setWin();
    setLoose();
  }

  const startGame = () => {
    console.log(getRandomCard());
    setDealerHand([getRandomCard()]);
    setPlayerHand([getRandomCard()]);
    setGameStarted(true);
  }

  const continueGame = () => {
    setDealerHand([...dealerHand,getRandomCard()]);
    setPlayerHand([...playerHand,getRandomCard()]);
  }
  const standGame = () => {
    setDealerHand([...dealerHand,getRandomCard()]);
  }

  useEffect(() => {
    let score = 0;
    playerHand.forEach(element => {
      switch (element.value) {
        case "A":
          21 - score >= 10 ? score += 11 : score += 1;
          break;
        case "J":
        case "Q":
        case "K":
          score += 10;
          break;
        default:
          score += parseInt(element.value);
          break;
      }
    });
    setPlayerScore(score);
    if(score == 21)
    {
      setWin(true);
    }
    else if (score > 21)
    {
      setLoose(true);
    }
    console.log(score);
  },[playerHand]);

  useEffect(() => {
    let score = 0;
    dealerHand.forEach(element => {
      switch (element.value) {
        case "A":
          score += 11;
          break;
        case "J":
        case "Q":
        case "K":
          score += 10;
          break;
        default:
          score += parseInt(element.value);
          break;
      }
    });
    setDealerScore(score);
    if(score == 21)
    {
      setLoose(true);
    }
    else if (score > 21)
    {
      setWin(true);
    }
    console.log(score);
  },[dealerHand]);

  useEffect(() => { 
    console.log("askip ça change",playerWin);
    if(playerWin)
    {
      setWin(true);
      setLoose(false);
    }
    else if (playerWin == false){
      setLoose(true);
      setWin(false);
    }
  },[playerWin])

  console.log(win,loose);
  return(
    <Container>
      {win && !loose ? "Vous avez gagné !" : !win && loose ? "Vous avez perdu ... " :
      <div>
        <div>
          <div> Main du croupier : <div>Score : {dealerScore}</div> {dealerHand.map(card => <div>{card.suit} {card.value}</div>)} </div>
          <div> Votre Main : <div>Score : {playerScore}</div> {playerHand.map(card => <div>{card.suit} {card.value}</div>)} </div>
        </div>
        <div>
          {
            gameStarted ? 
            <View>
              <Button color="#F20922" onClick={() => continueGame()}> Continue </Button>
              <Button color="#000" onClick={() => standGame()}> Stand </Button>
            </View>
            :
            <Button color="#0CC52A" onClick={() => startGame()}> Start Game </Button>
          }
        </div>
      </div>
}
      <div>
        <Button color="#0070F5" onClick={() => resetGame()}> Reset </Button>
      </div> 
    </Container>
  )
};