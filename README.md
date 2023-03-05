# mvc_test

This repo is a practice of creating a node.js application following MVC (Model-View-Controller) framework.
The reference/credit goes to https://blog.logrocket.com/building-structuring-node-js-mvc-application/ and https://www.youtube.com/watch?v=344Zv2m9TYI. 
Basically I followed the instructions in the first blog but replaced the database connection from MongoDB to MySQL. 


Notes:
1. express is the foundational library
2. mysql2 is used for database connection
3. nodemon is used to avoid restarting server when code is updated. To start the program locally, run "nodemon index.js" in your vscode powershell terminal
4. user will need to provide a .env file with db connection, etc.
