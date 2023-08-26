import './App.css'
import { useState } from 'react';
import { useEffect } from 'react';
import MemoryCard from './componenets/MemoryCard';

const cardList = [
  { "path": "/img/1.jpeg", matched: false },
  { "path": "/img/2.jpeg", matched: false },
  { "path": "/img/3.jpeg", matched: false },
  { "path": "/img/4.jpeg", matched: false },
  { "path": "/img/5.jpeg", matched: false },
  { "path": "/img/6.jpeg", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [selectedOne, setSelectedOne] = useState(null)
  const [selectedTwo, setSelectedTwo] = useState(null)
  const [disabled, setDsiabled] = useState(false)
  const prepareCards = () => {

    const sortedCard = [...cardList, ...cardList]
      .sort(() => 0.5 - Math.random())
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(sortedCard)
    setSelectedOne(null)
    setSelectedTwo(null)
  }

  const handleSelected = (card) => {
    selectedOne ? setSelectedTwo(card) : setSelectedOne(card)
  }

  useEffect(() => {
    prepareCards()
  }, [])

  useEffect(() => {
    if (selectedOne && selectedTwo) {
      setDsiabled(true)
      if (selectedOne.path === selectedTwo.path) {
        setCards(prevCards => {
          return prevCards.map((card) => {
            if (card.path === selectedOne.path) {

              return { ...card, matched: true }
            } else {
              return card;
            }
          })
        })
        resetState()
      } else {
        setTimeout(() => {
          resetState()
        }, 1000);
      }
    }
  }, [selectedOne, selectedTwo])

  const resetState = () => {
    setSelectedOne(null)
    setSelectedTwo(null)
    setDsiabled(false)
  }
  return (
    <div className="container">
      <h1>Memory App</h1>
      <button onClick={prepareCards}>Start Game</button>
      <div className="card-grid">
        {
          cards.map(card => (
            <MemoryCard
              disabled={disabled}
              card={card}
              key={card.id}
              handleSelected={handleSelected}
              rotated={card === selectedOne || card === selectedTwo || card.matched} />
          ))
        }
      </div>
    </div>
  );
}

export default App;
