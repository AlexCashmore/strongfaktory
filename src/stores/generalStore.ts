import { action, observable } from 'mobx';
import { rootStore } from './Stores';
import cookie from 'js-cookie';
import {persist} from "mobx-persist";


export default class GeneralStore {
    rootStore: any;
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable @persist username =  typeof cookie.get('username')!=="undefined"?cookie.get('username'):'User';
    @observable @persist data = typeof cookie.get('data')!=="undefined"?JSON.parse(cookie.get('data')):[];
    @observable @persist nextGoal = typeof cookie.get('nextGoal')!=="undefined"?JSON.parse(cookie.get('nextGoal')):{};
    @observable @persist nextGoalInt = typeof cookie.get('next')!=="undefined"?JSON.parse(cookie.get('next')):{};
    @observable sessionMultiplierSet = {BenchV:[{multiplier:0.65,reps:8},{multiplier:0.75,reps:6},{multiplier:0.85,reps:4},{multiplier:0.85,reps:4} ,{multiplier:0.85,reps:4} ,{multiplier:0.8,reps:5},{multiplier:0.75,reps:6},{multiplier:0.7,reps:7},{multiplier:0.6,reps:8}],
        OHPV:[{multiplier:0.5,reps:6},{multiplier:0.6,reps:5} ,{multiplier:0.7,reps:3},{multiplier:0.7,reps:5},{multiplier:0.7,reps:7},{multiplier:0.7,reps:4},{multiplier:0.7,reps:6},{multiplier:0.7,reps:8}],

        SquatS:[{multiplier:0.75,reps:5},{multiplier:0.85,reps:3},{multiplier:0.95,reps:1},{multiplier:0.90,reps:3},{multiplier:0.85,reps:3},{multiplier:0.8,reps:3},{multiplier:0.75,reps:3},{multiplier:0.7,reps:5},{multiplier:0.6,reps:5}],
        DeadliftV:[{multiplier:0.5,reps:5},{multiplier:0.6,reps:5},{multiplier:0.7,reps:3},{multiplier:0.7,reps:5},{multiplier:0.7,reps:7},{multiplier:0.7,reps:4},{multiplier:0.7,reps:6},{multiplier:0.7,reps:8},{multiplier:0.7,reps:8}],

        OHPS:[{multiplier:0.65,reps:5},{multiplier:0.75,reps:3},{multiplier:0.85,reps:1},{multiplier:0.85,reps:3},{multiplier:0.85,reps:3},{multiplier:0.8,reps:3},{multiplier:0.75,reps:5},{multiplier:0.7,reps:5},{multiplier:0.6,reps:5}],
        IBenchV:[{multiplier:0.4,reps:6},{multiplier:0.5,reps:5},{multiplier:0.6,reps:3},{multiplier:0.6,reps:5},{multiplier:0.6,reps:7},{multiplier:0.6,reps:4},{multiplier:0.6,reps:8},{multiplier:0.6,reps:8}],

        DeadliftS:[{multiplier:0.75,reps:5},{multiplier:0.85,reps:3},{multiplier:0.95,reps:1},{multiplier:0.9,reps:3},{multiplier:0.85,reps:3} ,{multiplier:0.8,reps:3} ,{multiplier:0.75,reps:3} ,{multiplier:0.7,reps:3}  ,{multiplier:0.6,reps:3}],
        FrontSquatV:[{multiplier:0.35,reps:5} ,{multiplier:0.45,reps:5} ,{multiplier:0.55,reps:3} ,{multiplier:0.55,reps:5} ,{multiplier:0.55,reps:7},{multiplier:0.55,reps:4} ,{multiplier:0.55,reps:6},{multiplier:0.55,reps:8}],

        BenchS:[{multiplier:0.65,reps:5}  ,{multiplier:0.75,reps:3}  ,{multiplier:0.85,reps:1},{multiplier:0.85,reps:3}  ,{multiplier:0.85,reps:5} ,{multiplier:0.8,reps:3}  ,{multiplier:0.75,reps:5}  ,{multiplier:0.7,reps:3}  ,{multiplier:0.6,reps:5}],
        CGBenchV:[{multiplier:0.4,reps:6},{multiplier:0.5,reps:5} ,{multiplier:0.6,reps:3} ,{multiplier:0.6,reps:5} ,{multiplier:0.6,reps:7} ,{multiplier:0.6,reps:4} ,{multiplier:0.6,reps:6} ,{multiplier:0.6,reps:8}],


    };
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
