import * as React from 'react';
import { observer } from 'mobx-react';
import ObservedStrongSurvey from "./StrongSurvey";

import {toJS} from "mobx";
import {rootStore} from "../stores/Stores";
import LineGraph from "./graph/daily";
import ObservedStrongSession from "./StrongSession";

export interface IHeaderState {
    username:any;
    submitted:any;
    showGraph:any;
    training:any;
    session:any;
}
interface IHeaderProps {
    generalStore:any;

}


class StrongFactory extends React.Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps, state:IHeaderState) {
        super(props);
        this.state = { username: '',submitted:false,showGraph:false,training:false };
    }
    toggleGraph(){
        this.setState({showGraph:!this.state.showGraph})
    }
    resetSession(){
        console.log(this.state.session,'reset');
        this.setState({session:false})
    }
    setSubmitted(submitted){
        this.setState({submitted})

    }
    calculateWeight(multiplier,weight){
        // @ts-ignore
        return Math.round(parseFloat(weight*multiplier)*100)/100 ;
    }
    renderSession(lifts){
        console.log('????',this.state.session);
        const defaultSession = (<div style={{height: '100%', width: '100%'}}>
            <div style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: 12,
                backgroundColor: '#f5f4fa'
            }}><h3 style={{color: '#4264ea'}}>Select Session:</h3></div>
            <br/>
            <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center'}}>
                <div onClick={() => {
                    this.setState({session: 'BV'})
                }} style={{
                    cursor: 'pointer',
                    width: '100%',
                    borderRadius: 12,
                    backgroundColor: '#4264ea',
                    color: '#fff',
                    height: 100,
                    margin: 10,
                    paddingTop: 40
                }}>Bench Volume
                </div>
                <div onClick={() => {
                    this.setState({session: 'SS'})
                }} style={{
                    cursor: 'pointer',
                    width: '100%',
                    borderRadius: 12,
                    backgroundColor: '#4264ea',
                    color: '#fff',
                    height: 100,
                    margin: 10,
                    paddingTop: 40
                }}>Squat Strength
                </div>
                <div onClick={() => {
                    this.setState({session: 'OS'})
                }} style={{
                    cursor: 'pointer',
                    width: '100%',
                    borderRadius: 12,
                    backgroundColor: '#4264ea',
                    color: '#fff',
                    height: 100,
                    margin: 10,
                    paddingTop: 40
                }}>OHP Strength
                </div>
                <div onClick={() => {
                    this.setState({session: 'DS'})
                }} style={{
                    cursor: 'pointer',
                    width: '100%',
                    borderRadius: 12,
                    backgroundColor: '#4264ea',
                    color: '#fff',
                    height: 100,
                    margin: 10,
                    paddingTop: 40
                }}>Deadlift Strength
                </div>
                <div onClick={() => {
                    this.setState({session: 'BS'})
                }} style={{
                    cursor: 'pointer',
                    width: '100%',
                    borderRadius: 12,
                    backgroundColor: '#4264ea',
                    color: '#fff',
                    height: 100,
                    margin: 10,
                    paddingTop: 40
                }}>Bench Strength
                </div>
            </div>

        </div>);
        if(!this.state.session||this.state.session==='false') {
            return defaultSession
        }
        else{
            switch(this.state.session){
                case 'BV':return(<ObservedStrongSession resetSession={this.resetSession.bind(this)} lifts={lifts} generalStore={rootStore.generalStore} session={['BenchV','OHPV']} />)
                case 'SS':return(<ObservedStrongSession resetSession={this.resetSession.bind(this)} lifts={lifts}  generalStore={rootStore.generalStore}  session={['SquatS','DeadliftV']} />)
                case 'OS':return(<ObservedStrongSession resetSession={this.resetSession.bind(this)} lifts={lifts}  generalStore={rootStore.generalStore}  session={['OHPS','IBenchV']} />)
                case 'DS':return(<ObservedStrongSession resetSession={this.resetSession.bind(this)} lifts={lifts}  generalStore={rootStore.generalStore}  session={['DeadliftS','FrontSquatV']} />)
                case 'BS':return(<ObservedStrongSession resetSession={this.resetSession.bind(this)} lifts={lifts}  generalStore={rootStore.generalStore}  session={['BenchS','CGBenchV']} />)
                case false: return defaultSession;
                default: return defaultSession;
            }
        }

    }

    public render() {
        const activeDL = rootStore.generalStore.nextGoalInt.deadlift;
        const activeBench = rootStore.generalStore.nextGoalInt.bench;
        const activeSquat = rootStore.generalStore.nextGoalInt.squat;
        const activeOHP = Math.round(0.7*rootStore.generalStore.nextGoalInt.bench);

        return (<div style={{height:'84%',width:'100%',backgroundColor:'#f5f4fa'}}>
                <div className={`training-select ${this.state.training?'slider':''}`}>
                    <div>{this.state.training?<div style={{position:'absolute',right:'38%',top:100,width:600,height:600,backgroundColor:'#f5f4fa',borderRadius:12}}>
                        <div  className="normal" style={{width:'100%'}}>{this.renderSession({deadlift:activeDL,bench:activeBench,squat:activeSquat,ohp:activeOHP})}</div>
                    </div>:null}</div>
                    <div style={{cursor:'pointer'}}  onClick={()=>{this.setState({training:!this.state.training})}}><h3 >{this.state.training?'PROGRESSION':'TRAINING'}</h3></div>
                </div>
                <div style={{display:'flex',justifyContent:'center'}}><h3 style={{color:'#4264ea'}} className="strongFont"></h3></div>
                <div style={{display:'flex',justifyContent:'flex-end',height:480}}>
                    <div style={{width:'33%'}}>
                    </div>
                    <ObservedStrongSurvey toggleGraph={this.toggleGraph.bind(this)} rootStore={this.props.rootStore} setSubmitted={this.setSubmitted.bind(this)} />
                    {this.state.showGraph?<div>
                        <section className="dashboard content container fadedshort">
                            <div className="wrapper">
                                <LineGraph dataset={rootStore.generalStore.data} submitted={this.state.submitted} />
                            </div>
                        </section>
                    </div>:null}

                    <div style={{width:'33%'}}>
                    <div><h2 className="strongFont" ></h2></div>
                </div>
                </div>
                <div style={{display:'flex',justifyContent:'center',height:600}}><div className="scrollbar" style={{overflowY:'auto',maxHeight:600,width:800,fontSize:14,margin:20,padding:20,backgroundColor:'#f5f4fa'}}>
                    {rootStore.generalStore.data.length<1?<div><p>
                            Start by entering your one rep maxes, your training maxes will be calculated at 90% of your true max.</p><p>
                        Each week, you will increase your training max if you were able to complete all the reps, <p>your new peak set will be suggested for you based on how many reps you achieved.</p>
                        <p>Your progress is stored in cookies and will be logged on the graph on the right and can be cleared at any time. </p>
                    </p></div>:null}
                    {/*TODO LP programme here - maxes up the top*/}
                    {rootStore.generalStore.data.length>=1?<table className="scrollbar" style={{maxHeight:600,height:600}}>
                        <thead>
                        <tr><td>Max:</td><td>Squat - {activeSquat}</td><td className="blank-cell"></td><td className="blank-cell"></td><td className="blank-cell"></td> <td>Bench - {activeBench}</td><td className="blank-cell"></td><td className="blank-cell"></td><td className="blank-cell"></td><td>Deadlift - {activeDL}</td></tr>
                        <tr><td>TM: </td><td>Squat - {parseFloat(0.9*activeSquat)}</td><td className="blank-cell"></td><td className="blank-cell"></td><td className="blank-cell"></td><td>Bench - {parseFloat(0.9*activeBench)}</td><td className="blank-cell"></td><td className="blank-cell"></td><td className="blank-cell"></td><td>Deadlift -{parseFloat(0.9*activeDL)}</td></tr>
                        </thead>
                        <tbody className="scrollbar" style={{maxHeight:600,height:600}} >
                        <tr><td className="routine-cell">Bench</td><td>{this.calculateWeight(0.65,activeBench)}  x8</td><td>{this.calculateWeight(0.75,activeBench)}   x6</td><td>{this.calculateWeight(0.85,activeBench)}  x4</td><td>{this.calculateWeight(0.85,activeBench)}  x4</td><td>{this.calculateWeight(0.85,activeBench)}  x4</td><td>{this.calculateWeight(0.8,activeBench)} x5</td><td>{this.calculateWeight(0.75,activeBench)}  x6</td><td>{this.calculateWeight(0.7,activeBench)}  x7</td><td>{this.calculateWeight(0.6,activeBench)}  x8</td></tr>
                        <tr><td>OHP</td><td>{this.calculateWeight(0.5,activeOHP)}  x6</td><td>{this.calculateWeight(0.6,activeOHP)}  x5</td><td>{this.calculateWeight(0.7,activeOHP)} x3</td><td>{this.calculateWeight(0.7,activeOHP)} x5</td><td>{this.calculateWeight(0.7,activeOHP)} x7</td><td>{this.calculateWeight(0.7,activeOHP)} x4</td><td>{this.calculateWeight(0.7,activeOHP)} x6</td><td>{this.calculateWeight(0.7,activeOHP)} x8</td><td></td></tr>
                        <tr><td className="blank-cell"/></tr>
                        <tr><td>Squat</td><td>{this.calculateWeight(0.75,activeSquat)} x5</td><td>{this.calculateWeight(0.85,activeSquat)}  x3</td><td>{this.calculateWeight(0.95,activeSquat)}  x1+</td><td>{this.calculateWeight(0.90,activeSquat)}  x3</td><td>{this.calculateWeight(0.85,activeSquat)}  x3</td><td>{this.calculateWeight(0.8,activeSquat)}  x3</td><td>{this.calculateWeight(0.75,activeSquat)}  x5</td><td>{this.calculateWeight(0.7,activeSquat)}  x5</td><td>{this.calculateWeight(0.6,activeSquat)}  x5</td></tr>
                        <tr><td>Deadlift</td><td>{this.calculateWeight(0.5,activeDL)}  x5</td><td>{this.calculateWeight(0.6,activeDL)} x5</td><td>{this.calculateWeight(0.7,activeDL)} x3</td><td>{this.calculateWeight(0.7,activeDL)}  x5</td><td>{this.calculateWeight(0.7,activeDL)}  x7</td><td>{this.calculateWeight(0.7,activeDL)}  x4</td><td>{this.calculateWeight(0.7,activeDL)}  x6</td><td>{this.calculateWeight(0.7,activeDL)}  x8</td><td>{this.calculateWeight(0.7,activeDL)}  x8</td></tr>
                        <tr><td className="blank-cell"/></tr>
                        <tr><td>OHP</td><td>{this.calculateWeight(0.65,activeOHP)}  x5</td><td>{this.calculateWeight(0.75,activeOHP)}  x3</td><td>{this.calculateWeight(0.85,activeOHP)}  x1+</td><td>{this.calculateWeight(0.85,activeOHP)}  x3</td><td>{this.calculateWeight(0.85,activeOHP)}  x3</td><td>{this.calculateWeight(0.8,activeOHP)}  x3</td><td>{this.calculateWeight(0.75,activeOHP)}  x5</td><td>{this.calculateWeight(0.7,activeOHP)}  x5</td><td>{this.calculateWeight(0.6,activeOHP)}  x5+</td></tr>
                        <tr><td>Incline Bench</td><td>{this.calculateWeight(0.4,activeBench)}  x6</td><td>{this.calculateWeight(0.5,activeBench)} x5</td><td>{this.calculateWeight(0.6,activeBench)}  x3</td><td>{this.calculateWeight(0.6,activeBench)} x5</td><td>{this.calculateWeight(0.6,activeBench)}  x7</td><td>{this.calculateWeight(0.6,activeBench)}  x4</td><td>{this.calculateWeight(0.6,activeBench)}  x8</td><td>{this.calculateWeight(0.6,activeBench)} x8</td><td></td></tr>
                        <tr><td className="blank-cell"/></tr>
                        <tr><td>Deadlift</td><td>{this.calculateWeight(0.75,activeDL)}  x5</td><td>{this.calculateWeight(0.85,activeDL)}  x3</td><td>{this.calculateWeight(0.95,activeDL)} x1+</td><td>{this.calculateWeight(0.9,activeDL)}  x3</td><td>{this.calculateWeight(0.85,activeDL)} x3</td><td>{this.calculateWeight(0.8,activeDL)}  x3</td><td>{this.calculateWeight(0.75,activeDL)}  x3</td><td>{this.calculateWeight(0.7,activeDL)}  x3</td><td>{this.calculateWeight(0.6,activeDL)}  x3</td></tr>
                        <tr><td>Front Squat</td><td>{this.calculateWeight(0.35,activeSquat)} x5</td><td>{this.calculateWeight(0.45,activeSquat)} x5</td><td>{this.calculateWeight(0.55,activeSquat)} x3</td><td>{this.calculateWeight(0.55,activeSquat)} x5</td><td>{this.calculateWeight(0.55,activeSquat)}x7</td><td>{this.calculateWeight(0.55,activeSquat)} x4</td><td>{this.calculateWeight(0.55,activeSquat)}x6</td><td>{this.calculateWeight(0.55,activeSquat)} x8</td><td></td></tr>
                        <tr><td className="blank-cell"/></tr>
                        <tr><td>Bench</td><td>{this.calculateWeight(0.65,activeBench)}  x5</td><td>{this.calculateWeight(0.75,activeBench)}  x3</td><td>{this.calculateWeight(0.85,activeBench)}  x1+</td><td>{this.calculateWeight(0.85,activeBench)}  x3</td><td>{this.calculateWeight(0.85,activeBench)} x5</td><td>{this.calculateWeight(0.8,activeBench)}  x3</td><td>{this.calculateWeight(0.75,activeBench)}  x5</td><td>{this.calculateWeight(0.7,activeBench)}  x3</td><td>{this.calculateWeight(0.6,activeBench)}  x5+</td></tr>
                        <tr><td>CG Bench</td><td>{this.calculateWeight(0.4,activeBench)} x6</td><td>{this.calculateWeight(0.5,activeBench)} x5</td><td>{this.calculateWeight(0.6,activeBench)} x3</td><td>{this.calculateWeight(0.6,activeBench)} x5</td><td>{this.calculateWeight(0.6,activeBench)} x7</td><td>{this.calculateWeight(0.6,activeBench)} x4</td><td>{this.calculateWeight(0.6,activeBench)} x6</td><td>{this.calculateWeight(0.6,activeBench)} x8</td><td></td></tr>




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
