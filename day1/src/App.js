import './App.css';
import {useState, useEffect} from 'react';


function App() {
  const [activeContent, setActiveContent] = useState('content1');
  const [display, setDisplay] = useState(true);
  const [prevCard, setPrevCard] = useState('');
  const [prevName, setPrevName] = useState('');
  const [prevUpright, setPrevUpright] = useState('');
  const [prevReversed, setPrevReversed] = useState('');
  const [prevDesc, setPrevDesc] = useState('');
  const [prevPage, setPrevPage] = useState(true);

  // SINGLE CARD 
  const [oneCard, setOneCard] = useState('');
  const [name, setName] = useState('');
  const [upright, setUpright] =  useState('');
  const [reversed, setReversed] = useState('');
  const [desc, setDesc] = useState('');
  const [prevThreeCards, setPrevThreeCards] = useState([]); 
  const [prevFiveCards, setPrevFiveCards] = useState([]);
  // 3-CARD SPREAD
  const [threeCards, setThreeCards] = useState([]);
  // 5-CARD SPREAD
  const [fiveCards, setFiveCards] = useState([]);
  

  const handleClick = (content) => {
    setActiveContent(content);
  };

  // Return to home page
  function homePage(){
    setDisplay(true);
  }
  // Show previous card 
  function backPage() {
    if (activeContent === 'content1') {
      setOneCard(prevCard);
      setName(prevName);
      setUpright(prevUpright);
      setReversed(prevReversed);
      setDesc(prevDesc);
      setPrevPage(true);
    } else if (activeContent === 'content2') {
      setThreeCards(prevThreeCards); 
    } else if (activeContent === 'content3') {
      setFiveCards(prevFiveCards);   
    }
  }
  

  // Import all cards 
  const importAllImages = (r) => {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
  const images = importAllImages(require.context('./Cards', false, /\.(jpg)$/));
  const tarotCards = require('./card_data.json')

  // Generate one random card 
  function generate(){
    const cards = Object.keys(images);

    if (activeContent === 'content1'){
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      const temp_key = randomCard.replace('.jpg', '');

      // Store previous card for the return button
      setPrevCard(oneCard);
      setPrevName(name);
      setPrevUpright(upright);
      setPrevReversed(reversed);
      setPrevDesc(desc);

      for (const crd of tarotCards.cards){
        if (crd.name_short === temp_key){
          setName(crd.name);
          setUpright(crd.meaning_up);
          setReversed(crd.meaning_rev);
          setDesc(crd.desc);
        }
      }

      setOneCard(images[randomCard]);

    }

    else{
      const randomCards = [];
      let temp_num;
      if (activeContent === 'content2'){
        temp_num = 3;
      }
      if (activeContent === 'content3'){
        temp_num = 5;
      }
      
      while(randomCards.length < temp_num){
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        const temp_key = randomCard.replace('.jpg', '');
        const crd = tarotCards.cards.find(card => card.name_short === temp_key);
        if (crd && !randomCards.includes(randomCard)) {
          randomCards.push(randomCard);
        }
      }

      const selectedCards = randomCards.map(randomCard => {
        const temp_key = randomCard.replace('.jpg', '');
        const crd = tarotCards.cards.find(card => card.name_short === temp_key);
    
        if (crd) {
          return {
            name: crd.name,
            image: images[randomCard]
          };
        }
        return null; 
      });
      if (activeContent === 'content2'){
        setPrevThreeCards(threeCards);
        setThreeCards(selectedCards)
      }
      if (activeContent === 'content3'){
        setPrevFiveCards(fiveCards); 
        setFiveCards(selectedCards)
      }
    }
   
  }

  //Generates random card after clicking any of the spreads
  useEffect(() => {
    if (activeContent != null){
      generate();
    }
  }, [activeContent]);

  return (
    <div className="App">
    {display ? (
      <div className='container'>
          <div className='container1'>TAROT GENERATOR</div>
          <div className='container2'>
            <div><button onClick={() => {handleClick('content1'); setDisplay(false);}} className='buttons' id='one-card-btn'>SINGLE CARD</button></div>
            <div><button onClick={() => {handleClick('content2'); setDisplay(false);}} className='buttons' id='three-card-btn'>3-CARD SPREAD</button></div>
            <div><button onClick={() => {handleClick('content3'); setDisplay(false);}} className='buttons' id='five-card-btn'>5-CARD SPREAD</button></div>
          </div>
      </div>) : (
      <div className='content'>
        {activeContent === 'content1' &&
          <div className='container4' id='content1'>
            <img src={oneCard} className='card'></img>
            <div id='name'>{name}</div>
            <div className='container5'>
              <p id='upr'>Upright: {upright}</p>
              <p id='rev'>Reversed: {reversed}</p>
              <p id='desc'>{desc}</p>
            </div>
          </div>
            
        }
        {activeContent === 'content2' && 
          <div className='container4' id='content2'>
            {threeCards.map((card, index) => (
              <div className='card-container'>
                <img src={card.image} alt={`Card ${index + 1}`} className='card-image'/>
                <div className='card-details'>
                  <div className='card-name'>{card.name}</div>
                </div>
              </div>
            ))}
          </div>
        }
        {activeContent === 'content3' && 
          <div className='container4' id='content3'>
            <div className='card-row'>
              {fiveCards.slice(0, 3).map((card, index) => (
                <div key={index} className='card-container'>
                  <img src={card.image} alt={`Card ${index + 1}`} className='card-image'/>
                  <div className='card-details'>
                    <div className='card-name'>{card.name}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className='card-row' id='card-rowb'> 
              {fiveCards.slice(3).map((card, index) => (
                <div key={index} className='card-container'>
                  <img src={card.image} alt={`Card ${index + 4}`} className='card-image'/>
                  <div className='card-details'>
                    <div className='card-name'>{card.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
        <div className='container3'>
          <button onClick={backPage} className='buttons'>RETURN</button>
          <button onClick={generate} className='buttons' id='gen-btn'>GENERATE</button>
          <button onClick={homePage} className='buttons' id='return-btn'>HOME</button>
        </div>
      </div> )}
    </div>
  );
}

export default App;
