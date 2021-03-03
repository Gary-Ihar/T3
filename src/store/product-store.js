import { makeAutoObservable } from 'mobx'
import axios from 'axios'

const URL = 'https://getlens-master.stage.dev.family/api/pages/kamery'

class Products {
    store = {
        products: [],
        filter: [],
    }
    filter = []
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

}

export const productsStore = new Products()
