function CartClass (){
    this.productList = [];

    this.addToCart = function (product, quantity){
        if(quantity < 1 ){ 
            
            this.productList.push(product);
        }
        
    }
    
}