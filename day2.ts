//! ----------------------------------- Aufgabe 1 & 2 ------------------------------------

type Product = {
    name: string;
    productId: number;
    imageId?: number;
}

type Image = {
    imageUrl: string;
    imageData: string;
    altText: string;
}

interface Products {
    [productId: number]: Product;
}

interface Images {
    [imageId: number]: Image;
}

type ProductImage = Products & Images;

const images: Images = {
    1: {
        imageUrl: "https://testImages.com/book",
        imageData: "This is a Book",
        altText: "Sorry could not load this book",
    },
    2: {
        imageUrl: "https://testImages.com/cd",
        imageData: "This is a CD",
        altText: "Sorry could not load this cd",
    },
    4: {
        imageUrl: "https://testImages.com/calculator",
        imageData: "This is a Calculator",
        altText: "Sorry could not laod this Calculator",
    },
};

const products: Products = {
    10: {
        name: "book",
        productId: 10,
        imageId: 1,
    },
    11: {
        name: "cd",
        productId: 11,
        imageId: 2,
    },
    12: {
        name: "laptop",
        productId: 12,
    },
    13: {
        name: "calculator",
        productId: 13,
        imageId: 4,
    },
};

// In this function, we iterate over the array of IDs and access the "products" object to retrieve the corresponding product.

/* If the product has an image, we first check if the corresponding "imageId" is defined and if there is actually an object in the "images" database. If both are true, we add the image to the product and create a new object of type ProductImage, which is a type intersection of Product and Image.

Otherwise, we simply return the product. */

function generateProducts(ids: number[]): (Product | ProductImage)[] {
    return ids.map((id) => {
        const product = products[id];
        if (product.imageId !== undefined && images[product.imageId] !== undefined) {
            const { imageUrl, imageData, altText } = images[product.imageId];
            const productImage = { ...product, imageUrl, imageData, altText };
            return productImage;
        }
        return product;
    });
}

console.log(generateProducts([13, 10, 11]));


//! ----------------------------------- Aufgabe 3 & 4 ------------------------------------

// Defines an interface for the properties required in an order
interface Order {
    Ordernumber: number;
    Amount: number;
    ProductIds: number;
}

// Defines an interface for the properties required in a PayPal payment
interface PayPal {
    email: string;
}

// Defines an interface for the properties required in a credit card payment
interface CreditCard {
    ccn: number;
}

// Defines a type that is an intersection of the Orders and CreditCard interfaces
type CreditCardOrder = CreditCard & Order;

// Defines a type that is an intersection of the Orders and Paypal interfaces
type PayPalOrder = PayPal & Order;

// Defines an object with properties that match the CreditCardOrder type
let KevinOrder = {
    Ordernumber: 1,
    Amount: 100,
    ProductIds: 10,
    ccn: 159753
};

// Defines an object with properties that match the PayPalOrder type
let FranzOrder = {
    Ordernumber: 2,
    Amount: 99,
    ProductIds: 11,
    email: "Franz@gmx.de"
}

// Defines a function that takes an argument of either a CreditCardOrder or PayPalOrder
function newOrder(order: CreditCardOrder | PayPalOrder) {
    console.log(order);
}

function processCreditCardOrder(order: CreditCardOrder): void {
    console.log("Contacting Credit Card Company for Order ", order);
}

function processPaypalOrder(order: PayPalOrder): void {
    console.log("Contacting PayPal for Order ", order);
}

function isCreditCardOrder(order: CreditCardOrder | PayPalOrder): order is CreditCardOrder {
    return "ccn" in (order as CreditCardOrder);
};

// Calls the newOrder function with kevinsOrder as the argument, which matches the CreditCardOrder type
newOrder(KevinOrder)

// Calls the newOrder function with franzOrder as the argument, which matches the PayPalOrder type
newOrder(FranzOrder)


export { }
