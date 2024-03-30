/* eslint-disable import/no-anonymous-default-export */
const testEmail = (value) =>{
    const emailPattern =/^[\w\W]+@[a-zA-Z]{5,6}\.[a-zA-Z]{2,3}$/g
    return emailPattern.test(value)
}


export default {testEmail }