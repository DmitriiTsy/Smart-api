import React from 'react'

const Element = ({ field: { type, id, name, placeholder, value,  max, min, required }, changeHandler, reset, form }) => {
    let pattern = false
    switch(type) {
        case 'tel': 
            pattern = "[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder = "123-456-7890";
            break
        case 'url':
            pattern="https?://.+" 
            placeholder="Include http://";
            break
        case 'password':
            pattern=".{8,}" 
            placeholder="Eight or more characters";
            break
        default:
            pattern=false 
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
                    required={required}
                    pattern={pattern}
                    value={reset === true? '': value}
                    onChange={event => changeHandler(type, event, id)}
                    form={form}
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