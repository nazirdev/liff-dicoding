let modalCart = document.getElementById('modal-cart');
let cartItems = document.querySelector('.cart-items');
let totalPrice = document.querySelector('.total-price');


let cart = [];
let btnDOM = [];

let no = 1;

let btnsAdd = [...document.querySelectorAll('.btn-add')];
btnDOM = btnsAdd;
btnsAdd.forEach(btnAdd => {
    no++
    let id = btnAdd.dataset.id
    let isCart = cart.find(item => item.id === id);

    if (isCart) {
        btnAdd.innerHTML = 'Dalam Keranjang';
        btnAdd.disabled = true;
    }

    btnAdd.addEventListener('click', () => {
        btnAdd.innerHTML = 'Dalam Keranjang'
        btnAdd.disabled = true;

        const productDOM = btnAdd.parentNode.parentNode
        const product = {
            iddata: productDOM.querySelector('#id-data').innerHTML,
            img: productDOM.querySelector('#product-img').getAttribute('src'),
            name: productDOM.querySelector('#product-name').innerHTML,
            price: productDOM.querySelector('#product-price').innerHTML,
            quantity: 1
        }

        cart.push(product);
        setCartValue(cart);
        insertItemToProduct(product);
    })
})

function insertItemToProduct(product) {
    let result = `
        <tr class>
            <td>${product.no}</td>
            <td><img src='${product.img}' style="width: 50px;"></td>
            <td class='nama-product'>${product.name}</td>
            <td>
                <a class='btn btn-primary addE' data-id='${product.iddata}'>
                    <span id='nextcok' class='fa fa-chevron-up' data-id='${product.iddata}'></span>
                </a>
                <span class="item-amount">${product.quantity}</span>
                <button class='btn btn-primary backE' data-id='${product.iddata}'>
                    <span id='backcok' class='fa fa-chevron-down' data-id='${product.iddata}'></span>
                </button>
            </td>
            <td id='pricex'>${product.price}</td>
            <td><button class='btn btn-danger deleteItem' data-id='${product.iddata}'><span id='trachcok' class='fa fa-trash' data-id='${product.iddata}'></span></button></td>
        </tr>
    `;
    modalCart.innerHTML += result;
}

function setCartValue(cart){
    let totalHarga = 0;
    let itemsTotal = 0;

    cart.map(item => {
        totalHarga += parseInt(item.price) * item.quantity;
        itemsTotal += item.quantity
    })
    totalPrice.innerHTML = totalHarga;
    cartItems.innerHTML = itemsTotal;
}


modalCart.addEventListener('click', (event) => {
    if(event.target.classList.contains('deleteItem')){
        let removeItem = event.target;
        let id = removeItem.dataset.id;

        modalCart.removeChild(removeItem.parentElement.parentElement);
        removeItems(id)
    }else if (event.target.classList.contains('addE')) {
        let addMount = event.target;
        let id = addMount.dataset.id;
        let tempItem = cart.find(item => item.iddata === id);
        tempItem.quantity = tempItem.quantity + 1
        setCartValue(cart);
        addMount.nextElementSibling.innerHTML = tempItem.quantity
    }else if (event.target.classList.contains('backE')) {
        let lowAmount = event.target;
        let id = lowAmount.dataset.id;
        let tempItem = cart.find(item => item.iddata === id);
        tempItem.quantity = tempItem.quantity - 1
        setCartValue(cart);
        lowAmount.previousElementSibling.innerHTML = tempItem.quantity

        if (tempItem.quantity > 0) {
            setCartValue(cart);
            lowAmount.previousElementSibling.innerHTML = tempItem.quantity
        }else {
            modalCart.removeChild(lowAmount.parentElement.parentElement);
            removeItems(id);
        }
    }
})

function removeItems(id){
    cart = cart.filter(item => item.iddata !== id);
    setCartValue(cart);
    let button = getSingleButton(id);
    button.innerHTML = `
        <i class="fa fa-cart-plus"></i>
    `
    button.disabled = false;
}

function getSingleButton(id) {
    return btnDOM.find(button => button.dataset.id === id);
}


let harga = 0
document.getElementById('cek').addEventListener('click', () => {
    let makanan = cart.filter(item => item)
    for(let i = 0; i < makanan.length; i++) {
        harga += parseInt(makanan[i].price)
    }
    // console.log(harga)

    if (!liff.isInClient()) {
        senAlertNotification();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Catatan baru berhasil disimpan"
        }]).then(function() {
            alert('Catatan Tersimpan');
        }).catch(function(error) {
            alert('Aduh kok error ya...');
        });
    }
})