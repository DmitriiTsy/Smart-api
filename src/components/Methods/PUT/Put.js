import React, { useContext, useState } from 'react'
import Button from '../../Button/Button.js'
import ApiContext from '../../Context/ApiContext.js'
import Input from '../../Input/Input.js'

const Put = () => {
    const value = useContext(ApiContext);
    const [putModal, setPutModal] = useState(false);
    const {
        method,
        lastPartOfUrlRequest,
        putNewUserByIdHandler,
        onChangePutInput,
        clearInputHandler,
        getResult,
        responseStatus,
        userPutInput,
        changeHandler,
        reset,
        body
    } = value;

    const putModalCloseOpenHandler = () => {
      return putModal === false ? setPutModal(true) : setPutModal(false);
    }

    return (
      <div>
          <div onClick={putModalCloseOpenHandler} className="putModal-wrapper"> 
            <div div className="putModal-button">{method}</div>
            <div className="putModal-text">/{lastPartOfUrlRequest}/{'{'}{lastPartOfUrlRequest}id{'}'}</div>
            <div className="putModal-hint">Update existing {lastPartOfUrlRequest} by id </div>
          </div>
          {putModal && <div className="put-endpoint-wrapper"> 
          <div className="endpoint-wrapper-description">
            <div>
              <div className='endpoint-header'>Put {lastPartOfUrlRequest} by id</div>
              <div>Type: {method}</div>
              <div className='endpoint-path'>Path: {lastPartOfUrlRequest}/{'{'}{lastPartOfUrlRequest}id{'}'} </div>
            </div>
            <div>
              <div className='endpoint-header'>Parameters</div>
              <form id={method} onSubmit={putNewUserByIdHandler}>
                <div className="endpoint-header__wrapper">
                  <label className='form-label'>{lastPartOfUrlRequest} id</label>
                  <input className="form-input__put" form={method} onChange={onChangePutInput} value={reset === true? '': userPutInput} />
                  {body ? body.map((field, i) => <div 
                  key={i}><Input field={field} method={method} form={method} changeHandler={changeHandler} reset={reset}/><p></p></div>) : null}
                </div>
                <div className="buttons-wrapper">
                  <Button className="element-submit" text="Submit" form={method} disabled={userPutInput? false: true}/>
                  <Button handler={clearInputHandler} className="element-clear" text="Clear" disabled={userPutInput? false: true}/>
                </div>
              </form>
            </div>
          </div>
          <div> Responses:
                <pre>
                    {getResult && 
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
                     }
                </pre>
           </div>
    </div>}
      </div>
    )
}

export default Put