import ReactDOM from 'react-dom';
import React from 'react'
import apiEndpoints from './api-endpoints.json'
import ApiEndpoint from './components/ApiEndpoint/ApiEndpoint.js'
import './index.css'

const App = () => {
  const array = Object.values(apiEndpoints)

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
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


