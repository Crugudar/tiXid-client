import React, {Component} from "react";
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import ChatTable from '../components/ChatTable'
import '../pages/Game.css'
import auth from '../lib/auth-service'
import Points from '../components/Points'
import '../components/Points.css'

import {withAuth} from '../lib/AuthProvider'



  const socket = io(process.env.REACT_APP_SOCKETBACKEND, {
        transports: ["websocket","polling"]})


class Game extends Component {

  constructor(props) {
    console.log(props)
    super(props)
    this.state = {
        name: null,
        messages: [],
        newMessage: '',
        user:this.props.user,
        cards:[],
        players:[],
        playersArr: [
            { name: 'Player1', image: '', points: 0, id: '' },
            { name: 'Player2', image: '', points: 0, id: '' },
            { name: 'Player3', image: '', points: 0, id: '' },
            { name: 'Player4', image: '', points: 0, id: '' },
          ],
        playerhands:{
            player1:[],
            player2:[],
            player3:[],
            player4:[],  
        },
        yourhand:[],
        selected:[],
        info:[],
        currentplayer:0,
        theChosenOne:{},
        players:[],
       
        arr1votedTo: 0,
        arr2votedTo: 0,
        arr3votedTo: 0,
        
        arr0votesReceived: 0,
        arr1votesReceived: 0,
        arr2votesReceived: 0,
        arr3votesReceived: 0,
        
       
    }
}

    

//Lo que ocurre cuando se forma el componente
 componentDidMount(){
    
    
       console.log('Hola');
        socket.emit('hola',this.props.user) 
        socket.on('welcome',async (data)=>{
        console.log(`Hello ${data.data} you are in room ${data.room}, and are player ${data.player}`)
         this.setState({
            currentplayer:data.player
        })

        console.log(this.state.currentplayer)
        })
      socket.on('otherusers',(data)=>{
        console.log(data)
      })

      socket.on('players', (playersArr)=>{
          console.log('hola', playersArr)

          this.setState({
              playersArr: playersArr,
          })
      })

      //recibe los mensajes del back
      socket.on('chat', message => {
        message.key = JSON.stringify(message)
        console.log(message)
        this.setState({
        messages:[...this.state.messages, message]
        })  })
        
        socket.on('selectedcards', (data)=>{
               
               this.setState({
                selected:data,
            }) 
                          
     })

} 
   



  async getCards(){
    const resp = await auth.bringDeck();
    
      this.setState({
          cards: resp,
      });
      let manos = this.dealHand(this.state.cards, 4);
      ;
      this.setState({
          playerhands: {
              player1: manos[0],
              player2: manos[1],
              player3: manos[2],
              player4: manos[3],
          }
      });
      console.log(this.state.currentplayer)
    this.assignHand(); 
    
    
  }
  
  

    //cierra el socket si te vas
    componentWillUnmount() {
        console.log(this.state.players)
        
        socket.close()
    }
    //envía mensajes al back
        handleSubmit(event) {
        event.preventDefault()
        socket.emit('chat', {
            userId:this.props.user._id,
            name: this.props.user.username,
            message: this.state.newMessage,
            timestamp: new Date().toISOString()
        })
        this.setState({
            newMessage: ''
        })

        
   
   
        
        }
    //setea los mensajes en el estado para que se guarden
    setNewMessage(event) {
    this.setState({
        newMessage: event.target.value,
        
    })
    }
    //función repartidora de cartas
    dealHand =(arr,hands)=>{

        function shuffleArray(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        }
    }
        shuffleArray(arr);

        Array.prototype.chunk = function (n) {
            if (!this.length) {
            return [];
            }else{return [this.slice(0, n)].concat(this.slice(n).chunk(n));}
            
        };
   
