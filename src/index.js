import ReactDOM from 'react-dom';
import React from 'react'
import apiEndpoints from './api-endpoints.json'
import ApiEndpoint from './components/ApiEndpoint/ApiEndpoint.js'
import './sass/main.css'

const App = () => {




  const array = Object.values(apiEndpoints)
  console.log(array)
  return (
    <div> 
      {array.map((element) => (
        <div className="elements-board">
          <ApiEndpoint element={element}/>
        </div>
      ))}
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode> 
    <div className="top-wrapper">
      <div className="top-wrapper__header">API Explorer</div>
      <div>This is a sample server for JSONPlaceholder.</div>
    </div>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
