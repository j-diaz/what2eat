[![Build Status](https://travis-ci.org/j-diaz/what2eat.svg?branch=master)](https://travis-ci.org/j-diaz/what2eat)
What2Eat
========
#Description
What2Eat is a progressive webapp (HTML5, Service Workers, Websockets etc.) that allows users to
create voting sessions to democratically decide which place they want to go eat.

##How to run?
1. Install *Node.js 4.3.2 LTS*.
2. Clone this repository
3. Create a filenamed  ```oauth.sh``` with the following contents:
   ```
   #!/bin/bash

   export CONSUMER_KEY='xxxxxxxxx'

   export CONSUMER_SECRET='xxxxxxxxxx'

   export TOKEN='xxxxxxxx'

   export TOKEN_SECRET='xxxxxxxx'

   export PORT=9000
   ```
4. Open a terminal a run ```source oauth.sh```
5. Install backend dependencies. In the terminal run ```npm install```
6. Install client side dependency manager globally ```npm install -g bower```
7. Install frontend dependencies. In the terminal run ```bower install```
8. Run server. In the terminal run ```node backend/server.js```
9. See web app. In your browser, navigate to [http://localhost:9000](http://localhost:9000/)
10. [**Optional**] Feel like maximizing perfomance? Run ```node backend/cluster.js``` instead of step 8.

##Testing

* Load seed data by running seed/setup.py
* Run ```mocha -R spec test/route-test.js```

##What should I know?

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Strict Mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
* [ECMAScript 6](http://es6-features.org/#Constants)
* [Vue.js](https://vuejs.org)
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://github.com/j-diaz/what2eat.git)
* [SocketIO](http://socket.io/)
* [Boostrap CSS](http://getbootstrap.com/css/)
* [Mocha](http://mochajs.org/) testing framework
* [MongoDB](https://docs.mongodb.com/)
* General knowledge of how the web works (HTTP, WebSockets, Single Page Webapps).

##System Architecture

Block diagram of system component architecture
![Architecture](docs/architecture/What2EatArchitecture/Slide1.png)
