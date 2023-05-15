import axios from "axios";

const baseURL = "/api-screenlife/export";

export default {
  download(id, dataset) {
    axios({
      url: `${baseURL}/${id}/download`,
      method: "GET",
      responseType: "blob"
    }).then(response => {
      console.log("response.headers.metadata");
      console.log(response.headers.metadata);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const fileExtension = response.headers.extension;
      const exportType = response.headers.export_type;

      // console.log("blob from download function");
      // console.log(url)

      link.setAttribute("download", `${dataset}-${id}-${exportType}.${fileExtension}`);
      document.body.appendChild(link);
      link.click();
    });
  }
};
