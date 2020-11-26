import React, { Component } from "react";
import "../components/Points.css"


class Points extends Component {

    constructor(props){
        super(props)
        
        this.state = {
          players: [
            { name: 'Player1', image: '', points: 0, id: '' },
            { name: 'Player2', image: '', points: 0, id: '' },
            { name: 'Player3', image: '', points: 0, id: '' },
            { name: 'Player4', image: '', points: 0, id: '' },
          ],

           arr1votedTo: 0,
           arr2votedTo: 0,
           arr3votedTo: 0,
          
           arr0votesReceived: 0,
           arr1votesReceived: 0,
           arr2votesReceived: 0,
           arr3votesReceived: 0,
        }
    }
    
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
        let roundPoints0 = this.state.players[0].points + arr0round
        let roundPoints1 = this.state.players[1].points + arr1round
        let roundPoints2 = this.state.players[2].points + arr2round
        let roundPoints3 = this.state.players[3].points + arr3round
        let players = [...this.state.players]
        players[0].points = roundPoints0
        players[1].points = roundPoints1
        players[2].points = roundPoints2
        players[3].points = roundPoints3
        console.log('hola', roundPoints0)
        players.push(players[0]);
        players.shift();
        
        this.setState({
         players: players
        })
          
        
      };

      bothFunctions = async (event) => {
        event.preventDefault()
        await this.votesFunction()
        this.givePoints()
      }
      
  
    render() {
      const {players} = this.state;
      return (
        <div>
            <form className="pointsform" onSubmit={this.bothFunctions}>
             <div className="initial">
                <h2>Initial player</h2> 
                <div className="turn">
                <p>{this.state.players[0].name} : {this.state.players[0].points} points</p>  
                </div> 
                      
                      
              
             </div>
             <div className="restOfPlayers">
             <div className="playerColumn">
                <label>{this.state.players[1].name} : {this.state.players[1].points} points</label>
                
                <div>
                    <p>{this.state.players[0].name}</p>
                    <input id="input1" type='radio' name='arr1votedTo' value= '0'  onChange={this.handleChange} ></input>
                    
                </div>
                <div>
                    <p>{this.state.players[2].name}</p>
                    <input type='radio' name='arr1votedTo' value='2' onChange={this.handleChange} ></input>
                    
                </div>
                <div>
                    <p>{this.state.players[3].name}</p>
                    <input type='radio' name='arr1votedTo' value='3' onChange={this.handleChange}></input>
                    
                </div>
             </div>
             <div className="playerColumn">
                <label>{this.state.players[2].name} : {this.state.players[2].points} points</label>
                
                <div>
                    <p>{this.state.players[0].name}</p>
                    <input type='radio' name='arr2votedTo' value ='0' onChange={this.handleChange}></input>
                    
                </div>
                <div>
                    <p>{this.state.players[1].name}</p>
                    <input type='radio' name='arr2votedTo' value='1' onChange={this.handleChange} ></input>
                    
                    
                </div>
                <div>
                    <p>{this.state.players[3].name}</p>
                    <input type='radio' name='arr2votedTo' value='3' onChange={this.handleChange}></input>
                    
                </div>
             </div>
             <div className="playerColumn">
                <label>{this.state.players[3].name} : {this.state.players[3].points} points</label>
                
                
                <div>
                    <p>{this.state.players[0].name}</p>
                    <input type='radio' name='arr3votedTo' value='0' onChange={this.handleChange}></input>
                    
                </div>
                <div>
                    <p>{this.state.players[1].name}</p>
                    <input type='radio' name='arr3votedTo' value='1' onChange={this.handleChange}></input>
                    
                </div>
                <div>
                    <p>{this.state.players[2].name}</p>
                    <input type='radio' name='arr3votedTo' value='2' onChange={this.handleChange} ></input>
                    
                </div>
             </div>
             </div>
             <button >Let's Vote!</button>
            </form>
        </div>
      );
    }
  }
  
  export default Points ;
  