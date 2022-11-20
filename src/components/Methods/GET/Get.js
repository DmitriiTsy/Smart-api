import React, { useContext, useState } from 'react'
import Button from '../../Button/Button.js'
import ApiContext from '../../Context/ApiContext.js'

const Get = () => {
    const value = useContext(ApiContext);
    const [getModal, setGetModal] = useState(false);
    const {
        method,
        lastPartOfUrlRequest,
        getUserByIdHandler,
        clearInputHandler,
        onChangeGetInput,
        reset,
        getResult,
        userInput,
        responseStatus
    } = value

    const getModalCloseOpenHandler = () => {
      return getModal === false ? setGetModal(true) : setGetModal(false);
    }
    return (
      <div>
          <div onClick={getModalCloseOpenHandler} className="getModal-wrapper"> 
            <div div className="getModal-button">{method}</div>
            <div className="getModal-text">/{lastPartOfUrlRequest}/{'{'}{lastPartOfUrlRequest}id{'}'}</div>
            <div className="getModal-hint">Find {lastPartOfUrlRequest} by id </div>
          </div>
          {getModal && <div className="get-endpoint-wrapper" >
            <div className="endpoint-wrapper-description">
              <div>
                <div className='endpoint-header'>Get {lastPartOfUrlRequest} by id</div>
                <div>Type: {method}</div>
                <div className='endpoint-path'>Path: {lastPartOfUrlRequest}/{'{'}{lastPartOfUrlRequest}id{'}'} </div>
              </div>
              <div>
                <div className='endpoint-header'>Parameters</div>
                <form id={method} onSubmit={getUserByIdHandler}>
                  <div className="endpoint-header__wrapper">
                    <label className='form-label'>{lastPartOfUrlRequest} id</label>
                    <input className="form-input" form={method} onChange={onChangeGetInput} value={reset === true? '': userInput}/>
                  </div>
                  <div className="buttons-wrapper">
                      <Button form={method} className="element-submit" text="Submit" disabled={userInput? false: true}/>
                      <Button handler={clearInputHandler} className="element-clear" text="Clear" disabled={userInput? false: true}/>
                  </div>
                </form>
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



export default Get