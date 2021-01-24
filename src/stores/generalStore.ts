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
    @observable nextGoal = typeof cookie.get('nextGoal')!=="undefined"?JSON.parse(cookie.get('nextGoal')):{};
    @observable nextGoalInt = typeof cookie.get('next')!=="undefined"?JSON.parse(cookie.get('next')):{};

    @action.bound setUsername(username){
        this.username = username
    }
    @action.bound setData(data){
        this.data = data
    }
    @action.bound setNextGoal(data){
        this.nextGoal = data
    }
    @action.bound setNextGoalInt(data){
        this.nextGoalInt = data
    }



}
