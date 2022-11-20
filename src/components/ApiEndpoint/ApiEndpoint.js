import React, { useReducer } from 'react'
import All from '../ALL/All.js'
import Get from '../Methods/GET/Get.js'
import Put from '../Methods/PUT/Put.js'
import Delete from '../Methods/DELETE/Delete.js'
import Post from '../Methods/POST/Post.js'
import ApiContext from '../Context/ApiContext.js'

const initialState = {
  userInput: '',
  userPutInput: '',
  responseStatus: '',
  reset: false,
  getResult: null,
  put: false,
  get: false,
  deletes: false,
  post: false,
  all: false
}

const ACTIONS = {
  USER_INPUT: 'userInput',
  USER_PUT_INPUT: 'userPutInput',
  RESPONSE_STATUS: 'responseStatus',
  RESET: 'reset',
  GET_RESULT: 'getResult',
  PUT: 'put',
  GET: 'get',
  DELETES: 'delete',
  POST: 'post',
  ALL: 'all'
}

const reducer = (state, action) => {
  switch(action.type) {
    case ACTIONS.USER_INPUT: {
      return {
        ...state,
        userInput: action.payload,
      }
    }
    case ACTIONS.USER_PUT_INPUT: {
      return {
        ...state,
        userPutInput: action.payload,
      }
    }
    case ACTIONS.RESPONSE_STATUS: {
      return {
        ...state,
        responseStatus: action.payload,
      }
    }
    case ACTIONS.RESET: {
      return {
        ...state,
        reset: action.payload,
      }
    }
    case ACTIONS.GET_RESULT: {
      return {
        ...state,
        getResult: action.payload,
      }
    }
    case ACTIONS.GET: {
      return {
        ...state,
        getResult: action.payload,
      }
    }
    case ACTIONS.PUT: {
      return {
        ...state,
        getResult: action.payload,
      }
    }
    case ACTIONS.DELETES: {
      return {
        ...state,
        getResult: action.payload,
      }
    }
    case ACTIONS.POST: {
      return {
        ...state,
        getResult: action.payload,
      }
    }
    case ACTIONS.ALL: {
      return {
        ...state,
        getResult: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

const Transit = ({element}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    const {
      userInput, 
      userPutInput, 
      responseStatus, 
      reset, 
      getResult,
    } = state;
    const {body, method} = element ?? {}
    const apiEndpointUsersUrl = element.url
    const lastPartOfUrlRequest = apiEndpointUsersUrl.split("/").pop()

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
        dispatch({ type: ACTIONS.RESET, payload: false })      
        inputDataStore[type] = event.target.value
        console.log(inputDataStore)
      }

    async function getAllElementsArray() {
        try {
          const res = await fetch(apiEndpointUsersUrl);
          if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
          }
          const data = await res.json();
          dispatch({ type: ACTIONS.RESPONSE_STATUS, payload: res.status })
          const result = {
            status: res.status + "-" + res.statusText,
            headers: {
              "Content-Type": res.headers.get("Content-Type"),
              "Content-Length": res.headers.get("Content-Length"),
            },
            length: res.headers.get("Content-Length"),
            data: data,
          };
          dispatch({ type: ACTIONS.GET_RESULT, payload: fortmatResponse(result) })
        } catch (err) {
          dispatch({ type: ACTIONS.GET_RESULT, payload: err.message })
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
            dispatch({ type: ACTIONS.RESPONSE_STATUS, payload: res.status })
            const result = {
              data: data,
              status: res.status,
              statusText: res.statusText,
              headers: {
                "Content-Type": res.headers.get("Content-Type"),
                "Content-Length": res.headers.get("Content-Length"),
              },
            };
            dispatch({ type: ACTIONS.GET_RESULT, payload: fortmatResponse(result) })
          } catch (err) {
            dispatch({ type: ACTIONS.GET_RESULT, payload: err.message })
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
            dispatch({ type: ACTIONS.RESPONSE_STATUS, payload: res.status })
            const result = {
              status: res.status + "-" + res.statusText,
              headers: {
                "Content-Type": res.headers.get("Content-Type"),
                "Content-Length": res.headers.get("Content-Length"),
              },
              data: data,
            };
            dispatch({ type: ACTIONS.GET_RESULT, payload: fortmatResponse(result) });
          } catch (err) {
            dispatch({ type: ACTIONS.GET_RESULT, payload: err.message })
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
                dispatch({ type: ACTIONS.RESPONSE_STATUS, payload: res.status })
                const result = {
                  status: res.status + "-" + res.statusText,
                  headers: {
                    "Content-Type": res.headers.get("Content-Type"),
                    "Content-Length": res.headers.get("Content-Length"),
                  },
                  data: data,
                };
        
                dispatch({ type: ACTIONS.GET_RESULT, payload: fortmatResponse(result) });
              } catch (err) {
                dispatch({ type: ACTIONS.GET_RESULT, payload: err.message })
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
                dispatch({ type: ACTIONS.RESPONSE_STATUS, payload: res.status })
                const result = {
                  status: res.status + "-" + res.statusText,
                  headers: { "Content-Type": res.headers.get("Content-Type") },
                  data: data,
                };
        
                dispatch({ type: ACTIONS.GET_RESULT, payload: fortmatResponse(result) });
              } catch (err) {
                dispatch({ type: ACTIONS.GET_RESULT, payload: err.message })
              }
            
          }

    const clearInputHandler = (event) => {
        event.preventDefault();
        dispatch({ type: ACTIONS.GET_RESULT, payload: null });
        dispatch({ type: ACTIONS.RESET, payload: true })
        dispatch({ type: ACTIONS.USER_PUT_INPUT, payload: '' });
        dispatch({ type: ACTIONS.USER_INPUT, payload: '' })
        dispatch({ type: ACTIONS.RESPONSE_STATUS, payload: '' })
    }

    const onChangeGetInput = (event) => {    
      dispatch({ type: ACTIONS.USER_INPUT, payload: event.target.value })
      dispatch({ type: ACTIONS.RESET, payload: false })       
    }

    const onChangePutInput = (event) => {
      dispatch({ type: ACTIONS.USER_PUT_INPUT, payload: event.target.value });
      dispatch({ type: ACTIONS.RESET, payload: false })      
    }

      return (
        <ApiContext.Provider 
          value={{
          method, 
          lastPartOfUrlRequest,
          getAllElementsArray,
          putNewUserByIdHandler,
          clearInputHandler,
          getResult,
          responseStatus,
          getUserByIdHandler,
          onChangeGetInput,
          onChangePutInput,
          deleteUserByIdHandler,
          reset,
          userInput,
          userPutInput,
          changeHandler,
          body,
          postNewUserHandler
        }}>
          {element.title === 'All' && method === 'GET' ? <All/> : ''}
          {method === 'GET' && element.title !== 'All' ? <Get/> : ''}
          {method === 'PUT'? <Put/> : ''}
          {method === 'DELETE'? <Delete/> : ''}
          {method === 'POST'? <Post/> : ''}
        </ApiContext.Provider>
        )

}
 
export default Transit
