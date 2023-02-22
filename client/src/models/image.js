import axios from "axios";

const baseURL = "/api/image";

export default {
    update(id, params) {
        return axios.put(`${baseURL}/batchtag/${id}`, { ...params });
      }
};
