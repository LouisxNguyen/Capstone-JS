//GLOBAL
function domID(id) {
    return document.getElementById(id);
}




// TẠO ĐỊNH DẠNG CHO GIÁ TIỀN
const formatVnd = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
//GLOBAL-----------------------------


// CHAPTER I: XỬ LÝ NGHIỆP VỤ CHO SẢN PHẨM LẤY TỪ SERVER VỀ
const api = new Api();
// LẤY THÔNG TIN SẢN PHẨM TỬ SERVER TRẢ VỀ
function getApiInfoProduct() {
    const promise = api.getApi();
    domID("loader").style.display = 'block'
    promise
        .then(function (dataProduct) {
            renderInfo(dataProduct.data);
            //HÀM LẤY DỮ LIỆU TỪ LOCALSTORAGE LÊN 
            getLocalStorage();
            domID("loader").style.display = 'none'
        })
        .catch(function (error) {
            console.log(error)
            domID("loader").style.display = 'none'
        })
}
getApiInfoProduct();



// ĐƯA SẢN PHẨM LÊN BROWSER
function renderInfo(listProduct) {
    
    let content = ``;
    listProduct.forEach(function (product) {
        content += `
        <div class="col-12 col-md-6 col-lg-4 product__card">
                    <a href="#">
                        <div class="product__card__content">
                            <div class="header__card__product">
                                <img src="./asset/img/${product.img}" alt="">
                            </div>
                            <div class="body__card__product">
                                <div class="body__card__top">
                                    <h3 class="card__product__name">${product.name}</h3>
                                    <h4 class="card__product__type">${product.type}</h4>
                                </div>
                                <p class="card__product__screen card__details">Màn hình: ${product.screen}</p>
                                <p class="card__product__backCam card__details">Camera sau: ${product.backCamera}</p>
                                <p class="card__product__frontCam card__details">Camera trước: ${product.frontCamera}</p>
                                <p class="card__product__description card__details" style="font-style: italic">${product.desc}</p>
                                <div style="display: flex; align-item: center; margin-bottom: 15px">
                                    <h3 class="card__product__price"> ${formatVnd.format(product.price)}</h3>
                                    <button class="btn btn-outline-secondary ml-auto btn__addToCart" onclick="addToCart(${product.id})">Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
        `
    })
    domID("product__content__body").innerHTML = content;
}

// TYPE FILLTER
function typeFillter() {
    const typeOnClick = domID("typeFillter").value;
    console.log(typeOnClick)
    let arrFillter = [];
    const promise = api.getApi();
    promise
        .then(function (dataProduct) {
            dataProduct.data.forEach(function (product) {
                if (product.type === typeOnClick) {
                    arrFillter.push(product);
                    domID("close__typeFillter").style.display = 'block';
                    domID("close__nameOfType").innerHTML = product.type;
                }
                else if (typeOnClick === 'Lọc') {
                    arrFillter = dataProduct.data;
                    domID("close__typeFillter").style.display = 'none';
                }
                renderInfo(arrFillter);
            })

        })
        .catch(function (error) {
            console.log(error)
        })
}
// CLOSE TYPE FILLTER 
function closeTypeFillter(){
    domID("typeFillter").value = 'Lọc';
    domID("close__typeFillter").style.display = 'none';
    getApiInfoProduct();
}

//CHAPTER I: ----------------------------------------------------------------------------

//CHAPTER II: XỬ LÝ NGHIỆP VỤ CHO CART
const cartLuxe = new CartClass();
// ADD PRODUCT TO CART
function addToCart(id) {
    domID("btnCart").style.border = '1px solid red';
    domID("btnCart").style.color = 'red';
    const promise = api.getDetailApi(id);
    promise
        .then(function (dataProduct) {
            let product = dataProduct.data;
            let productAdded = new ProductLuxe(product.id, product.name, product.price, product.type, product.img);
            cartLuxe.addProduct(productAdded);
            setLocalStorage()
        })
        .catch(function (error) {
            console.log(error)
        })
}


// HÀM RENDER MODAL SAU KHI ADD SẢN PHẨM VÀO GIỎ HÀNG
function renderCart (listProduct){
    let content = '';
    listProduct.forEach(function(product){
        content += `
        <tr>
            <td >${product.name}</td>
            <td>${formatVnd.format(product.price)}</td>
            <td >
            <button id="btn__MinusQuan" class="btn__MinusQuan" onclick="changeQuantity(${product.id}, ${-1})"><i class="fa-solid fa-minus"></i></button>
            <span id="pdCart__Quantity" style="font-size: 18px; padding: 0 4px;">${product.quantity}</span>
            <button class="btn__PlusQuan" onclick="changeQuantity(${product.id}, ${1})"><i class="fa-solid fa-plus"></i></button>
            </td>
            <td>
            <img style="width: 50px; height: 50px; " src="./asset/img/${product.img}"></td>
            <td><button class="btn btn-link" style="color: black;" onclick="deleteProductInCart(${product.id})">Xoá</button></td>
        </tr>
        `
    })
    domID("tbody__CartProduct").innerHTML = content;
}

// SHOW MODAL OF CART WHEN USER OPEN CART
domID("btnCart").onclick = function (){
    domID("exampleModalLabel").innerHTML = 'YOUR CART';
    renderCart (cartLuxe.productList);
    totalPriceCart();
}

// CHANGE NUMBER OF PRODUCT IN CART
function changeQuantity (id, count){
    const newCart = cartLuxe.changeQuantityCart(id, count);
    renderCart (newCart);
    totalPriceCart();
    setLocalStorage()
}

// TOTAL PRICE
function totalPriceCart(){
    const total = cartLuxe.totalPrice();
    console.log('total:',total)
    domID("total__CartProduct").innerHTML = formatVnd.format(total);
    setLocalStorage()
} 

// DELETE PRODUCT IN CART 
function deleteProductInCart(id){
    const newCart = cartLuxe.deleteProduct(id);
    renderCart (newCart);
    totalPriceCart();
    setLocalStorage()
}

domID("btn__CheckOut").onclick = function (){
    const newCart = cartLuxe.clearCart();
    renderCart (newCart);
    totalPriceCart();
}
//CHAPTER II: -----------------------------------------------------------------


// Set localStorage
function setLocalStorage(){
    const arrString = JSON.stringify(cartLuxe.productList);
    localStorage.setItem('Cart', arrString);
}

function getLocalStorage(){
    const arrString = localStorage.getItem('Cart');
    const arrJSON = JSON.parse(arrString);
    
    cartLuxe.productList = arrJSON;
    renderCart (cartLuxe.productList);
}
// Set localstorage ---------------------------------------------
