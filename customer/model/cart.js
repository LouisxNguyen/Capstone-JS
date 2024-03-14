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


    // BẤM NÚT TĂNG GIẢM SẢN PHẨM
    this.checkIndex = function (id) {
        let indexCheck = -1;
        this.productList.forEach(function (product, index) {
            if (product.id == id) {
                indexCheck = index;
            }
        })
        return indexCheck;
    }

    this.changeQuantityCart = function (id, count) {
        const index = this.checkIndex(id);
        if (count != 1 && this.productList[index].quantity !== 1) {
            this.productList[index].quantity += count;
        }
        else if (count == 1) {
            this.productList[index].quantity += count;
        }
        return this.productList;
    }
    // KẾT THÚC: BẤM NÚT TĂNG GIẢM SẢN PHẨM-----------------------------
    
    // TÍNH TỔNG TIỀN 
    this.totalPrice = function () {
        let totalPrice = 0;
        this.productList.forEach(function (product) {
            totalPrice += Number(product.price)*Number(product.quantity);
        })
        return totalPrice;
    }

    //XOÁ SẢN PHẨM
    this.deleteProduct = function (id) {
        const index = this.checkIndex(id);
        this.productList.splice(index, 1);
        return this.productList;
    }

    // CLEAR CART
    this.clearCart = function(){
        this.productList = [];
        return this.productList;
    }
}