import {
    action, configure, decorate, observable,
} from 'mobx';
import generalStore from "./generalStore";
import {create} from "mobx-persist";
configure({ enforceActions: 'observed' });

const hydrate = create({storage:localStorage,jsonify:true});

export class RootStore {
    generalStore: generalStore;

    constructor() {
        this.generalStore = new generalStore(this);
    }

}

export const rootStore = new RootStore();
