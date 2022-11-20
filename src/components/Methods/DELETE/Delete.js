import React, {useContext, useState} from 'react'
import Button from '../../Button/Button.js'
import ApiContext from '../../Context/ApiContext'

const Delete = () => {
    const value = useContext(ApiContext)
    const [deleteModal, setDeleteModal] = useState(false)

    const deleteModalCloseOpenHandler = () => {
      return deleteModal === false ? setDeleteModal(true) : setDeleteModal(false);
    }
    const {
        method,
        lastPartOfUrlRequest,
        deleteUserByIdHandler,
        onChangeGetInput,
        reset,
        userInput,
        clearInputHandler,
        getResult,
        responseStatus
    } = value

    return (
      <div>
          <div onClick={deleteModalCloseOpenHandler} className="deleteModal-wrapper"> 
            <div div className="deleteModal-button">{method}</div>
            <div className="deleteModal-text">/{lastPartOfUrlRequest}/{'{'}{lastPartOfUrlRequest}id{'}'}</div>
            <div className="deleteModal-hint">Delete {lastPartOfUrlRequest} by id </div>
          </div>
          {deleteModal && <div className="delete-endpoint-wrapper"> 
            <div className="endpoint-wrapper-description">
              <div>
                <div className='endpoint-header'>Delete {lastPartOfUrlRequest} by id</div>
                <div>Type: {method}</div>
                <div className='endpoint-path'>Path: {lastPartOfUrlRequest}/{'{'}{lastPartOfUrlRequest}id{'}'} </div>
              </div>
              <div>
                <div className='endpoint-header'>Parameters</div>
                <form id={method} onSubmit={deleteUserByIdHandler}>
                  <div className="endpoint-header__wrapper">
                    <label className='form-label'>{lastPartOfUrlRequest} id</label>
                    <input className="form-control" onChange={onChangeGetInput} form={method} value={reset === true? '': userInput}/>
                  </div>
                  <div className="buttons-wrapper">
                      <Button className="element-submit" form={method} text="Delete" disabled={userInput? false: true}/>
                      <Button handler={clearInputHandler} form={method} className="element-clear" text="Clear" disabled={userInput? false: true}/>
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

export default Delete