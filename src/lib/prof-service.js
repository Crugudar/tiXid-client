import axios from "axios";

class Prof {
  constructor() {
    this.profile = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      withCredentials: true,
    });
  }

  addCard({image, name, author }) {
    
    return this.profile
      .post("/profile/addCard", {image,  name, author })
      .then(({ data }) => data);
  }

  editCard({id, image, name }) {

    
    return this.profile.post(`/profile/editCard/${id}`, {id, image, name}).then(({ data }) => data);
  }

  deleteCard(cardId, userId) {
    
    return this.profile.delete(`/profile/deleteCard/${userId}/${cardId}`, {cardId, userId}).then(({ data }) => data);
  }

  cardList(author){
   
    return this.profile.get(`/profile/cardList/${author}`, {author}).then(({ data }) => data);
 }

 handleUpload = async (theFile) => {
  // console.log("file in service: " , theFile)

  try {
      const res = await this.profile.post("/profile/upload", theFile)
      return res.data;
  } catch (error) {
      console.log(error)
  }
}

addPhoto({image, author}) {
  
 return this.profile.post(`/profile/addPhoto/${author}`, {author, image})
 .then(({ data }) => data);

}
  
}

const axiosRequestFunctions = new Prof();

export default axiosRequestFunctions;
