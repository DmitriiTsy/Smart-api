import React, { useState } from 'react'
import Input from '../Input/Input.js'
import Button from '../Button/Button'
import '../ApiEndpoint/ApiEndpoint.css'

const Transit = ({element}) => {
    const {body, method} = element ?? {}
    const [userInput, setUserInput] = useState('') 
    const [userPutInput, setUserPutInput] = useState('')

    const [responseStatus, setResponseStatus] = useState('')

    const [reset, setReset] = useState(false)  //To reset component data

    const apiEndpointUsersUrl = 'https://jsonplaceholder.typicode.com/users'
    const [getResult, setGetResult] = useState(null);

    const fortmatResponse = (res) => {
        return JSON.stringify(res, null, 2);
    }

    const inputDataStore = {                   
      tel: '',
      text: '',
      email: '',
      website: '',
      id: '',
    }

      const changeHandler = (type, event) => {    
        setReset(false)       
        inputDataStore[type] = event.target.value
        console.log(inputDataStore)
      }

    async function getAllUsersArray() {
        try {
          const res = await fetch(apiEndpointUsersUrl);
          if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
          }
          const data = await res.json();
          setResponseStatus(res.status)
          const result = {
            status: res.status + "-" + res.statusText,
            headers: {
              "Content-Type": res.headers.get("Content-Type"),
              "Content-Length": res.headers.get("Content-Length"),
            },
            length: res.headers.get("Content-Length"),
            data: data,
          };
    
          setGetResult(fortmatResponse(result));
        } catch (err) {
          setGetResult(err.message);
        }
      }

    async function getUserByIdHandler(event) {
        event.preventDefault()
        const id = userInput;
        if (id) {
          try {
            const res = await fetch(`${apiEndpointUsersUrl}/${id}`, {
                method: method
            });
            if (!res.ok) {
              const message = `An error has occured: ${res.status} - ${res.statusText}`;
              throw new Error(message);
            }

            const data = await res.json();
            setResponseStatus(res.status)
            const result = {
              data: data,
              status: res.status,
              statusText: res.statusText,
              headers: {
                "Content-Type": res.headers.get("Content-Type"),
                "Content-Length": res.headers.get("Content-Length"),
              },
            };
            setGetResult(fortmatResponse(result));
          } catch (err) {
            setGetResult(err.message);
          }
        }
    }

    async function postNewUserHandler(event) {
        event.preventDefault()
        try{
        const res = await fetch(apiEndpointUsersUrl, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
              },
            body: JSON.stringify({
                name: inputDataStore.text,
                username: inputDataStore.text,
                website: inputDataStore.website,
                phone: inputDataStore.tel,
                email: inputDataStore.email,
                id: inputDataStore.id,
            })})
            
            if (!res.ok) {
              const message = `An error has occured: ${res.status} - ${res.statusText}, waiting for ID`;
              throw new Error(message);
            }

            const data = await res.json();
            setResponseStatus(res.status)
            const result = {
              status: res.status + "-" + res.statusText,
              headers: {
                "Content-Type": res.headers.get("Content-Type"),
                "Content-Length": res.headers.get("Content-Length"),
              },
              data: data,
            };
            setGetResult(fortmatResponse(result));
          } catch (err) {
            setGetResult(err.message);
          }
        }

        async function putNewUserByIdHandler(event) {
            event.preventDefault();
            const idPut = userPutInput;
      
            try {
                const res = await fetch(`${apiEndpointUsersUrl}/${idPut}`, {
                  method: method,
                  headers: {
                    "Content-Type": "application/json",
                    "x-access-token": "token-value",
                  },
                  body: JSON.stringify({
                    name: inputDataStore.text,
                    username: inputDataStore.text,
                    website: inputDataStore.website,
                    phone: inputDataStore.tel,
                    email: inputDataStore.email,
                    id: idPut,
                  })})
        
                if (!res.ok) {
                  const message = `An error has occured: ${res.status} - ${res.statusText}`;
                  throw new Error(message);
                }
        
                const data = await res.json();
                setResponseStatus(res.status)
                const result = {
                  status: res.status + "-" + res.statusText,
                  headers: {
                    "Content-Type": res.headers.get("Content-Type"),
                    "Content-Length": res.headers.get("Content-Length"),
                  },
                  data: data,
                };
        
                setGetResult(fortmatResponse(result));
              } catch (err) {
                setGetResult(err.message);
              }
          }


          async function deleteUserByIdHandler(event) {
            event.preventDefault();
            const id = userInput;
              try {
                const res = await fetch(`${apiEndpointUsersUrl}/${id}`, { 
                  method: method 
                });
        
                const data = await res.json();
                setResponseStatus(res.status)
                const result = {
                  status: res.status + "-" + res.statusText,
                  headers: { "Content-Type": res.headers.get("Content-Type") },
                  data: data,
                };
        
                setGetResult(fortmatResponse(result));
              } catch (err) {
                setGetResult(err.message);
              }
            
          }

    const clearInputHandler = (event) => {
        event.preventDefault();
        setGetResult(null);
        setReset(true)
        setUserPutInput('')
        setUserInput('')
        setResponseStatus('')
    }

    const onChangeGetInput = (event) => {    
      setUserInput(event.target.value)
      setReset(false)       
    }

    const onChangePutInput = (event) => {
      setUserPutInput(event.target.value);
      setReset(false)  
    }
  
    if (method === 'GET') {
        return (
        <div className="endpoint-wrapper">
            <div className="endpoint-wrapper-description">
              <div>
                <div className='endpoint-header'>Get a user by id</div>
                <div>Type: {method}</div>
                <div className='endpoint-path'>Path: /users{'{'}userId{'}'} </div>
              </div>
              <div>
                <div className='endpoint-header'>Parameters</div>
                <div className="endpoint-header__wrapper">
                  <label className='form-label'>user id</label>
                  <input className="form-input" onChange={onChangeGetInput} value={reset === true? '': userInput}/>
                </div>
                <div className="buttons-wrapper">
                    <Button handler={getUserByIdHandler} className="element-submit" text="Submit" disabled={userInput? false: true}/>
                    <Button handler={clearInputHandler} className="element-clear" text="Clear" disabled={userInput? false: true}/>
                </div>
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
        </div>
        )
    } else if (method === 'PUT') {
        return (
            <div className="endpoint-wrapper"> 
              <div className="endpoint-wrapper-description">
                <div>
                  <div className='endpoint-header'>Put a user by id</div>
                  <div>Type: {method} a user</div>
                  <div className='endpoint-path'>Path: /users{'{'}userId{'}'} </div>
                </div>
                <div>
                  <div className='endpoint-header'>Parameters</div>
                  <div className="endpoint-header__wrapper">
                    <label className='form-label'>user id</label>
                    <input className="form-input__put" onChange={onChangePutInput} value={reset === true? '': userPutInput} />
                    {body ? body.map((field, i) => <div 
                    key={i}><Input field={field} method={method} changeHandler={changeHandler} reset={reset}/><p></p></div>) : null}
                  </div>
                  <div className="buttons-wrapper">
                    <Button handler={putNewUserByIdHandler} className="element-submit" text="Submit" disabled={userPutInput? false: true}/>
                    <Button handler={clearInputHandler} className="element-clear" text="Clear" disabled={userPutInput? false: true}/>
                </div>
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
        </div>
        )
    } else if (method === 'DELETE') {
      return (
        <div className="endpoint-wrapper"> 
            <div className="endpoint-wrapper-description">
              <div>
                <div className='endpoint-header'>Delete a user by id</div>
                <div>Type: {method}</div>
                <div className='endpoint-path'>Path: /users{'{'}userId{'}'} </div>
              </div>
              <div>
                <div className='endpoint-header'>Parameters</div>
                <div className="endpoint-header__wrapper">
                  <label className='form-label'>user id</label>
                  <input className="form-control" onChange={onChangeGetInput} value={reset === true? '': userInput}/>
                </div>
                <div className="buttons-wrapper">
                    <Button handler={deleteUserByIdHandler} className="element-submit" text="Delete" disabled={userInput? false: true}/>
                    <Button handler={clearInputHandler} className="element-clear" text="Clear" disabled={userInput? false: true}/>
                </div>
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
        </div>
        )
    } else if (method === 'ALL') {
      return (
        <div className="endpoint-wrapper">
          <div className="endpoint-wrapper-description">
            <div>
              <div className='endpoint-header'>Get all users</div>
              <div>Type: {method}</div>
              <div className='endpoint-path'>Path: /users </div>
            </div>
            <div>
              <div className='endpoint-header'>Parameters</div>
              <div className="buttons-wrapper">
                <Button handler={getAllUsersArray} className="element-submit" text="Submit"/>
                <Button handler={clearInputHandler} className="element-clear" text="Clear"/>
              </div>
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
      </div>
      )
    }
    return (
            <div className="endpoint-wrapper">
                <div className="endpoint-wrapper-description">
                  <div>
                    <div className='endpoint-header'>Add new user</div>
                    <div>Type: {method}</div>
                    <div className='endpoint-path'>Path: /users </div>
                  </div>
                  <div>
                      <div className='endpoint-header'>Parameters</div>
                        <form name="form1" method="get">
                            {body ? body.map((field, i) => <div 
                            key={i}><Input field={field} method={method} changeHandler={changeHandler} reset={reset} /><p></p></div>) : null}
                            <div className="buttons-wrapper">
                              <Button handler={postNewUserHandler} className="element-submit" text="Submit" />
                              <Button handler={clearInputHandler} className="element-clear" text="Clear" />
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
            </div>
    )
}
 
export default Transit
