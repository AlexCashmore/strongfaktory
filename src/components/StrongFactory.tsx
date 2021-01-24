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
        const activeDL = rootStore.generalStore.nextGoalInt.deadlift;
        const activeBench = rootStore.generalStore.nextGoalInt.bench;
        const activeSquat = rootStore.generalStore.nextGoalInt.squat;
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
                    {/*TODO LP programme here - maxes up the top*/}
                    {rootStore.generalStore.data.length>=1?<table>
                        <thead>
                        <tr><td>{activeSquat}</td><td></td><td></td><td></td> <td>{activeBench}</td><td></td><td></td><td></td><td>{activeDL}</td><td></td></tr>
                        <tr><td> {parseFloat(0.9*activeSquat)}</td><td></td><td></td><td></td><td>{parseFloat(0.9*activeBench)}</td><td></td><td></td><td></td><td>{parseFloat(0.9*activeDL)}</td><td></td></tr>
                        </thead>
                        <tbody>
                        <tr><td className="routine-cell">Bench</td><td>0.65  x8</td><td>0.75  x6</td><td>0.85 x4</td><td>0.85 x4</td><td>0.85 x4</td><td>0.8 x5</td><td>0.75 x6</td><td>0.7 x7</td><td>0.6 x8</td></tr>
                        <tr><td>OHP</td><td>0.5 x6</td><td>0.6 x5</td><td>0.7 x3</td><td>0.7 x5</td><td>0.7 x7</td><td>0.7 x4</td><td>0.7 x6</td><td> 0.7 x8</td><td></td></tr>
                        <tr><td className="blank-cell"/></tr>
                        <tr><td>Squat</td><td>0.75 x5</td><td>0.85 x3</td><td>0.95 x1+</td><td>0.90 x3</td><td>0.85 x3</td><td>0.8 x3</td><td>0.75 x5</td><td>0.7 x5</td><td>0.6 x5</td></tr>
                        <tr><td>Deadlift</td><td>0.5 x5</td><td>0.6 x5</td><td>0.7 x3</td><td>0.7 x5</td><td>0.7 x7</td><td>0.7 x4</td><td>0.7 x6</td><td>0.7 x8</td><td>0.7 x8</td></tr>
                        <tr><td className="blank-cell"/></tr>
                        <tr><td>OHP</td><td>0.65 x5</td><td>0.75 x3</td><td>0.85 x1+</td><td>0.85 x3</td><td>0.85 x3</td><td>0.8 x3</td><td>0.75 x5</td><td>0.7 x5</td><td>0.6 x5+</td></tr>
                        <tr><td>Incline Bench</td><td>0.4 x6</td><td>0.5 x5</td><td>0.6 x3</td><td>0.6 x5</td><td>0.6 x7</td><td>0.6 x4</td><td> 0.6 x8</td><td>0.6  x8</td><td></td></tr>
                        <tr><td className="blank-cell"/></tr>
                        <tr><td>Deadlift</td><td>0.75 x5</td><td>0.85 x3</td><td>0.95 x1+</td><td>0.9 x3</td><td>0.85 x3</td><td>0.8 x3</td><td>0.75 x3</td><td>0.7 x3</td><td>0.6 x3</td></tr>
                        <tr><td>Front Squat</td><td>0.35 x5</td><td>0.45 x5</td><td>0.55 x3</td><td>0.55 x5</td><td>0.55 x7</td><td>0.55 x4</td><td>0.55 x6</td><td>0.55 x8</td><td></td></tr>
                        <tr><td className="blank-cell"/></tr>
                        <tr><td>Bench</td><td>0.65 x5</td><td>0.75 x3</td><td>0.85 x1+</td><td>0.85 x3</td><td>0.85 x5</td><td>0.8 x3</td><td>0.75 x5</td><td>0.7 x3</td><td>0.6 x5+</td></tr>
                        <tr><td>CG Bench</td><td>0.4 x6</td><td>0.5 x5</td><td>0.6 x3</td><td>0.6 x5</td><td>0.6 x7</td><td>0.6 x4</td><td>0.6 x6</td><td>0.6 x8</td><td></td></tr>




                        </tbody>
                    </table>:null}
                </div>
                </div>

            </div>
        );
    }
}
const ObservedStrongFactory = observer(StrongFactory);
export default ObservedStrongFactory;
