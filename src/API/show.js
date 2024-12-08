const { axiosInstance } = require('./index.js');

export const getAllTheatersByMovies = async(payload)=>{
    try {
        console.log("am insdie the getSetters")
        const response = await axiosInstance.post('/api/shows/get-all-theater-by-movies', payload)
        return response.data;

    } catch (error) {
        console.log(error);
        //return error;
        
    }
}

export const getSingleShowDetals = async(showId)=>{
    try {
        const response = await axiosInstance.post('/api/shows/get-single-show-details', showId);
        return response.data
    } catch (error) {
        console.log(error);
    }
}