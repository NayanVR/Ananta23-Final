# Setup Project Locally 😀
> ⚠ Make sure you have [node](https://nodejs.org/en/) version >18 (recommended : v18.12.1 LTS)
---
**Let's go to client side 📱**

    cd client
First install npm modules 😌

    npm install
Then create a new *.env* file in client folder and paste all content from *.env.example* (do not delete this file) to *.env* 🤫

    cp .env.example .env
Create firebase project and add all the details to in .env file. 🥱
Start development server by running below command

    npm run dev
---
**Now let's move to server side 🌐**

    cd server
Repeat the rule of npm world 🤨

    npm install
Once again 😐 create a new *.env* file in server folder and paste all content from *.env.example* (do not delete this file) to *.env*

    cp .env.example .env
You have to provide mail id and app password. Then firebase serviceAccount credentials and planetscale database url.
Start development server by running below command (No need for nodemon 😉)

    npm run dev
**ENJOY DEVELOPMENT 😊**
