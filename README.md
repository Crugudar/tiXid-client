# tiXid-server
## Multiplayer Game Online!

## MVP
The MVP will cover the following:

-   Home
-   Working Multiplayer Online Game
-   Profile
-   Signup
-   Login


## Backlog


- Custom game mode

## Models

**User**

- Username: String
- Password: String
- e-mail: String
- Image: String
- CustomCards:[ObjectsID]



** Custom Cards**

- image: String
- title: String
- author:ObjectID


** Cards**
- image: String

** Game **

-cards: Array
-gameName: String
players: Objects Array

## Routes

| **Method** | **Route**                    | **Description**                                              | Request - Body                                            |
| ---------- | ---------------------------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| `GET`      | `/`                          | Main page route. Renders home `index` view.                  |                                                           |
| `GET`      | `/login`                     | Renders `login` form view.                                   |                                                           |
| `POST`     | `/login`                     | Sends Login form data to the server.                         | { email, password }                                       |
| `GET`      | `/signup`                    | Renders `signup` form view.                                  |                                                           |
| `POST`     | `/signup`                    | Sends Sign Up info to the server and creates user in the DB. | { name, email, password }                                 |
| `GET`      | `/logout`                    | Logs user out of the page. Redirect to the `home`.           |                                                           |
| `GET`      | `/profile`               | Private route. Renders `profile` form. view.                 |                                                           |
| `GET`      | `/profile/profilephoto`          | Private route. Renders `profilephoto ` form.view.                     |                                                           |
| `POST`     | `/profile/:id/editUser`      | Private route. Sends edit-profilephoto info to server and updates user in DB. Redirects to `profile`. | { email, profilePic }
| `GET`      | `/addcard`          | Private route. Renders `addcard` form.view.                     |                                                           |   
| `POST`      | `/addcard`          | Private route. Sends info to server creates a card Redirects to profile | {imageurl, idUser }                    |                                                           |   
| `GET`      | `/editcard/:id`          | Private route. Renders `editcard` form.view. |                                                           |   
| `POST`      | `/editcard/:id`          | Private route. Sends info to server creates a card Redirects to profile | { imageurl,name, idUser }                    |
| `POST`      | `/delete/:id`          | Private route. Sends info to server deletes a card Redirects to profile | { imageurl,name, idUser }    
| `GET`      | `/game`          | Private route. Renders `game ` form.view.                     |                                                           |
| `POST`     | `/upload` | Upload files to cloudinary | {imageurl}  |
|`GET` | `/game/deck` | Brings the deck to the game | |




## Wireframes

- https://wireframepro.mockflow.com/view/M426f4345b4d31f9335d36b57e29111dd1603800913825


## Links


- Trello: https://trello.com/b/dad5JU41/tixid

- Server: https://github.com/Crugudar/tiXid-server

- Client: https://github.com/Crugudar/tiXid-client
