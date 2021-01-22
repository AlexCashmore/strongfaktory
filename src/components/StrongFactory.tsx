import * as React from 'react';
import { observer } from 'mobx-react';
import ObservedStrongSurvey from "./StrongSurvey";

import {toJS} from "mobx";
import {rootStore} from "../stores/Stores";
import LineGraph from "./graph/daily";

export interface IHeaderState {
    username:any;
    submitted:any;
}
interface IHeaderProps {
    generalStore:any;

}


class StrongFactory extends React.Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps, state:IHeaderState) {
        super(props);
        this.state = { username: '',submitted:false };
    }
    setSubmitted(submitted){
        this.setState({submitted})

    }

    public render() {
        return (<div style={{height:'100%',width:'100%',backgroundColor:'#f5f4fa'}}>
                <div style={{display:'flex',justifyContent:'center',paddingTop:200}}><h3 style={{color:'#4264ea'}} className="strongFont"></h3></div>
                <div style={{display:'flex',height:400}}>
                    <div style={{width:'33%'}}>
                    </div>
                    <ObservedStrongSurvey rootStore={this.props.rootStore} setSubmitted={this.setSubmitted.bind(this)} />
                    <div>
                        <section className="dashboard content container fadedshort">
                            <div className="wrapper">
                                <LineGraph dataset={rootStore.generalStore.data} submitted={this.state.submitted} />
                            </div>
                        </section>
                    </div>

                    <div style={{width:'33%'}}>
                    <div><h2 className="strongFont" ></h2></div>
                </div>
                </div>
                <div style={{display:'flex',justifyContent:'center'}}><div style={{width:800,fontSize:14,margin:20,padding:20,backgroundColor:'#f5f4fa'}}>
                    {rootStore.generalStore.data.length<1?<div><p>
                            Start by entering your one rep maxes, your training maxes will be calculated at 90% of your true max.</p><p>
                        Each week, you will increase your training max if you were able to complete all the reps, <p>your new peak set will be suggested for you based on how many reps you achieved.</p>
                        <p>Your progress is stored in cookies and will be logged on the graph on the right and can be cleared at any time. </p>
                    </p></div>:null}
                </div>
                </div>

            </div>
        );
    }
}
const ObservedStrongFactory = observer(StrongFactory);
export default ObservedStrongFactory;
