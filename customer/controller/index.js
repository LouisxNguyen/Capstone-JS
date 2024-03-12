function domID(id) {
    return document.getElementById(id);
}
const api = new Api();

// LẤY THÔNG TIN SẢN PHẨM TỬ SERVER TRẢ VỀ
function getApiInfoProduct() {
    const promise = api.getApi();
    domID("loader").style.display = 'block'
    promise
        .then(function (dataProduct) {
            renderInfo(dataProduct.data);
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
    const formatVnd = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
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



const cartLuxe = new CartClass();
// ADD PRODUCT TO CART
function addToCart(id) {
    const promise = api.getDetailApi(id);
    promise
        .then(function (dataProduct) {
            let product = dataProduct.data;
            let productAdded = new ProductLuxe(product.id, product.name, product.price, product.type);
            let newQuantity = productAdded.checkQuantity(product.id);
            cartLuxe.addToCart(productAdded, newQuantity);
            console.log('cartLuxe:',cartLuxe.productList);
           
        })
        .catch(function (error) {
            console.log(error)
        })
}
