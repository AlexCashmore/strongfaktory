import { action, observable } from 'mobx';
import { rootStore } from './Stores';



export default class GeneralStore {
    rootStore: any;
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable username = 'User'

    @action.bound setUsername(username){
        this.username = username
    }



}
