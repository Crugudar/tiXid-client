import axios from "axios";

class Prof {
  constructor() {
    this.profile = axios.create({
      baseURL: 'http://localhost:4000',
      withCredentials: true,
    });
  }

  addCard({image, name, author }) {
    
    return this.profile
      .post("/profile/addCard", {image,  name, author })
      .then(({ data }) => data);
  }

  editCard({id, image, name }) {

    console.log('aquí ha llegado a service',id)
    return this.profile.post(`/profile/editCard/${id}`, {id, image, name}).then(({ data }) => data);
  }

  deleteCard(cardId, userId) {
    console.log('serviceeeeeeeeeeeeeeeeeeeee',userId);
    return this.profile.delete(`/profile/deleteCard/${userId}/${cardId}`, {cardId, userId}).then(({ data }) => data);
  }

  cardList(author){
   
    return this.profile.get(`/profile/cardList/${author}`, {author}).then(({ data }) => data);
 }

  
}

const axiosRequestFunctions = new Prof();

export default axiosRequestFunctions;
