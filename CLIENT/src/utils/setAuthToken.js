import axios from "axios";

const setAuthToken = token => {
    if(token) {
        // apple authorization token to every request if logged in

        axios.defaults.headers.common["Authorization"] = token;
        
        console.log("token", token);
        return token;

    } else {
        //delete auth header
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;