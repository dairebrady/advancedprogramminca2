const listProducts = 'api/products';
console.log("Testtest");

function getItems() {
    fetch(listProducts)
        .then(response => response.json())
        .then(data => { displayItems(data); console.log(data); })
        .catch(error => console.error('Unable to get items.', error));
}



async function getItem(itemId) {
    let getProduct = listProducts + '/' + itemId;
    try {
        console.log("1");
        let response = await fetch(getProduct)
        console.log("2");
        const data = await response.json();
        console.log("3");
        console.log("Within the getItem function: " + data.name)
        return data;
    } catch (error) {
        console.error('Unable to get item ' + itemId)
    }
}
/*()
    let response = await fetch(getProduct);
    let data = await response.text();
        .then(async response => {
            console.log(response);
            return await response.text();
        })
        .then(data => console.log("Data: " + data))
        .catch (error => console.error('Unable to get item ' + itemId));
}*/

function displayItems(data) {
    const gridContainer = document.getElementById("grid-container")
    gridContainer.innerHTML = '';

    data.forEach(item => {
        let productItem = document.createElement('div');
        productItem.className = 'grid-item';

        let imageContainer = document.createElement('img');
        imageContainer.src = "https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png";
        console.log(item.Image);

        let productDetails = document.createElement('div');
        productDetails.innerHTML = `<b>Name: </b>${item.name}<br><b>Quantity: </b>${item.quantity}<br><b>Price: </b>${item.price}`;

        let productToggle = document.createElement('div');
        productToggle.className = "product-toggle";
        productToggle.innerHTML = `<button type="button" id="button-${item.productID}-subtract" onclick="subtractCount('${item.productID}-count')">-</button><input id="${item.productID}-count" class="product-count" type="text" value="0"><button type="button" id="button-${item.productID}-add" onclick="addCount('${item.productID}-count', ${item.quantity})">+</button>`

        gridContainer.appendChild(productItem);
        productItem.appendChild(imageContainer);
        productItem.appendChild(productDetails);
        productItem.appendChild(productToggle);
        
    });
}

function displayCheckoutItem() {
    let selectedItems = [];
    let productAB = getItem("AB");
    productAB.then((data) => { console.log("Product AB: " + data) });
    let product;
    let productId;
    let productName;
    let itemCounts = document.getElementsByClassName('product-count');          //Gets all text boxes display amount of product requested

    Array.from(itemCounts).forEach(item => {                                                //Extracts product ID from the text box HTML element ID (eg. "AB", etc.)
        if (item.value > 0) {
            let selectedItem = [];
            productId = item.id.split('-')[0];
            console.log("Item.value: " + item.value);
            product = await getItem(productId);
            productName = product.name;
            productPrice = product.price;
            console.log(`[outside getItem function] items going into array: ${productName}, ${item.value}, ${productPrice}`);

            selectedItem[0].push(productName);
            selectedItem[1].push(item.value);
            selectedItem[2].push(productPrice);

            selectedItems.push(selectedItem);
        }
    });
    console.log(selectedItems);
}

function calculateCost(productId, quantity) {
    return 
}



function addCount(productInputBox, itemQuantity) {
    let productCount = document.getElementById(productInputBox).value;
    if (productCount == itemQuantity) {
        alert("you have exceeded the max available for this product");
    }
    else {
        document.getElementById(productInputBox).value++;                       //For some reason, I can't use the productCount variable here
    }                                                                           //to increment count (same for other function). Leaving it as
                                                                                //the DOM API for now
}

function subtractCount(productInputBox) {
    let productCount = document.getElementById(productInputBox).value;
    console.log(productCount);
    if (productCount <= 0) {
        alert("This product is not in your bag");
    }
    else {
        document.getElementById(productInputBox).value--;       // Stopped working
        console.log(productCount);
    }
    
}

function displayCheckout() {
    
}


























/*
function addItem() {
    const addNameTextbox = document.getElementById('add-name');

    const item = {
        isComplete: false,
        name: addNameTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = products.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-isComplete').checked = item.isComplete;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('edit-isComplete').checked,
        name: document.getElementById('edit-name').value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'product' : 'products';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}
*/