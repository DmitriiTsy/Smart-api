
**Project's Title**
API Explorer - is a browser-based tool for exploring API endpoints. This tool will accept parameters describing an endpoint (values such as url, method, headers, body, etc) and produce an html component for sending requests to that endpoint

Technical stack: JavaScript, CSS, HTML, React 

**Project Description**
Application prodives 4 HTTP methods - POST,GET,PUT,DELETE to access [JsonPlaceHolder apui ](https://jsonplaceholder.typicode.com/) and get request for sending data

For this project I used React with components encapsulation and dynamic data change which depeneds on JSON file, providing be user. 

**Project Configuration**
<img width="920" alt="Screen Shot 2022-11-08 at 17 21 24" src="https://user-images.githubusercontent.com/101737790/200713021-bff9c430-2e11-4d49-97ba-2a6b47c6ddb9.png">

**Project Launch**

For launch an project you need to:

Clone repository:
```
git clone https://github.com/DmitriiTsy/Smart-api
```

In the command line at the directory containing the cloned repo, run:
```
npm install
```
Run 
```
npm run start 
```
-> to activate the development server.
![Screen Shot 2022-11-08 at 17 17 11](https://user-images.githubusercontent.com/101737790/200712484-299553c6-6ec6-4b3c-9c99-9b16650a7e76.png)

**Sync example API docs to your project**
You can generate example API docs (an "API Explorer") from the example API spec in this repo (api-endpoints.json). Then you can test out the GET, POST, PUT, DELETE methods flow from within those API docs.

**Components**:

In order to get an request from server you will need to fill inputs providing for each method (GET, POST, DELETE, PUT) and click 'Submit' button after it. If you need to reset component please press 'Clear' button. This will clear all inputs
