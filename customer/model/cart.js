function CartClass() {
    this.productList = [];

    this.addProduct = function (productNew) {
        const index = this.checkExist(productNew);
        if (index == -1) {
            productNew.quantity++;
            this.productList.push(productNew);
        }
        else {
            this.productList[index].quantity += 1;
            // for(let i = 0; i<this.productList.length; i++){
            //     const product = this.productList[i];
            //     if(product.id === productNew.id){
            //         product.quantity++;
            //     }
            // }
        }
    }

    this.checkExist = function (productNew) {
        // let result = false;
        let indexCheck = -1;
        if (this.productList.length == 0) {
            return indexCheck;
        }

        this.productList.forEach(function (product, index) {
            if (product.id === productNew.id) {
                indexCheck = index;
            }
        })
        return indexCheck;
    }
}