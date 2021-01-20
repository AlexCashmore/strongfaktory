import * as React from 'react';
import { observer } from 'mobx-react';
import ObservedStrongSurvey from "./StrongSurvey";

import {toJS} from "mobx";
import {rootStore} from "../stores/Stores";

export interface IHeaderState {
    username:any;
}
interface IHeaderProps {
    generalStore:any;

}


class StrongFactory extends React.Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps, state:IHeaderState) {
        super(props);
        this.state = { username: '' };
    }

    public render() {
        return (<div style={{height:'100%',width:'100%',backgroundColor:'#f5f4fa'}}>
                <div style={{display:'flex',justifyContent:'center',marginTop:200}}><h3 style={{color:'#4264ea'}}>Strong Factory Welcomes You.</h3></div>
                <div>
                    <ObservedStrongSurvey rootStore={this.props.rootStore} />
                </div>
            </div>
        );
    }
}
const ObservedStrongFactory = observer(StrongFactory);
export default ObservedStrongFactory;
