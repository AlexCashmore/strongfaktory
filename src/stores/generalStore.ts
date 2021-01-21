import { action, observable } from 'mobx';
import { rootStore } from './Stores';
import cookie from 'js-cookie';


export default class GeneralStore {
    rootStore: any;
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable username = 'User'
    @observable data = typeof cookie.get('data')!=="undefined"?JSON.parse(cookie.get('data')):[];

    @action.bound setUsername(username){
        this.username = username
    }
    @action.bound setData(data){
        this.data = data
    }



}
