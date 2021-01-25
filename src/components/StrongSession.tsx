import * as React from 'react';
import { observer } from 'mobx-react';
import LineGraph from "./graph/daily.js";
import cookie from 'js-cookie';


import {toJS} from "mobx";
import moment from "moment";
import {rootStore} from "../stores/Stores";

export interface IHeaderState {
    index:any;
}
interface IHeaderProps {
    generalStore:any;
    session:any;
    lifts:any;
    resetSession:any;
}


class StrongSession extends React.Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps, state:IHeaderState) {
        super(props);
        this.state = {index:0}
    }
    iterateIndex(sessionLength){
        if(sessionLength===this.state.index){
            console.log('!');
            return this.props.resetSession();
        }
        this.setState({index:this.state.index+1});
    }
    getWeight(lifts,lift){
        switch(lift){
            case 'BenchV':
            case 'IBenchV':
            case 'BenchS':
            case 'CGBenchV':
                return lifts.bench;
            case 'SquatS':
            case 'FrontSquatV':
                return lifts.squat;
            case 'DeadliftV':
            case 'DeadliftS':
                return lifts.deadlift;
            case 'OHPS':
            case 'OHPV':
                return lifts.ohp;

        }

    }
    renderSetName(name){
        switch(name){
            case 'BenchV': return 'Bench Press';
            case 'IBenchV': return 'Incline Bench Press';
            case 'BenchS': return 'Bench Press';
            case 'CGBenchV':
                return 'Close Grip Bench Press';
            case 'SquatS':
                return 'Back Squat';
            case 'FrontSquatV':
                return 'Front Squat';
            case 'DeadliftV': return 'Deadlift';
            case 'DeadliftS': return 'Deadlift';
            case 'OHPS': return 'Overhead Press';
            case 'OHPV': return 'Overhead Press';

        }

    }
    render(){
        // @ts-ignore
        console.log(this.props.lifts)
        const session = this.props.session.map((lift)=>{const item = this.props.generalStore.sessionMultiplierSet[lift];
        return item.map((setLift,ix)=>{
            setLift.name = lift;
            setLift.weight=this.getWeight(this.props.lifts,lift);
            setLift.setWeight = this.getWeight(this.props.lifts,lift)*setLift.multiplier;
            return setLift;
        })
        });

        console.log('.!',session);
        const combinedSession = session[0].concat(session[1]);
    return(<div style={{cursor:'pointer'}} onClick={()=>{this.iterateIndex(combinedSession.length)}}><div style={{width:300,height:400,marginTop:50,backgroundColor:'orange',padding:50,borderRadius:12}}>
        {combinedSession.map((set,ix,arr)=>{
            if(this.state.index===arr.length&&ix===0){
                return(<div onClick={()=>{this.props.resetSession()}}>You have completed the workout! Tap to reset.</div>)
            }
            if(ix===this.state.index) {
            if (set.name) {
            return <div className="fadedshort" style={{color: arr[ix-1]&&(set.name!==arr[ix-1].name)?'#6bf5fa':'#fff',marginTop:150}}>{this.renderSetName(set.name)}
            <div style={{height: 60, width: '100%',fontSize:32}}>{Math.round(set.setWeight*100)/100} x {set.reps}</div>
            </div>
        }
            return <div style={{
            height: 60,
            width: '100%',
            backgroundColor: 'orange'
        }}>{set.setWeight} x {set.reps}</div>
        }
        })
        }</div></div>);
        }

}
const ObservedStrongSession = observer(StrongSession);
export default ObservedStrongSession;
