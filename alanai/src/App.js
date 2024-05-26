import React, { useState, useEffect } from "react";
import alanBtn from '@alan-ai/alan-sdk-web';
import './app.css';
import wordsToNumbers from "words-to-numbers";
import i from './imagaes/Alaniz.png';


const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    alanBtn({
      key: '08394685d1a1150d2efea3643d8c656c2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'highlight') {
          setActiveArticle((prev) => prev + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length || !article) {
            alanBtn().playText("Please try that again...");
          } else {
            window.open(article.url, '_blank');
            alanBtn().playText("Opening...");
          }
        }
      }
    });
  }, []);

  return (
    <div className="body">
     <div class="centered-text">ALANIZ-NEWS</div>
      <div className="i">
      <img className="im"
        src={i}
        alt="Logo"
      />
      <br></br>
      <center>  <h1>‎ </h1>
              <h1>‎ </h1>
              <h1>‎ </h1></center>  
      </div>
      {newsArticles.length ? (
        <div className="container">
          
          {newsArticles.map((article, index) => (
            <div key={index} className={`article ${activeArticle === index ? 'active' : ''}`}>
          
              <center>
              <img 
  className="img" 
  src={article.urlToImage} 
  alt={article.title} 
  onError={(e) => e.target.src = {i}} 
/>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <p className="date">Date: {new Date(article.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: '2-digit'
              })}</p>
           <center><button> <a href={article.url} target="_blank" rel="noopener noreferrer" >See More</a></button> </center> </center>
            </div>
          ))}
        </div>
      ) : (
        <div className="alan-instructions">
        <h2>Alan AI Voice News Instructions</h2>
        <p>To use the Alan AI voice assistant, follow these instructions:</p>
        <ul>
          <li>Click on the Alan AI button located at the bottom right corner of the screen.</li>
          <li>Wait for the voice prompt, then say "Give me the latest news."</li>
          <li>Listen to the Alan AI assistant as it reads the latest news articles.</li>
          <li>You can also ask specific questions, such as "What's the latest news?" or "Show me the news."</li>
          <li>If you need to stop the news at any time, just say "Stop."</li>
          <li>if you want you go back said "GO BACK"</li>
        </ul>
        <p>Enjoy the hands-free news experience!</p>
      </div>
      )}
     <center> <h5>Created By...</h5>
      <p>Pragateesh...</p>
      <p>Rahul...</p>
      <p>Rudresh...</p>
      <p>Vetrivel...</p></center>
    </div>
  );
};

export default App;
