class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product) {

        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-2">
                <div class="card-header">
                    <strong class="">Product Name</strong>: <b class="text-success">${product.name}</b>
                    <strong class="">Product Price</strong>: <b class="text-success">${product.price}</b>
                    <strong class="">Product Year</strong>: <b class="text-success">${product.year}</b>
                    <button type="button" class="btn btn-outline-danger" name="delete">Delete</button>
                </div
            </div>
        `;
        productList.appendChild(element);
        this.resetForm();
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product has been deleted', 'danger')
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // Showing in DOM
        const container = document.querySelector('.container');
        const app = document.getElementById('app');
        container.insertBefore(div, app);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);

    }
}

// Get events from DOM

const formData = document.getElementById('product-form');
formData.addEventListener('submit', function (e) {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;
    const product = new Product(name, price, year);
    const ui = new UI();
    if (name === ''|| price === '' || year === '') {
        return ui.showMessage('Complete fields', 'warning')
    }
    ui.addProduct(product);
    ui.showMessage('Product has been added succesfully', 'success')
    e.preventDefault();
});

const productList = document.getElementById('product-list');
productList.addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteProduct(e.target);
})
