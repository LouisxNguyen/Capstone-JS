function LuxeAPI() {
    this.fetchInfo = function () {
        //Liên kết đến Sever lấy thông tin 
        return axios({
            url: 'https://65e7d56753d564627a8f5185.mockapi.io/api/LuxePhone',
            method: 'GET',
        });
    }
    this.fetchIndividualInfo = function (id) {
        //Liên kết đến Sever lấy thông tin 
        return axios({
            url: `https://65e7d56753d564627a8f5185.mockapi.io/api/LuxePhone/${id}`,
            method: 'GET',
        });
    }
    this.deleteProduct = function (id){
        return axios({
            url: `https://65e7d56753d564627a8f5185.mockapi.io/api/LuxePhone/${id}`,
            method: 'DELETE',
        });
    }
    this.addNewProduct = function (product){
        return axios({
            url: 'https://65e7d56753d564627a8f5185.mockapi.io/api/LuxePhone',
            method: 'POST',
            data: product,
        });
    }
    this.updateProduct = function (product){
        return axios({
            url: `https://65e7d56753d564627a8f5185.mockapi.io/api/LuxePhone/${product.id}`,
            method: 'PUT',
            data: product,
        });
    }
}
