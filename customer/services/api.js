function Api (){

    this.getApi = function (){
        return axios({
            url: 'https://65e7d56753d564627a8f5185.mockapi.io/api/LuxePhone',
            method: 'GET',
        })
    }
    this.getDetailApi = function (id){
        return axios({
            url: `https://65e7d56753d564627a8f5185.mockapi.io/api/LuxePhone/${id}`,
            method: 'GET',
        })
    }
}