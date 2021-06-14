# Collaborative Editing Proof-of-Concept (POC for me anyway)

This is a proof for multiple (2) people editing the same document and seeing edits and changes in real time.  It 
included:
* API and WebSocket Server
  - document management
  - handling mutations
  - deleting and creating a document  
    
* Web Application
  - Login as different users
  - editing the conversation
  - handling real-time updates of the conversation
    


This project was boot-strapped with [Create React App](https://github.com/facebook/create-react-app).

This is a project I was asked to complete as a technical interview.  It was quite substantial to try to accomplish 
in 6-8 hours.  I did not succeed at that goal.

This project uses Node JS and Express as the server, and React Redux in the browser.

Honesty about my development skills:
* I have not been a full time developer for 10 years.
* My last full time development position was in PHP and MVC frameworks.
* I have written 1 other React application for a class I am taking.  I am a newbie.
* I have written 1 other "production" code for a project I was working on for google.  I am a newbie.



## Doc and DocPeer
I created these 2 classes for managing the documents.  I used the Propel ORM structure I am familiar with for this.

Doc - is a class for dealing with a single document, and all the things it can do
DocPeer - is a static class for dealing with groups of, or retrieving Doc's.


## Algorithm thoughts/ questions
* on the GET /info post
  - the **author** must be known from somewhere before this command is sent to the server.  So either:
    - there is another command that is sent in to the server that has the **author**, and the server retains which **author** goes with which session
    - the web browser gets the **author** from somewhere.  But where?  There is no /users request.
  - **the /info request is supposed to return answers to 3 questions.  I have not found any questions in my 
    specifications.**
* No POST /login is in the specification, so I used the header Authorization to include who the author is.  This is a 
  **known**. (i.e. I don't query anything for it, I have it hardcoded in a user list)
* on the POST /mutations
  - How does the client figure out what the **conversationId** is?
  - Does the client know their "author" key?  
  - Why does any client need to know a different users **origin**?
    - I would think the origin (user1origin, user2origin, ...) could just be an encrypted key that no one 
      knows what in it, and is used by the server
   - added returning the new origin on the return   
* on GET /conversations
  - what is **lastMutation**?  Is it?
    - origin? - **using this, only returning the origin, not the mutation.  Also.  adding "origin" to the return and continuing to return the real lastMutation.**
    - this users last mutation  (alison(2,0)INS 9:'is') ?
      - ~~**for this project I presumed it is the last Mutation with the latest origin inside the mutation (2,0)**~~
        - I can't do this because the last mutation doesn't have the next origin calculated in it, it has the mutation origin that it came in with
    - the ultimate last users last mutation  (bob(2,5)DEL 6:2) ?
* A single server cannot get 2 origins at the exact same time.  They always come either in 2 different paths/threads, or async.  So, I created a tblMUTATIONS that held a history, and walked that history to calculate any new mutated origin
* Noun problems
  - Mutation vs origin - In the doc, a mutation is the whole, last thing that was done.  Ex:  "alice (1,2)INS 11:'e'".  But, in the API definitions it is obvious that a mutation is the origin - i.e. what the current indexes are for all parties (alice and bob)
* origin order - there is no specification for origin order.  i.e. is alice 0, and bob 1?  What happens if there are more than 2 people?
  - **for the sake of this project I presume that alice is 0 and bob is 1 - hardcoded**
*   
  






# Things I didn't get to, but need to be done
## API
* There is VERY little negative testing associated with the API calls
* There is no real login (i.e. password check nor authentication from the server)
* Why is the client/web responsible for sending /mutations to the server not only the client's origin, but other client's (bob) origins.  This seems fraught for potential errors
* the REST api should respond with 204 for update and 201 for insert with any new ID info  (ID info for insert not in the specification)
* I short-cut the users table with a stored users array in UserPeer  


# Modifications to the API




## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/doc/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/doc/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/doc/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/conversation/code-splitting](https://facebook.github.io/create-react-app/doc/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/conversation/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/doc/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/conversation/making-a-progressive-web-app](https://facebook.github.io/create-react-app/doc/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/conversation/advanced-configuration](https://facebook.github.io/create-react-app/doc/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/conversation/deployment](https://facebook.github.io/create-react-app/doc/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/conversation/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/doc/troubleshooting#npm-run-build-fails-to-minify)
