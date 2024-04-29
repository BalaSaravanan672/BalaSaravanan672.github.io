// Function to open a specific category tab
function openCategory(categoryName) {
    // Hide all product containers initially
    const allContainers = document.querySelectorAll('.tabcontent');
    allContainers.forEach(container => {
        container.style.display = 'none';
    });

    // Display the container corresponding to the selected category
    const selectedContainer = document.getElementById(categoryName);
    if (selectedContainer) {
        selectedContainer.style.display = 'block';
    }
}

// Fetch product data from the API
fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the fetched data for debugging

        // Process the data and create product cards
        const menContainer = document.getElementById('men');
        const womenContainer = document.getElementById('women');
        const kidsContainer = document.getElementById('kids');

        data.categories.forEach(category => {
            const categoryContainer = getCategoryContainer(category.category_name);
            category.category_products.forEach(product => {
                const productCard = createProductCard(product); // Implement createProductCard function
                categoryContainer.appendChild(productCard);
            });
        });
    })
    .catch(error => console.error('Error fetching product data:', error));

// Function to create a product card
function createProductCard(product) {
    console.log('Creating product card:', product); // Log the product data for debugging
   
    const card = document.createElement('div');
    card.classList.add('product-card');

    // Create and append product image container
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.title;
    imageContainer.appendChild(image);
    card.appendChild(imageContainer);

    // Create and append product badge if it exists
    if (product.badge_text) {
        const badge = document.createElement('div');
        badge.classList.add('product-badge');
        badge.textContent = product.badge_text;
        imageContainer.appendChild(badge);
    }

    // Create and append product title
    const title = document.createElement('div');
    title.classList.add('product-title');
    title.textContent = product.title;
    card.appendChild(title);

    // Create and append product vendor
    const vendor = document.createElement('div');
    vendor.classList.add('product-vendor');
    vendor.textContent = 'Vendor: ' + product.vendor;
    card.appendChild(vendor);

    // Create and append product price
    const price = document.createElement('div');
    price.classList.add('product-price');
    price.textContent = 'Price: $' + product.price;
    card.appendChild(price);

    // Create and append product compare at price if it exists
    if (product.compare_at_price) {
        const comparePrice = document.createElement('div');
        comparePrice.classList.add('product-compare');
        comparePrice.textContent = 'Compare at Price: $' + product.compare_at_price;
        card.appendChild(comparePrice);

        // Calculate discount percentage
        const discountPercentage = ((product.compare_at_price - product.price) / product.compare_at_price) * 100;

        // Create and append product discount
        const discount = document.createElement('div');
        discount.classList.add('product-discount');
        discount.textContent = 'Discount: ' + Math.round(discountPercentage) + '% off';
        card.appendChild(discount);
    }

    // Add-to-cart button (dummy)
    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('add-to-cart');
    addToCartButton.textContent = 'Add to Cart';
    card.appendChild(addToCartButton);

    return card;
}

// Function to get the container for a specific category
function getCategoryContainer(categoryName) {
    switch (categoryName) {
        case 'Men':
            return document.getElementById('men');
        case 'Women':
            return document.getElementById('women');
        case 'Kids':
            return document.getElementById('kids');
        default:
            return null;
    }
}

// Initially open the 'Men' category tab
openCategory('men');
