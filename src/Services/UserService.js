//Async and real time
import axios from "axios";
export const getUsers = async () => {
    try {
        const response = await axios.get("http://localhost:9000/users");
        ////Getting users from the Backend we developed
        console.log(response);
        return await response.data; //return as JSON
        
    } catch (error) {
        return error;
    }
}


/*
*all ocodes relates to the bakend calling
*1st create this file
*calling user API by line5
*A synchronous function-line by line execute
*await uses to wait unitll fetch data from the given URL
*await unitl the response get as a Json file
  */

export const getUserById = async (id) =>{
    try {
        const response = await axios.get("http://localhost:9000/users/"+id)
        return await response.data;
    } catch (error) {
        return error;
    }
}

export const createUser = async(data) =>{
    try {
        const response = await axios.post("http://localhost:9000/users",data);
        return await response.data();

    } catch (error) {
        return error;
    }
}