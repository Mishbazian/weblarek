import { ProductApi } from "./components/api/ProductApi";
import { Api } from "./components/base/Api";
import { Buyer } from "./components/models/Buyer";
import { Cart } from "./components/models/Cart";
import { Catalogue } from "./components/models/Catalogue";
import "./scss/styles.scss";
import { IProduct } from "./types";
import { API_URL } from "./utils/constants";
import { apiProducts } from "./utils/data";

//Тестирование методов
//Каталог
const productsModel = new Catalogue();
console.log("Пустой массив товаров из каталога: ", productsModel.getProducts());
//Наполним каталог
productsModel.setProducts(apiProducts.items);
console.group("Массив товаров из каталога: ")
console.table(productsModel.getProducts());
console.groupEnd()

//Получим товар по id
let product = productsModel.getProductById(
    "854cef69-976d-4c2a-a18c-2aa45046c390",
) as IProduct;
console.group("Продукт, полученный по id 854cef69-976d-4c2a-a18c-2aa45046c390");
console.table(product)
console.groupEnd()

//добавим выбранный товар
productsModel.setSelectedProduct(product);
console.log("Выбранный товар - ", productsModel.getSelectedProduct());
//изменим выбранный товар
product = productsModel.getProductById(
    "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
) as IProduct;
productsModel.setSelectedProduct(product);
console.log("Выбранный товар - ", productsModel.getSelectedProduct());

//Корзина
const cartModel = new Cart();
console.log("Пустая корзина: ", cartModel.getProducts());
//наполним корзину
productsModel.getProducts().forEach((item) => {
    cartModel.addProduct(item);
});


console.group("Наполненная корзина: ")
console.table([...cartModel.getProducts()])
console.log("всего товаров -",
    cartModel.getProdctsCount(),
    "на сумму - ",
    cartModel.getFullCost(),)
    console.log(
    "есть ли товар 854cef69-976d-4c2a-a18c-2aa45046c390 в корзине? ",
    cartModel.hasProduct("854cef69-976d-4c2a-a18c-2aa45046c390"),
);
console.groupEnd()

//есть ли товар в корзине?

// удалим один товар из корзины
cartModel.removeProduct(cartModel.getProducts()[0]);
console.group("Корзина после удаления одного товара: ")
console.table([...cartModel.getProducts()])
console.log("всего товаров -",
    cartModel.getProdctsCount(),
    "на сумму - ",
    cartModel.getFullCost(),)
    console.log(
    "есть ли удаленный товар 854cef69-976d-4c2a-a18c-2aa45046c390 в корзине? ",
    cartModel.hasProduct("854cef69-976d-4c2a-a18c-2aa45046c390"),
);
console.groupEnd()

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
console.group("Пустые данные покупателя: ")
console.table(buyerModel.getData());
console.table(buyerModel.validateData())
console.groupEnd()

//Запишем часть данных
buyerModel.setData({payment: "Cash", phone: "8880022222"})
console.group("Данные покупателя заполнены частично: ")
console.table(buyerModel.getData());
console.table(buyerModel.validateData())
console.groupEnd()

//Запишем все данные
buyerModel.setData({phone: "80000000000", address: "Масква", email: "кокоййто мейл"})
console.group("Данные покупателя дозаполнены полностью: ")
console.log(buyerModel.getData());
console.log("Валидация (все поля заполнены) - ", buyerModel.validateData())
console.groupEnd()

//Очистим все данные
buyerModel.clearData()
console.group("Данные покупателя после очистки: ")
console.table(buyerModel.getData());
console.groupEnd()
//Тестируем получение данных с сервера
const api = new ProductApi(new Api(API_URL));
//Обновление данных с сервера и наолние каталога
async function updateCatalogue() {
    try {
        const productsList = await api.getProducts();
        //Наполним каталог
        productsModel.setProducts(productsList);
        console.group("==Каталог заполненный с сервера==")
        console.table(productsList);
        console.groupEnd()
    } catch (err: unknown) {
        console.error("Couldn't load data: ", err);
    }
}
updateCatalogue();