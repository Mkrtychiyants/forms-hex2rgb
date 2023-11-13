import React, { useState } from 'react';

export interface IForm <T>{
    hex: string,
    rbg: string,
    style: T
}
function hexToRgb(hex1:string) {
    var result = /^#+([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex1);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : undefined ;
}

export const Converter = () => {
    
    let [input, setInput]= useState<(IForm<{backgroundColor: string}>)>({
        hex: "привет - привет",
        rbg: "Осталось 7 знаков",
        style: { 
            backgroundColor: "yellow"
        },  
    })
    let {hex, rbg, style} = input;

    const focus = ((e: React.ChangeEvent<HTMLInputElement>)=>{
        setInput((prev) => ({
            ...prev, hex: '',
        }))
    })

    const rgbConvertor = ((e: React.ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;

        const remain = 7 - value.length;

        setInput((prev) => ({
            ...prev, hex: value,
            rbg: "Осталось " + remain + " знаков"
        }))

        if (!remain) {
            let compRgb =  hexToRgb(value);
            if (compRgb) {
                setInput((prev) => ({
                    ...prev,
                    style:{
                        backgroundColor: `rgb(${compRgb?.r},${compRgb?.g},${compRgb?.b})`
                    },
                    rbg : `rgb(${compRgb?.r},${compRgb?.g},${compRgb?.b})`,
                    
                }))
            }else{
                setInput((prev) => ({
                    ...prev,
                    style:{
                        backgroundColor: "red"
                    },
                    rbg : "Ошибка",
                    
                }))
            }
           
        }       
    })

    
  return (
    <form className='form' autoComplete='off' style={style}>
        <div className="inputContainer">
        <input type="text" name="hex" id="hex" value={hex} onChange={rgbConvertor} onFocus={focus}/>
        <label htmlFor='hex' id="rgb">{rbg}</label>
        </div>
        
    </form>
  )
}
