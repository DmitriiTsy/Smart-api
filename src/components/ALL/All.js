import React, { useContext, useState } from 'react'
import Button from '../Button/Button.js'
import ApiContext from '../Context/ApiContext.js'

const All = () => {
    const value = useContext(ApiContext);
    const [allModal, setAllModal] = useState(false);
    const {
        method, 
        lastPartOfUrlRequest, 
        getAllElementsArray, 
        clearInputHandler,
        getResult, 
        responseStatus, 
    } = value

    const allModalCloseOpenHandler = () => {
      return allModal === false ? setAllModal(true) : setAllModal(false);
    }

    return (
      <div>
        <div onClick={allModalCloseOpenHandler} className="allModal-wrapper"> 
          <div className="allModal-button">{method}</div>
          <div className="allModal-text">/{lastPartOfUrlRequest}</div>
          <div className="allModal-hint">Find all {lastPartOfUrlRequest}</div>
        </div>
        {allModal && <div className="all-endpoint-wrapper">
            <div className="endpoint-wrapper-description">
              <div>
                <div className='endpoint-header'>Get all {lastPartOfUrlRequest}</div>
                <div>Type: {method}</div>
                <div className='endpoint-path'>Path: {lastPartOfUrlRequest} </div>
              </div>
              <div>
                <div className='endpoint-header'>Parameters</div>
                <div className="buttons-wrapper">
                    <Button handler={getAllElementsArray} className="element-submit" text="Submit"/>
                    <Button handler={clearInputHandler} className="element-clear" text="Clear"/>
                </div>
              </div>
            </div>
            {getResult && <div> Responses:
                      <pre>
                          <div className='response-form-wrapper'>
                            <div>
                              <div className='endpoint-header'>Code</div>
                              {responseStatus}
                            </div>
                            <div>
                              <div className='endpoint-header'>Operation</div>
                              <div className="response-form"> 
                                <pre>
                                  {getResult}
                                </pre>
                              </div>
                            </div>
                          </div>
                      </pre>
                  </div>
            }
        </div>}
        </div>
      )
}

export default All