'use strict';

// let quoteContainer = document.querySelector('.quote-container');
// let quote = document.querySelector('#quote');
// let author = document.querySelector('#author');

// console.dir(quoteContainer);

const quoteText=document.getElementById("quote");
const quoteAuthor=document.getElementById("author");
const twitterBtn=document.getElementById("twitter");
const newQuoteBtn=document.getElementById("new-quote");
const loader=document.querySelector('.loader');
const quoteContainer=document.querySelector('.quote-container');


let apiQuote;

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuotes() {
    loading();
    const quote = apiQuote[Math.floor(Math.random()*apiQuote.length)];
    quoteText.textContent = quote.text;    

    if (quote.author){
        quoteAuthor.textContent = quote.author;
    }
    else {
        quoteAuthor.textContent = 'unknown';
    }

    if (quote.text.length<50){
        quoteText.classList.add('long-quote');
    }
    else {
        quoteText.classList.remove('long-quote');
    }
    complete();
}

async function getQuotes(){
    // loader.hidden = false;
    // quoteContainer.hidden = true;
    try {
    const response = await fetch('https://type.fit/api/quotes/');
    const quoteData = await response.json();
    apiQuote=quoteData;
    newQuotes();
    }
    catch (error)
    {
       console.log(error);
    }
}

function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${quoteAuthor.textContent}`;
    window.open(twitterURL, '_blank')
}

newQuoteBtn.addEventListener('click',newQuotes);
twitterBtn.addEventListener('click',tweetQuote);
getQuotes();
