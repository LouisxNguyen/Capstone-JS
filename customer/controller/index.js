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
function closeTypeFillter() {
    domID("typeFillter").value = 'Lọc';
    domID("close__typeFillter").style.display = 'none';
    getApiInfoProduct();
}

const cartLuxe = new CartClass();
getLocalStorage();

// ADD PRODUCT TO CART
function addToCart(id) {
    const promise = api.getDetailApi(id);
    promise
        .then(function (dataProduct) {
            let product = dataProduct.data;
            let productAdded = new ProductLuxe(product.id, product.name, product.price, product.type, product.img);
            // let newQuantity = productAdded.checkQuantity(product.id);
            // cartLuxe.addToCart(productAdded, newQuantity);
            cartLuxe.addProduct(productAdded);
            console.log('cartLuxe:', cartLuxe.productList);
            setLocalStorage(cartLuxe.productList);
            // console.log('cartLuxe:',cartLuxe.productList);
        })
        .catch(function (error) {
            console.log(error)
        })
}

function renderCart() {
    let content = '';
    cartLuxe.productList.forEach(function (product) {
        content += `
        <tr>
            <td >${product.name}</td>
            <td>${product.price}</td>
            <td >
                <div style="display: flex;align-items: center;">
                    <button id="btnMinus__${product.id}" class="btn__MinusQuan" onclick="changeNumber('${product.id}', false)"><i class="fa-solid fa-minus"></i></button>
                    <span id="spanNumber__${product.id}" style="font-size: 20px;padding: 0 4px;">${product.quantity}</span>
                    <button class="btn__PlusQuan" onclick="changeNumber('${product.id}', true)"><i class="fa-solid fa-plus"></i></button>
                </div>
            </td>
            <td>
                <img style="width: 50px; height: 50px; margin: 10px 0" src="./asset/img/${product.img}">
            </td>
            <td style="width: 5%">
                <button style="width: 100%" class="btn btn-danger" onclick="delProductOfCart('${product.id}')">Xoá</button>
            </td>
        </tr>
        `
    })
    domID("tbody__CartProduct").innerHTML = content;
}
domID("btnCart").onclick = renderCart;

function delProductOfCart(id) {
    let index = -1;
    cartLuxe.productList.forEach(function (item, indexOfPrd) {
        if (item.id === id) {
            index = indexOfPrd;
        }
    });

    if(index !== -1 ) {
        cartLuxe.productList.splice(index, 1);
        setLocalStorage(cartLuxe.productList);
        renderCart();
    }
}

function changeNumber(id, isPlus) {
    let numberUpdated = 0;
    const number = Number(domID(`spanNumber__${id}`).innerHTML);
    if (!isPlus) {
        numberUpdated = number - 1;
        if (numberUpdated == 0) {
            domID(`btnMinus__${id}`).disabled = true;
        }

    } else {
        domID(`btnMinus__${id}`).disabled = false;
        numberUpdated = number + 1;
    }

    domID(`spanNumber__${id}`).innerHTML = numberUpdated;
    updateNumberProduct(id, numberUpdated);

}

function updateNumberProduct(id, number) {
    cartLuxe.productList.forEach(function (product) {
        if (product.id === id) {
            product.quantity = number;
        }
    });

    setLocalStorage(cartLuxe.productList);
}

domID("btnPay").onclick = function () {
    cartLuxe.productList = [];
    setLocalStorage([]);
    domID("md__close").click();
}

function setLocalStorage(products) {
    const prdString = JSON.stringify(products);
    localStorage.setItem("CartProduct", prdString);
}

function getLocalStorage() {
    if (!localStorage.getItem("CartProduct")) return;

    const prdString = localStorage.getItem("CartProduct");
    const prdArray = JSON.parse(prdString);
    cartLuxe.productList = prdArray;
}