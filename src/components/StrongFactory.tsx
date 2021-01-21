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
                <div style={{display:'flex',justifyContent:'center',paddingTop:200}}><h3 style={{color:'#4264ea'}} className="strongFont"></h3></div>
                <div style={{display:'flex'}}>
                    <div style={{width:'33%'}}>
                        <div><h2 className="strongFont" style={{fontSize:300,color:'#eeecf9',
                            lineHeight: '300px',
                            marginTop:0}}><span style={{color:'#f5f4fa',fontSize:100}}>WELCOME TO</span> STRONG FACTORY</h2></div>
                    </div><ObservedStrongSurvey rootStore={this.props.rootStore} /><div style={{width:'33%'}}>
                    <div><h2 className="strongFont" ></h2></div>
                </div>
                </div>
            </div>
        );
    }
}
const ObservedStrongFactory = observer(StrongFactory);
export default ObservedStrongFactory;
