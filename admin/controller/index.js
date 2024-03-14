//GLOBAL
function domID(id) {
    return document.getElementById(id);
}
const formatVnd = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
// Tạo đối tượng API 
const api = new LuxeAPI();

//Lấy sản phẩm
function getProduct() {
    const promise = api.fetchInfo();
    //Quá trình xử lý bất đồng bộ
    promise
        .then(function (product) {
            //Website chờ tới khi lấy được thông tin từ Sever
            //mới thực hiện hàm render
            renderProduct(product.data)
            setLocalStorage (product.data);
        })
        .catch(function (error) {
            console.log(error)
        })
}
getProduct();

//In sản phẩm ra browser
function renderProduct(productList) {
    let content = "";
    productList.forEach(function (product, index) {
        content += `
        <tr>
            <td>${index + 1}</td>
            <td style="font-weight:bold;">${product.name}</td>
            <td>${formatVnd.format(product.price)}</td>
            <td style="font-style:italic;">${product.type}</td>
            <td>
            <img src="../../asset/img/${product.img}" width="70">
            </td>
            <td>${product.desc}</td>
            <td>
            <button class="btn btn-outline-secondary" onclick="editProduct(${product.id})" data-toggle="modal"
            data-target="#addModal">Sửa</button>
            <button class="btn btn-danger" onclick="delProduct(${product.id})">Xoá</button>
            </td>
        </tr>
        `;
    })
    document.getElementById("tblDanhSachSP").innerHTML = content;
}

function delProduct(id) {
    const promise = api.deleteProduct(id);
    //Quá trình xử lý bất đồng bộ
    promise
        .then(function (product) {
            //Website chờ tới khi lấy được thông tin từ Sever
            //thì gọi lại hàm getProduct()- để lấy danh sách SP mới và
            // chạy lại renderProduct (product.data) để cập nhật ra browser
            getProduct();
            
        })
        .catch(function (error) {
            console.log(error)
        })
}

domID("btn__Add").onclick = function () {
    domID("luxeModalLabel").innerHTML = "Add New Product";
    domID("modal-footer").innerHTML = `<button class="btn btn-dark" onclick="getInputInfo()">Add New +</button>`;
}

function getInputInfo() {
    
    const name = domID("productNameForm").value;
    const price = domID("priceForm").value;
    const screen = domID("screenForm").value;
    const backCamera = domID("backCamForm").value;
    const frontCamera = domID("frontCamForm").value;
    const img = domID("imgForm").value;
    const desc = domID("descForm").value;
    const type = domID("typeForm").value;

    const product = new ProductLuxe("", name, price, screen, backCamera, frontCamera, img, desc, type,);

    const promise = api.addNewProduct(product);
    //Quá trình xử lý bất đồng bộ
    promise
        .then(function (product) {
            document.getElementsByClassName("close")[0].click();
            //Website chờ tới khi lấy được thông tin từ Sever
            //thì gọi lại hàm getProduct()- để lấy danh sách SP mới và
            // chạy lại renderProduct (product.data) để cập nhật ra browser
            getProduct();
            clearInfo();
        })
        .catch(function (error) {
            console.log(error)
        })
}

function editProduct(id) {
    domID("luxeModalLabel").innerHTML = "Edit Product";
    domID("modal-footer").innerHTML = `<button class="btn btn-dark" onclick="updateProduct(${id})">Update</button>`;
    const promise = api.fetchIndividualInfo(id);
    //Quá trình xử lý bất đồng bộ
    promise
        .then(function (product) {
            const productCurrent = product.data;
            domID("productNameForm").value= productCurrent.name;
            domID("priceForm").value=  productCurrent.price;
            domID("screenForm").value=  productCurrent.screen;
            domID("backCamForm").value=  productCurrent.backCamera;
            domID("frontCamForm").value=  productCurrent.frontCamera;
            domID("imgForm").value=  productCurrent.img;
            domID("descForm").value=  productCurrent.desc;
            domID("typeForm").value=  productCurrent.type;
        })
        .catch(function (error) {
            console.log(error)
        })
}

function updateProduct(id){
    const name = domID("productNameForm").value;
    const price = domID("priceForm").value;
    const screen = domID("screenForm").value;
    const backCamera = domID("backCamForm").value;
    const frontCamera = domID("frontCamForm").value;
    const img = domID("imgForm").value;
    const desc = domID("descForm").value;
    const type = domID("typeForm").value;
    const product = new ProductLuxe(id, name, price, screen, backCamera, frontCamera, img, desc, type,);
    console.log(product)
    const promise = api.updateProduct(product);
    //Quá trình xử lý bất đồng bộ
    promise
        .then(function (product) {
            document.getElementsByClassName("close")[0].click();
            getProduct();
            clearInfo()
        })
        .catch(function (error) {
            console.log(error)
        })
}
//clear info
function clearInfo(){
    domID("productNameForm").value="";
    domID("priceForm").value="";
    domID("screenForm").value="";
    domID("backCamForm").value="";
    domID("frontCamForm").value="";
    domID("imgForm").value="";
    domID("descForm").value="";
    domID("typeForm").value="";
}

// SẮP XẾP TĂNG DẦN
domID("btn__TangDan").onclick = function(){
    let arr = getLocalStorage();
    let newArr = [];
    arr.forEach(function(product){
        newArr = arr.sort(product.price, );
    })
    console.log(newArr)
}

// SEARCH
domID("searchProduct").addEventListener('keyup', function(){
    let searchText = domID("searchProduct").value.toLowerCase();
    let newSearchArr = getLocalStorage();
    let searchArr = [];
    newSearchArr.forEach(function(product){
        let typeTest = product.name.toLowerCase();
        if(typeTest.indexOf(searchText) !== -1){
            searchArr.push(product)
        }
    })
    renderProduct(searchArr);
})



function setLocalStorage (productList){
    const arrString = JSON.stringify(productList);
    localStorage.setItem('listProduct',arrString);
}
function getLocalStorage (){
    let searchArr = [];
    const arrString = localStorage.getItem('listProduct');
    const arrJson = JSON.parse(arrString);
    
    searchArr = arrJson;
    renderProduct(searchArr)
    return searchArr;
}
getLocalStorage ()