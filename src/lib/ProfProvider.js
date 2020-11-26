import React from "react";
import prof from "./prof-service"; // Importamos funciones para llamadas axios a la API
const { Consumer, Provider } = React.createContext();

// HOC para crear Consumer
// el componente withAuth recibe un componente como argumento y nos devuelve un componente con el mismo componente dentro de un <Consumer /> con las propiedades user e isLoggedin (state), y los métodos login, signup y logout (this)
const profile = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <Consumer>
          
          {({ addCard, editCard, deleteCard, user, card, isLoading }) => {
            return (
              <WrappedComponent
                addCard={addCard}
                editCard={editCard}
                deleteCard={deleteCard}
                user={user}
                card={card}
                isLoading={isLoading}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

// Provider
class ProfProvider extends React.Component {
  constructor(){
    super();
    this.state = { user: null, isLoading: true, card:null};
 } 
  

  componentDidMount() {
    
    this.setState({ isLoading: false });
  }     
  //     
  


  addCard = async (card) => {
    
    const {image, name, author}=card
    

    try {
      const card= await prof.addCard({image, name, author});
      this.setState({card})
    } catch (error) {
      console.log(error)
    }

  };

  editCard = async (card) => {
    
    const {_id, image, name}=card
    
    try {
      const editedCard= await prof.editCard({_id, image, name});
      this.setState({editedCard})
    } catch (error) {
      console.log(error)
    }
  };

  deleteCard = async (card) => {
    const { _id } = card;


    try {
      const editedCard= await prof.deleteCard({_id});
      
    } catch (error) {
      console.log(error)
    }
    
};

 
  render() {
    

    const { isLoading, user,  card } = this.state;
    const { addCard, deleteCard, editCard } = this;
    
    return isLoading ?(
      
      // si está loading, devuelve un <div> y sino devuelve un componente <Provider> con un objeto con los valores: { isLoggedin, user, login, logout, signup}
      // el objeto pasado en la prop value estará disponible para todos los componentes <Consumer>
   
      <div>Loading</div>
    ):(
      //Sino, importamos el Provider y le pasamos los value de isLoggedin, user, login, logout, signup 
      <Provider value={{isLoading,user, card, addCard, deleteCard, editCard}}>
        {/* //Le pasamos los props.children         */}
        {this.props.children}
      
      </Provider>
      //Le pasamos los props.children

    )
       
     
    
     /*<Provider> "value={}" datos que estarán disponibles para todos los componentes <Consumer> */
  }
}

export { Consumer, profile, ProfProvider };


