import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react'
import apiEndpoints from './api-endpoints.json'
import ApiEndpoint from './components/ApiEndpoint/ApiEndpoint.js'
import '../../smart/src/index.css'

const App = () => {
  const [elements, setElements] = useState(null)

  useEffect(() => {
    setElements(apiEndpoints)
  }, [])

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


