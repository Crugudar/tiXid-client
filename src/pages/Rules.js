import React, {useEffect, useState} from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import "../pages/login&signup.css";
import classes from '../pages/Rules.module.css'




function Rules(props) {
 
  const videoSource = "https://res.cloudinary.com/lemonade292/video/upload/v1606155635/videos%20tixid/VIDEO_Dixit_Cards_layvcn.mp4"

  return (
    <div>
      
      <>
          <Navbar />
             
       
          
          <div className={classes.Container} >
            <video autoPlay="autoplay" loop="loop" muted className={classes.Video} >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className={classes.Content}>
                <div className={classes.SubContent} >
                <div className="rules left">
                    <h1>The storyteller</h1>
                    <p>One player is the storyteller for the turn. He looks at the 4 images in his hand. From one of these, he makes up a sentence and says it out loud (without showing the card to the other players).</p>
                    <p>The sentence can take different forms: it can be made of one word or more, it can even be a sound. The sentence can be either invented or be inspired from an existing work of art (poetry or song sample, movie title, proverb, etc).</p> 
                    <p>Who is the storyteller for the first turn? The first player who has found a sentence declares she'll be the storyteller for the first turn.</p>   
                </div>
                <div className="rules right">
                    <h1>Choosing a card for the storyteller</h1>
                    <p>The other players select amongst their 4 images the one that best matches the sentence made up by the storyteller.</p>
                    <p>Our web shuffles his card with all the received cards, then randomly places them face up on the table. The card on the left will be number 1, the one next to it will be number 2, and so on...</p>    
                </div>
                <div className="rules  left">
                    <h1>Finding the storyteller's image: the vote</h1>
                    <p>The goal of the other players is to find which image is from the storyteller amongst the displayed ones. USE THE CHAT!! DISCUSS!!! THIS IS THE FUN PART!!! </p>
                    <p>Once everybody has decided their vote, (remeber that you cannot vote for your own card and the storyteller does not vote) one of you shoul introduce the votes manually.</p>
                    <p>Don't worry about drawing a new card you migth have noticed that or web does it for you once you send the selected card.</p>    
                </div>
                <div className="rules right">
                    <h1>End of the game</h1>
                    <p>In our version of the game the first player to arribe to 30 points wins. CONGRATULATIONS!!</p>    
                </div>
          <br />
         
            <Link to="/game">
              <button>Let's Play!</button>
            </Link> 
                </div>
            </div>
        </div>
        
        
        </>
    
    </div>
  );
}

export default withAuth(Rules);
