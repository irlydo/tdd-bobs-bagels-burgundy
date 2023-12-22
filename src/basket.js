const MENU = require("./menu.js")
const smallBasket = 5;
const mediumBasket = 10;
const largeBasket = 15;

class Basket {

    constructor(capacity = smallBasket) {
        this.basket = []
        this.basketSize = capacity
    }
    getBasket() {
        return this.basket
    }

    addItem(itemName, itemQuantity) {
        const fullMenu = MENU.GetMenu();
        if (!fullMenu[itemName]) {
            throw new Error("Item not found in the menu.");
        }
    
        const existingItem = this.basket.find(item => item.item === itemName);
        if (existingItem) {
            existingItem.quantity += itemQuantity;
        } else {
            this.basket.push({ item: itemName, quantity: itemQuantity, price: fullMenu[itemName] });
        }
    
        if (this.totalItemsInBasket() > this.basketSize) {
            throw new Error("Basket full, please choose a bigger basket.");
        }
    }

    totalItemsInBasket() {
        return this.basket.reduce((total, item) => total + item.quantity, 0);
    }

    removeItem(itemName, quantityToRemove = 1) {
        const itemIndex = this.basket.findIndex(item => item.item === itemName);
        if (itemIndex === -1) {
            throw new Error("This item is not in the basket.");
        }

        if (this.basket[itemIndex].quantity > quantityToRemove) {
            this.basket[itemIndex].quantity -= quantityToRemove;
        } else if (this.basket[itemIndex].quantity === quantityToRemove) {
            this.basket.splice(itemIndex, 1);
        } else {
            throw new Error("Not enough quantity in the basket to remove.");
        }
    }

    basketCapacity() {
        const totalCapacity = this.basket.reduce((total, quantity) => { return total + quantity.quantity }, 0)
        if (totalCapacity > this.basketSize) {
            return "Basket full, Please choose a bigger basket."
        }
    }

    priceChecker(itemName) {
        const fullMenu = MENU.GetMenu()
        for (const items in fullMenu)
            if (itemName === items) { return fullMenu[items] }
    }

    basketTotal() {
        let eachItem = []
        for (let i = 0; i < this.basket.length; i++) {
            eachItem.push(this.basket[i].quantity * this.basket[i].price)
        }
        const totalPrice = eachItem.reduce((total, quantity) => { return total + quantity }, 0)
        return ("£" + totalPrice)
    }
}


module.exports = Basket