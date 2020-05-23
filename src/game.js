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
    }
    else if (playerWin == false){
      setLoose(true)
    }
  },[playerWin])

  console.log(win,loose);
  return(
    <Container>
      Game money : {money}
      <div>
        <div> dealerHand {win ? "PERDU !!!" : null} {loose ? "GAGNE ..." : null}  : {dealerHand.map(card => <div>{card.suit} {card.value}</div>)} </div>
        <div> playerHand {win ? "Gagné !!!" : null} {loose ? "perdu ..." : null} : {playerHand.map(card => <div>{card.suit} {card.value}</div>)} </div>
      </div>
      <div>
        {
          gameStarted ? 
          <div>
            <Button color="#F20922" onClick={() => continueGame()}> Continue </Button>
            <Button color="#000" onClick={() => standGame()}> Stand </Button>
          </div>
          :
          <Button color="#0CC52A" onClick={() => startGame()}> Start Game </Button>
        }
        
        <Button color="#0070F5" onClick={() => resetGame()}> Reset </Button>
      </div>
    </Container>
  )
};