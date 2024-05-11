
const axios = require("axios");
const { app } = require("../config/config");

const getRates = async () => {
    try {
        const { data } = await axios.get(
          app.endpoint
        );
        return data.data;
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    getRates,
};
