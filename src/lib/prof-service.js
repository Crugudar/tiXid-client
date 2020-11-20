import axios from "axios";

class Prof {
  constructor() {
    this.profile = axios.create({
      baseURL: 'http://localhost:4000',
      withCredentials: true,
    });
  }

  addCard({image,  name, author }) {
    
    return this.profile
      .post("/profile/addCard", {image,  name, author })
      .then(({ data }) => data);
  }

  editCard({_id, image,  name }) {
    return this.profile.post(`/profile/editCard/${_id}`, {image,  name }).then(({ data }) => data);
  }

  deleteCard(_id) {
    return this.profile.get(`/profile/deleteCard/${_id}`, {}).then(({ data }) => data);
  }

  cardList(author){
    console.log('serviceeeeeeeeeeeeeeeeeeeee',author);
    return this.profile.get(`/profile/cardList/${author}`, {author}).then(({ data }) => data);
 }

 handleUpload = async (theFile) => {
  console.log("file in service: " , theFile)

  try {
      const res = await this.profile.post("/profile/upload", theFile)
      return res.data;
  } catch (error) {
      console.log(error)
  }
}

addPhoto({image, author}) {
  console.log('serviceeeeeeeeeeeeeeeeeeeee',author, image);
 return this.profile.post(`/profile/addPhoto/${author}`, {author, image})
 .then(({ data }) => data);

}
  
}

const axiosRequestFunctions = new Prof();

export default axiosRequestFunctions;