        return arr.chunk(arr.length / 4);
    }

    //termina función repartidora de cartas

    //función que setea tu mano
    assignHand(){

        if(this.state.currentplayer===1){
            this.setState({
                yourhand:this.state.playerhands.player1
            })
        }else if(this.state.currentplayer===2){
            this.setState({
                yourhand:this.state.playerhands.player2
            }) 
        }else if(this.state.currentplayer===3){
            this.setState({
                yourhand:this.state.playerhands.player3
            })
        }else if(this.state.currentplayer===4){
            this.setState({
                yourhand:this.state.playerhands.player4
            })
        }
       
    }    
    
     selectCard(e){
        const {name}=e.target
       

        this.setState({
            theChosenOne:{name},
        })

        
         
    }

    sumbitTheChosenOne(){

        
        let newHand=[...this.state.yourhand];
        newHand.find((o, i) => {
            if (o.url === this.state.theChosenOne.name) {
                newHand.splice(i,1) 
                return true; 
            }
        });

        // let index=this.state.yourhand.indexOf(this.state.theChosenOne.name) 

        // console.log('antes de emitiir y con el estado',index)

        socket.emit('cardselected',this.state.theChosenOne.name);

        // let cardIndex=newHand.indexOf(this.state.theChosenOne.name);

        // console.log('después de emitiir y con el estado',index)
        // console.log('después de emitiir y con la copia', cardIndex) 
        
        // newHand.splice(this.state.theChosenOne.index,1)

        this.setState({
           yourhand:newHand,
       })

    }

 /* POINTS*/
  
 handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

 
    
   votesFunction = async () => {
    //event.preventDefault()
      let arr0temp = 0;
      let arr1temp = 0;
      let arr2temp = 0;
      let arr3temp = 0;
      console.log('FUNCTION 22222222222222222222222222222')
      console.log('arr1votedto ON F2', this.state.arr1votedTo)
      console.log('arr2votedto ON F2', this.state.arr2votedTo)
      console.log('arr3votedto ON F2', this.state.arr3votedTo)
      if (this.state.arr1votedTo == 0) {
        arr0temp++;
      } else if (this.state.arr1votedTo == 2) {
        arr2temp++;
      } else if (this.state.arr1votedTo == 3) {
        arr3temp++;
      }
    
      if (this.state.arr2votedTo == 0) {
        arr0temp++;
      } else if (this.state.arr2votedTo == 1) {
        arr1temp++;
      } else if (this.state.arr2votedTo == 3) {
        arr3temp++;
      }
    
      if (this.state.arr3votedTo == 0) {
        arr0temp++;
      } else if (this.state.arr3votedTo == 2) {
        arr2temp++;
      } else if (this.state.arr3votedTo == 1) {
        arr1temp++;
      }
      console.log('FUNCTION votes function')
      console.log('arr0temp', arr0temp)
      console.log('arr1temp', arr1temp)
      console.log('arr2temp', arr2temp)
      console.log('arr3temp', arr3temp)
      
      this.setState({
      arr0votesReceived: arr0temp,
      arr1votesReceived: arr1temp,
      arr2votesReceived: arr2temp,
      arr3votesReceived: arr3temp
      })
    

      console.log(' after set state', this)
      console.log('arr0votesReceived', this.state.arr0votesReceived)
      console.log('arr1votesReceived', this.state.arr1votesReceived)
      console.log('arr2votesReceived', this.state.arr2votesReceived)
      console.log('arr3votesReceived', this.state.arr3votesReceived)

      //this.givePoints()
    };
    
   givePoints = () => {
      //event.preventDefault()
      
      

     //this.votesFunction()

      console.log('FUNCTION GIVE POINTS')
      console.log('arr1votedto', this.state.arr1votedTo)
      console.log('arr2votedto', this.state.arr2votedTo)
      console.log('arr3votedto', this.state.arr3votedTo)
      console.log('arr0votesReceived', this.state.arr0votesReceived)
      console.log('arr1votesReceived', this.state.arr1votesReceived)
      console.log('arr2votesReceived', this.state.arr2votesReceived)
      console.log('arr3votesReceived', this.state.arr3votesReceived)

      let arr0round = 0;
      let arr1round = 0;
      let arr2round = 0;
      let arr3round = 0;

    
      if (this.state.arr0votesReceived == 0 || this.state.arr0votesReceived == 3) {
        arr1round += 2;
        arr2round += 2;
        arr3round += 2;
      } else {
        arr0round += 3;
        if (this.state.arr1votedTo == 0) {
          arr1round += 3;
        }
        if (this.state.arr2votedTo == 0) {
          arr2round += 3;
        }
        if (this.state.arr3votedTo == 0) {
          arr3round += 3;
        }
      }

      arr1round += this.state.arr1votesReceived
      arr2round += this.state.arr2votesReceived
      arr3round += this.state.arr3votesReceived
      let roundPoints0 = this.state.playersArr[0].points + arr0round
      let roundPoints1 = this.state.playersArr[1].points + arr1round
      let roundPoints2 = this.state.playersArr[2].points + arr2round
      let roundPoints3 = this.state.playersArr[3].points + arr3round
      let playersArr = [...this.state.playersArr]
      playersArr[0].points = roundPoints0
      playersArr[1].points = roundPoints1
      playersArr[2].points = roundPoints2
      playersArr[3].points = roundPoints3
      console.log('hola', roundPoints0)
      playersArr.push(playersArr[0]);
      playersArr.shift();
      
      this.setState({
       playersArr: playersArr
      })
        
      
    };

    bothFunctions = async (event) => {
      event.preventDefault()
      await this.votesFunction()
      this.givePoints()
    } 

  render(){
    
    const {playersArr} = this.state;

    return (
    <div className="root">
    {this.state.currentplayer? (
    <>
      
                        <div className="tableDefault">
                        <Link to='/'><button >Get out</button></Link>
                            {this.state.selected.length? 
                            <div className="player">
                                <div className="selected">
                                    <img src={this.state.selected[0]} alt=""/>
                                    <h3>1</h3>
                                </div>
                                <div className="selected">
                                    <img src={this.state.selected[1]} alt=""/>
                                    <h3>2</h3>
                                </div>
                                <div className="selected">
                                    <img src={this.state.selected[2]} alt=""/>
                                    <h3>3</h3>
                                </div>
                                <div className="selected">
                                    <img src={this.state.selected[3]} alt=""/>
                                    <h3>4</h3>
                                </div>
                            </div>:<><h1 className="">Here you will see everybody's cards in each round</h1>
                                        </>}
                        </div>
        
        
        <div className="pointsdiv">    
         
        <form className="pointsform" onSubmit={this.bothFunctions}>
             <div className="initial">
                <h2>Initial player</h2> 
                <div className="turn">
                <p>{this.state.playersArr[0].name} : {this.state.playersArr[0].points} points</p>  
                </div> 
                      
                      
              
             </div>
             <div className="restOfPlayers">
             <div className="playerColumn">
                <label>{this.state.playersArr[1].name} : {this.state.playersArr[1].points} points</label>
                
                <div>
                    <p>{this.state.playersArr[0].name}</p>
                    <input id="input1" type='radio' name='arr1votedTo' value= '0'  onChange={this.handleChange} ></input>
                    
                </div>
                <div>
                    <p>{this.state.playersArr[2].name}</p>
                    <input type='radio' name='arr1votedTo' value='2' onChange={this.handleChange} ></input>
                    
                </div>
                <div>
                    <p>{this.state.playersArr[3].name}</p>
                    <input type='radio' name='arr1votedTo' value='3' onChange={this.handleChange}></input>
                    
                </div>
             </div>
             <div className="playerColumn">
                <label>{this.state.playersArr[2].name} : {this.state.playersArr[2].points} points</label>
                
                <div>
                    <p>{this.state.playersArr[0].name}</p>
                    <input type='radio' name='arr2votedTo' value ='0' onChange={this.handleChange}></input>
                    
                </div>
                <div>
                    <p>{this.state.playersArr[1].name}</p>
                    <input type='radio' name='arr2votedTo' value='1' onChange={this.handleChange} ></input>
                    
                    
                </div>
                <div>
                    <p>{this.state.playersArr[3].name}</p>
                    <input type='radio' name='arr2votedTo' value='3' onChange={this.handleChange}></input>
                    
                </div>
             </div>
             <div className="playerColumn">
                <label>{this.state.playersArr[3].name} : {this.state.playersArr[3].points} points</label>
                
                
                <div>
                    <p>{this.state.playersArr[0].name}</p>
                    <input type='radio' name='arr3votedTo' value='0' onChange={this.handleChange}></input>
                    
                </div>
                <div>
                    <p>{this.state.playersArr[1].name}</p>
                    <input type='radio' name='arr3votedTo' value='1' onChange={this.handleChange}></input>
                    
                </div>
                <div>
                    <p>{this.state.playersArr[2].name}</p>
                    <input type='radio' name='arr3votedTo' value='2' onChange={this.handleChange} ></input>
                    
                </div>
             </div>
             </div>
             <button >Let's Vote!</button>
            </form>
        </div>
       
        {this.state.yourhand.length? (<>
      
      <div className="allhands">
      
      <div className="player">

        {/* <h1>Player {this.state.currentplayer}</h1> */}
       
            <div className="card">
                <img src={this.state.yourhand[0].url} alt=""/>
                <button name={this.state.yourhand[0].url} index={0} onClick={(e)=>this.selectCard(e)}>Select</button>
            </div>
        <div className="card">
            <img src={this.state.yourhand[1].url} alt=""/>
            <button name={this.state.yourhand[1].url} index={1} onClick={(e)=>this.selectCard(e)}>Select</button>
        </div>
        <div className="card">
            <img src={this.state.yourhand[2].url} alt=""/>
            <button name={this.state.yourhand[2].url} index={2} onClick={(e)=>this.selectCard(e)}>Select</button>
        </div>
        <div className="card">
            <img src={this.state.yourhand[3].url} alt=""/>
            <button name={this.state.yourhand[3].url} index={3} onClick={(e)=>this.selectCard(e)}>Select</button>
        </div>
       
      </div>
        <button onClick={()=>this.sumbitTheChosenOne()}>Send your card</button>
      </div>
      
      </>):<div className="allhands"><button onClick={()=>this.getCards()}> Get cards</button></div>}
        <div className="ChatRoom">
            
                <ChatTable messages={this.state.messages} user={this.state.user}/>
                <form action="" onSubmit={(e)=>this.handleSubmit(e)}>
                    
                    <input id="message"
                                type="text"
                                label="Message"
                                placeholder="Enter your Message"
                                onChange={(e)=>this.setNewMessage(e)}
                                value={this.state.newMessage}
                                autoComplete="off"/>
                        
                    <button id="chatButton" type="submit">Send</button>
                </form>
                
           
                </div> 

      </>
    ):null}
      
        
    </div>  
    )
}
}



export default withAuth(Game)