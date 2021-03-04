import { makeAutoObservable } from 'mobx'
import axios from 'axios'

const URL = 'https://getlens-master.stage.dev.family/api/pages/kamery'

//TODO: Стор скорее всего - кракозябра. Но я учусь! :)
class Products {
    store = {
        products: [],
        filter: [],
    }
    filteredProducts = []
    filterParams = []
    isLoad = false
    constructor(){
        makeAutoObservable(this) 
    }
    
    async productsFetch() {
        if (!this.isLoad) {
            await axios.get(URL).then(res=>{
                this.store = {
                    products: res.data.products,
                    filter: res.data.filters[3].items,
                }
                this.isLoad = true
            })
        } 
    }

    filterParam(param, checked){
        if(checked) {
            this.filterParams = [...this.filterParams, param]
        } else {
            const editFilter = this.filterParams.filter(prm=>prm !== param) 
            this.filterParams = editFilter
        }
        this.filterProducts()
    }

    filterProducts(){
        if (this.filterParams.length === 0) {
            this.filteredProducts = this.store.products
        } else {
            const filtered = this.store.products.filter((product) => {
                const title = product.title.split(' ').splice(0,2).join(' ').toLowerCase()
                return this.filterParams.includes(title)
            })
            this.filteredProducts = filtered
        }
    }

    getProducts() {
        if (this.filteredProducts.length > 0) {
            return this.filteredProducts
        } else {
            return this.store.products
        }
    }
}

export const productsStore = new Products()

// TODO: Ниже представлена модель корзины с товарами. Я просто уже особо красиво возможно не успею это доделать. Простите.
// Но в компоненту карточки товара я принес все данные, для того, что бы вызвать метод addToBasket(товар) на кнопке и загнать выбранный товар в стор.
// Тем более надо как-то продумать вариант изменения кнопки с "В корзину" на "Добавлено(например)". Самое, что быстро приходит в голову это в самой компоненте
// карточки товара профильтровать два массива, что в баскете, что в основоном сторе. Это прям очень грязно и так с ходу не придумал. А может прямо локально в карточке собственный стейт завести на кнопку
// и добавить валидаций. Это надо хорошо подумать и на это надо время :( Хотя возможно последний вариант и будет самым оптимальным легко и просто, KISS, все дела... :)  
//
// class Basket {
//     basket = []
//   
//     constructor(){
//         makeAutoObservable(this) 
//     }
//
//     addToBasket(goods) {
//         this.basket.push(goods)
//     }
//
//     removeFromBasket(goods){
//         this.basket.filter(item=> item.id !== goods.id)
//     }
// }
//
// export const basketStore = new Basket()
