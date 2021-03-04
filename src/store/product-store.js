import { makeAutoObservable } from 'mobx'
import axios from 'axios'

const URL = 'https://getlens-master.stage.dev.family/api/pages/kamery'

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
