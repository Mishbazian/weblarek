import { Buyer } from "./components/models/Buyer";
import { Cart } from "./components/models/Cart";
import { Catalogue } from "./components/models/Catalogue";
import "./scss/styles.scss";
import { apiProducts } from "./utils/data";
//Каталог
const productsModel = new Catalogue();
console.log("Пустой массив товаров из каталога: ", productsModel.getProducts());
//Наполним каталог
productsModel.setProducts(apiProducts.items);
console.log("Массив товаров из каталога: ", productsModel.getProducts());
//Получим товар по id
let product = productsModel.getProductById(
    "854cef69-976d-4c2a-a18c-2aa45046c390",
);
console.log("Продукт, полученный по id", product);

//добавим выбранный товар
productsModel.setSelectedProduct("854cef69-976d-4c2a-a18c-2aa45046c390");
console.log("Выбранный товар - ", productsModel.getSelectedProduct());
//изменим выбранный товар
productsModel.setSelectedProduct("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");
console.log("Выбранный товар - ", productsModel.getSelectedProduct());

//Корзина
const cartModel = new Cart();
console.log("Пустая корзина: ", cartModel.getProducts());
//наполним корзину
productsModel.getProducts().forEach((item) => {
    cartModel.addProduct(item);
});
console.log(
    "Наполненная корзина: ",
    [...cartModel.getProducts()],
    "всего товаров -",
    cartModel.getProdctsCount(),
    "на сумму - ",
    cartModel.getFullCost(),
);

//есть ли товар в корзине?
console.log(
    "есть ли товар в корзине? ",
    cartModel.hasProduct("854cef69-976d-4c2a-a18c-2aa45046c390"),
);
// удалим один товар из корзины
cartModel.removeProduct("854cef69-976d-4c2a-a18c-2aa45046c390");
console.log(
    "корзина после удаления одного товара: ",
    [...cartModel.getProducts()],
    "всего товаров -",
    cartModel.getProdctsCount(),
    "на сумму - ",
    cartModel.getFullCost(),
);
console.log(
    "есть ли удаленный товар в корзине? ",
    cartModel.hasProduct("854cef69-976d-4c2a-a18c-2aa45046c390"),
);
//Очистим корзину
cartModel.clearProducts()
console.log(
    "корзина после полной очистки: ",
    [...cartModel.getProducts()],
    "всего товаров -",
    cartModel.getProdctsCount(),
    "на сумму - ",
    cartModel.getFullCost(),
);

//Покупатель
const buyerModel = new Buyer();
console.log("Пустые данные покупателя: ", buyerModel.getData());
console.log("Валидация - ", buyerModel.validateData())

//Запишем часть данных
buyerModel.setData({payment: "Cash", phone: "8880022222"})
console.log("Данные покупателя: ", buyerModel.getData());
console.log("Валидация - ", buyerModel.validateData())
//Запишем все данные
buyerModel.setData({payment: "Online", phone: "80000000000", address: "Масква", email: "кокоййто мейл"})
console.log("Данные покупателя: ", buyerModel.getData());
console.log("Валидация - ", buyerModel.validateData())
//Очистим все данные
buyerModel.clearData()
console.log("Данные покупателя после очистки: ", buyerModel.getData());
console.log("Валидация - ", buyerModel.validateData())