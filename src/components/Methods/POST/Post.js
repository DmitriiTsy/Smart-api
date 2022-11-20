import React, { useContext, useState } from 'react'
import Button from '../../Button/Button.js'
import Input from '../../Input/Input.js'
import ApiContext from '../../Context/ApiContext'

const Post = () => {
    const value = useContext(ApiContext);
    const [postModal, setPostModal] = useState(false);
    const {
        method,
        lastPartOfUrlRequest,
        clearInputHandler,
        getResult,
        responseStatus,
        changeHandler,
        reset,
        body,
        postNewUserHandler,
    } = value;
    
    const postModalCloseOpenHandler = () => {
      return postModal === false ? setPostModal(true) : setPostModal(false);
    }
    return (

      <div>
          <div onClick={postModalCloseOpenHandler} className="postModal-wrapper"> 
            <div div className="postModal-button">{method}</div>
            <div className="postModal-text">/{lastPartOfUrlRequest}</div>
            <div className="postModal-hint">Add new {lastPartOfUrlRequest} to the store </div>
          </div>
          {postModal && <div className="post-endpoint-wrapper">
            <div className="endpoint-wrapper-description">
              <div>
                <div className='endpoint-header'>Add new {lastPartOfUrlRequest}</div>
                <div>Type: {method}</div>
                <div className='endpoint-path'>Path: {lastPartOfUrlRequest} </div>
              </div>
              <div>
                  <div className='endpoint-header'>Parameters</div>
                    <form id="form1" onSubmit={postNewUserHandler}>
                        {body ? body.map((field, i) => <div 
                        key={i}><Input field={field} method={method} changeHandler={changeHandler} reset={reset} /><p></p></div>) : null}
                        <div className="buttons-wrapper">
                          <Button className="element-submit" text="Submit" />
                          <Button handler={clearInputHandler} className="element-clear" text="Clear" />
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

export default Post