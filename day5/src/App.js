import './App.css';
import React, { useState, useEffect, createElement, useRef } from "react";
import img1 from './butterfly.jpeg'
import img2 from './drgnfly.jpeg'
import img3 from './bbb.jpeg'
import img4 from './ldybug.jpeg'
import Timer from './Timer'



function App() {
  const [display, setDisplay] = useState(true);
  const [game, setGame] = useState(true);
  const [id, setID] = useState('');
  const [score, setScore] = useState(0);
  const [createdImages, setCreatedImages] = useState([]); 

  const boardRef = useRef(null);

  useEffect(() => {
    if (boardRef.current){
      const board = boardRef.current;

      function createRandomInsect(){
        const cur_insect = document.createElement('img');
        let temp;
        switch(id){
          case 'butterfly':
            temp = img1;
            break;
          case 'drgnfly':
            temp = img2;
            break;
          case 'bbb':
            temp = img3;
            break;
          case 'ldybug':
            temp = img4;
            break;
        }
        cur_insect.src = `${temp}`;
        cur_insect.className = 'brd-insct';
        cur_insect.id = 'brd-'+`${id}`;
        cur_insect.style.position = 'absolute';

        const maxX = board.clientWidth;
        const maxY = board.clientHeight;

        const margin = 50;

        const randX = Math.random() * (maxX - margin * 2) + margin;
        const randY = Math.random() * (maxY - margin * 2) + margin;

        const rotationAngle = Math.random() * 360;

        cur_insect.style.left = `${randX}px`
        cur_insect.style.top = `${randY}px`

        cur_insect.style.transform = `rotate(${rotationAngle}deg)`;

        cur_insect.addEventListener('click', () => insectClick(cur_insect));
        board.appendChild(cur_insect);

        setCreatedImages((prevImages) => [...prevImages, cur_insect]);
      }
  
      const id1 = setInterval(createRandomInsect, 1000);
      const id2 = setInterval(createRandomInsect, 1000);
      const id3 = setInterval(createRandomInsect, 550);

      return () => {
        
        clearInterval(id1); 
        clearInterval(id2); 
        clearInterval(id3);
     
      } 

    }

  }, [id,score]);

  function insectClick(img){
    img.parentNode.removeChild(img);
    setScore((prevScore) => prevScore + 1);

  }

  function backPage() {
    createdImages.forEach((image) => image.remove());
    setCreatedImages([]);
    setScore(0);
    setGame(true);
    setID('');
  }

  function displayWelcomeMessage() {
    console.log("Welcome to the game!");
  }

  return (
    <div className="App">
       {display ? (<div className='container1'>
            <h1 className='play-hdr'>PLAY THE GAME!</h1>
            <div id='strt-bt'>
              <button onClick={displayWelcomeMessage}>Show Welcome</button>
              <button onClick={() => setDisplay(false)} className='strt-btn'>START</button>
            </div>
       </div> ) : 
          (
            <div className='container2'>
              {game ? (<div className='container-hide'>
                          <p id='choose'> CHOOSE ONE</p>
                          <div className='container3'>
                            <div className='insects' onClick={() => {setGame(false); setID('butterfly');}}> 
                              <img src={img1} className='imgs' id='butterfly'></img>
                            </div>
                            <div className='insects' onClick={() => {setGame(false); setID('drgnfly');}}>
                              <img src={img2} className='imgs' id='drgnfly'></img>
                            </div>
                            <div className='insects' onClick={() => {setGame(false); setID('bbb');}}>
                              <img src={img3} className='imgs' id='bbb'></img>
                            </div>
                            <div className='insects' onClick={() => {setGame(false); setID('ldybug');}}>
                              <img src={img4} className='imgs' id='ldybug'></img>
                            </div>
                          </div>
                        </div> 
                  ) : (
                    
                    <div className='container4' id={"container-" + id}>
                      <div className='container5'>
                        <div className='container6'>
                          <div id='time'>TIME: </div>
                          <Timer />
                        </div>
                        <div className='container8'>
                         <div className='back' id='back-bt' onClick={backPage}>BACK</div>
                        </div>
                        <div className='container7'>
                          <div id='score'>SCORE: {score}</div>
                        </div>
                      </div>
                      <div id='board' ref={boardRef}>
                      </div>
                    </div>
                  )}
                
             
            </div>)}
    </div>
  );
}

export default App;
