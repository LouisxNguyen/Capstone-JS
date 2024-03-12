function ProductLuxe ( 
    
    _id,
    _name,
    _price,
     _type,
    ){
    this.id = _id;
    this.name = _name;
    this.price = _price;
    this.type = _type;
    this.quantity = 0;

    this.checkQuantity = function(id){
        if(this.id = id){
            let newQuantity = this.quantity++;
            return newQuantity;
        }
    }
}