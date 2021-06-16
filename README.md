# Collaborative Editing Proof-of-Concept (POC for me anyway)

This is a proof for multiple (2 in this implementation) people editing the same conversation and seeing edits and 
changes in real time. 
It includes:
* API and WebSocket Server
  - conversation management
  - handling mutations
  - deleting and creating a conversation  (didn't complete this)
  - ([NodeJS](https://nodejs.org/en/),
    [express](https://www.npmjs.com/package/express), [http](https://www.npmjs.com/package/http),           [websocket](https://www.npmjs.com/package/websocket), [mysql](https://www.npmjs.com/package/mysql))
    
* React/Redux Web Application
  - Login as different users
  - editing the conversation
  - handling real-time updates of the conversation
    


This project was boot-strapped with [Create React App](https://github.com/facebook/create-react-app).

This is a project I was asked to complete as a technical interview.  It was quite substantial to try to accomplish in 6-8 hours.  I did not succeed at that goal.  I probably spent more like 30-40 hours on it.

This project uses Node JS and Express as the API and WebSocket server, and React Redux for the browser.

[API Flow Documentation](https://tinyurl.com/vu9dxwdt)


##Notes:
* I didn't spend any time on look-and-feel, just functionality.  I know it looks awful, but the functionality and algorithms are my focus.
* I created some tests (1-5) which implemented the "Full Stack" documentation example of Alice and Bob editing the 
  same document.
* I used git flow workflow and GitHub
* 


###Honesty about my development skills:
* I have not been a full time developer for 10 years.
* My last full time development position was in PHP and MVC frameworks.
* I have written 1 other React application for a class I am taking.  I am a newbie.
* I have written 1 other "production" NodeJS project I was working on for google.  I am a newbie.



## Classes: Conversation and ConversationPeer
I created these 2 classes for managing the conversations.  I used the Propel Database ORM structure I am familiar with for this.

* Conversation - is a class for dealing with a single conversation, and all the things it can do
* ConversationPeer - is a static class for dealing with groups of, or retrieving Conversation's.


## Algorithm thoughts/ questions
* on the GET /info post
  - the **author** must be known from somewhere before this command is sent to the server.  So either:
    - there is another command that is sent in to the server that has the **author**, and the server retains which **author** goes with which session
    - the web browser gets the **author** from somewhere.  But where?  There is no /users request.    
  - ~~**the /info request is supposed to return answers to 3 questions.  I have not found any questions in my 
    specifications.**~~
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
    - origin? - **~~using this, only returning the origin, not the mutation.  Also.~~  Adding "origin" to the return 
      and continuing to return the real lastMutation.**
    - this users last mutation  (alison(2,0)INS 9:'is') ?
      - ~~**for this project I presumed it is the last Mutation with the latest origin inside the mutation (2,0)**~~
        - I can't do this because the last mutation doesn't have the next origin calculated in it, it has the mutation origin that it came in with
    - the ultimate last users last mutation  (bob(2,5)DEL 6:2) ?
* A single server cannot get 2 origins at the exact same time.  They always come either in 2 different paths/threads,
  or async.  So, I created a tblMUTATIONS that held a history, and could walk that history to calculate any new 
  mutated origin.  In this implementation I only go back 1 mutation.
* Noun problems
  - Mutation vs origin - In the conversation, a mutation is the whole, last thing that was done.  Ex:  "alice (1,2)
    INS 11:'e'".  
    But, in the API definitions it is obvious that a mutation is the origin - i.e. what the current indexes are for all parties (alice and bob)
* origin order - there is no specification for origin order.  i.e. is alice 0, and bob 1?  What happens if there are more than 2 people?
  - **for the sake of this project I presume that alice is 0 and bob is 1 - hardcoded**
* Users
  - Hardcoded to only have 2 users, Alice and Bob




# How I approached the problem
Based on the requirements that I read, there needed to be an API for sending in mutations, and a push mechanism back
to the browser when a conversation is updated.  So, I implemented a single server  that
supports a REST API for the main interface, and a WebSocket interface for pushing any changed conversations back to
all currently connected browsers.  It uses a MySQL database to track the conversations and the mutations (and users,
but not really used).  

On startup, the browser registers with the WebSocket server and will then receive any conversation changes that occur.
The browser then replaces the current <textarea\> with the new conversation, updating the view for the User.

Using React Redux allowed me to store the current conversation in the store, update it from the WebSocket
Server from anywhere in the code, and the ConversationEdit component would automatically change when the conversation
changed.  So, one-way data flow.

I ran into many problems with the specification as I document below.  I had to make many presumptions and even some
modifications to get the POC to work as I expect was ... expected.


# Things I didn't get to, but need to be done 
* There is VERY little negative testing associated with the API calls
* There is no real login (i.e. password check nor authentication from the server)
* Real list of Users should be implemented
* the REST api should respond with 204 for update and 201 for insert with any new ID info  (ID info for insert not in the specification)
* If multiple conversations exist, the WebSocket server will send all changes to all connected browsers.  Currently, 
  this could cause a problem because the browsers presume only a single conversation right now, so a second 
  conversation could be pushed and replace the textarea.  TODO: 

# What would I change in the challenge?
* I don't believe this is a 6-8 hour challenge. It's at a minimum 2-3 days. It needs to be shortened, folks 
  shouldn't have to invest this much time in an interview.
  - could shorten the challenge by providing either the backend or frontend as a done piece of code that the 
    developer would use to complete the part of the challenge we are interested in seeing their skills sets in - that 
    way they only have to provide 1/2 the challenge.
* Need to update the API - provide the full thing too.
  - /login
  - conversations need names/titles
  - /users
  - better explanations on origins vs mutations.
  - better explanation on authorization and how user tracking occurs  
* possibly provide a running database, or schema at least, to be used.  Again, depends on what skills we are seeking
* Why is the client/web responsible for sending /mutations to the server not only the client's origin, but other client's (bob) origins.  This seems fraught for potential errors
  





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

