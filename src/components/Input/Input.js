import React from 'react'
import '../Input/Input.css'

const Element = ({ field: { type, id, name, label, placeholder, value,  max, min, required }, changeHandler, reset }) => {
    if (required === true) {
        return (
            <div className="mb-3">
            <div className="input-wrapper">
                <label 
                    htmlFor="exampleInputEmail1" 
                    className="form-label">{name}</label>
                <input 
                    type={type} 
                    className="form-control" 
                    id={id}
                    aria-describedby="emailHelp"
                    placeholder={placeholder ? placeholder : ''}
                    name={name}
                    min={min}
                    max={max}
                    required
                    value={reset === true? '': value}
                    onChange={event => changeHandler(type, event, id)}
                />
            </div>
            <div 
                id="emailHelp" 
                className="form-text"> 
            </div>
        </div>
        )
    }
    return (
        <div className="mb-3">
            <div className="input-wrapper">
                <label 
                    htmlFor="exampleInputEmail1" 
                    className="form-label">{name}</label>
                <input 
                    type={type} 
                    className="form-control" 
                    id={id}
                    aria-describedby="emailHelp"
                    placeholder={placeholder ? placeholder : ''}
                    name={name}
                    min={min}
                    max={max}
                    value={reset === true? '': value}
                    onChange={event => changeHandler(type, event, id)}
                />
            </div>
            <div 
                id="emailHelp" 
                className="form-text"> 
            </div>
        </div>
    )


}

export default Element