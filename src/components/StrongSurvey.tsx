import * as React from 'react';
import { observer } from 'mobx-react';
import LineGraph from "./graph/daily.js";
import cookie from 'js-cookie';


import {toJS} from "mobx";
import moment from "moment";
import {rootStore} from "../stores/Stores";

export interface IHeaderState {
    squat:any;
    bench:any;
    deadlift:any;
    submitted:any;
    activeQuestion:any;
    reps:any;
    benchReps:any;
    squatReps:any;
    deadliftReps:any;
    loggingMax:any;
    showGraph:any,
}
interface IHeaderProps {
    generalStore:any;
    toggleGraph:any;

}


class StrongSurvey extends React.Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps, state:IHeaderState) {
        super(props);
        this.state = { showGraph:false,reps:0,activeQuestion:'squat',squat:'',bench:'',deadlift:'',submitted:rootStore.generalStore.data.length>=1,
            loggingMax:rootStore.generalStore.data.length<1,
        squatReps:rootStore.generalStore.data.length>=1?0:1,deadliftReps:rootStore.generalStore.data.length>=1?0:1,benchReps:rootStore.generalStore.data.length>=1?0:1,};
    }
    calculateNextGoal(lift,reps) {
        if (reps < 2) {
            return `${lift} x 1+`
        }
        if(reps >=2 && reps <4){
            return `${lift+2.5} x 1+`
        }
        if(reps >=4 && reps <=5){
            return `${lift+3} x 1+`
        }
        if(reps>5){
            return `${lift+6.8} x 1+`
        }

    }
    calculateNextGoalInt(lift,reps) {
        if (reps < 2) {
            return lift
        }
        if(reps >=2 && reps <4){
            return lift+2.5
        }
        if(reps >=4 && reps <=5){
            return lift+3
        }
        if(reps>5){
            return lift+6.8
        }

    }

    handleSurveyChangeReps(e,type){
        if(type==='squat'){
            this.setState({
                reps:e.target.value,
                squatReps:e.target.value
            });
        }
        if(type==='bench'){
            this.setState({
                reps:e.target.value,
                benchReps:e.target.value
            });
        }
        if(type==='deadlift'){
            this.setState({
                reps:e.target.value,
                deadliftReps:e.target.value
            });
        }

    }
    handleSurveyChangeBench(e){
        this.setState({
            bench:e.target.value
        });
    }
    handleSurveyChangeSquat(e){
        this.setState({
            squat:e.target.value
        });
    }
    handleSurveyChangeDeadlift(e){
        this.setState({
            deadlift:e.target.value
        });
    }
/*    submitDataToCookies(data){
        const prevData = cookie.get('data')
        console.log('prevData',typeof prevData,prevData,data);
        const newData={data:{squat:parseInt(data.squat),deadlift:parseInt(data.deadlift),bench:parseInt(data.bench)},timestamp:moment().format('LL')};
        if(typeof prevData !== 'undefined'){
            const prevDataSet = JSON.parse(prevData)
            prevDataSet.push(newData);
            console.log('_______',prevDataSet);
            rootStore.generalStore.setData(prevDataSet);
            cookie.set('data',prevDataSet);

        }
        else{
            cookie.set('data',[newData]);
            rootStore.generalStore.setData([newData]);
        }

    }*/
    submitDataToCookies(data){
        const nextSquatGoal = this.calculateNextGoal(parseFloat(this.state.squat),this.state.squatReps);
        const nextBenchGoal = this.calculateNextGoal(parseFloat(this.state.bench),this.state.benchReps);
        const nextDeadliftGoal = this.calculateNextGoal(parseFloat(this.state.deadlift),this.state.deadliftReps);
        const nextSquatGoalInt = this.calculateNextGoalInt(parseFloat(this.state.squat),this.state.squatReps);
        const nextBenchGoalInt = this.calculateNextGoalInt(parseFloat(this.state.bench),this.state.benchReps);
        const nextDeadliftGoalInt = this.calculateNextGoalInt(parseFloat(this.state.deadlift),this.state.deadliftReps);
        const nextGoal = {squat:nextSquatGoal,deadlift:nextDeadliftGoal,bench:nextBenchGoal};
        const nextGoalInt = {squat:nextSquatGoalInt,deadlift:nextDeadliftGoalInt,bench:nextBenchGoalInt};
        cookie.set('nextGoal',nextGoal);
        const prevData = cookie.get('data')
        console.log('prevData',typeof prevData,prevData,data);
        if(typeof prevData !== 'undefined'){
            const prevDataSet = JSON.parse(prevData)
            const addDay = prevDataSet.length
            prevDataSet.push({data:{squat:data.squat,squatReps:data.squatReps,deadlift:data.deadlift,deadliftReps:data.deadliftReps,bench:data.bench,benchReps:data.benchReps},timestamp:moment().format('LL')});
            rootStore.generalStore.setData(prevDataSet);
            rootStore.generalStore.setNextGoal(nextGoal);
            rootStore.generalStore.setNextGoalInt(nextGoalInt);
            cookie.set('next',nextGoalInt);
            cookie.set('data',prevDataSet);
        }
        else{
            cookie.set('data',[{data:data,timestamp:moment().format('LL')}]);
            cookie.set('next',nextGoalInt);
            rootStore.generalStore.setData([{data:data,timestamp:moment().format('LL')}]);
            rootStore.generalStore.setNextGoal(nextGoal);
            rootStore.generalStore.setNextGoalInt(nextGoalInt);
            this.setState({submitted:true})
        }

    }
    removeData(){
        cookie.remove('data')
        cookie.remove('nextGoal')
        cookie.remove('next')
        window.location.reload();
    }

    renderActiveQuestion(){
        switch(this.state.activeQuestion) {
            case 'squat':
                return <div className="fadedshort" style={{width: '100%', display: 'block', marginTop: 50}}>
                    <input
                    autoFocus={true}
                    max={400}
                    min={0}
                    style={{display: 'inline-block',width:200}}
                    type="number"
                    name="squat"
                    value={this.state.squat}
                    placeholder="Squat"
                    className="signup-form"
                    onChange={(e) => {
                        this.handleSurveyChangeSquat(e)
                    }}
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            if(this.state.squatReps){
                                this.setState({activeQuestion: 'bench',reps:0})
                            }

                        }
                    }}
                />
                    <input
                        max={400}
                        min={0}
                        style={{display: 'inline-block',width:80}}
                        type="number"
                        name="reps"
                        value={this.state.reps||this.state.squatReps}
                        placeholder="x reps"
                        className="signup-form"
                        onChange={(e) => {
                            this.handleSurveyChangeReps(e,'squat')
                        }}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                // @ts-ignore
                                document.activeElement.blur()
                                this.setState({activeQuestion: 'bench',reps:0})

                            }
                        }}
                    />


                </div>;
            case 'bench':
                return(<div style={{width: '100%', display: 'block', marginTop: 50}}>
                    <input
                        autoFocus={true}
                        max={400}
                        min={0}
                        style={{display: 'inline-block',width:200}}
                        type="number"
                        name="bench"
                        value={this.state.bench}

                        placeholder="Bench"
                        className="signup-form fadedshort"
                        onChange={(e) => {
                            this.handleSurveyChangeBench(e)
                        }}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {

                                if(this.state.benchReps){
                                    this.setState({activeQuestion: 'deadlift',reps:0})
                                }
                            }
                        }}
                    />
                    <input
                        max={400}
                        min={0}
                        style={{display: 'inline-block',width:80}}
                        type="number"
                        name="reps"
                        value={this.state.reps||this.state.benchReps}
                        placeholder="x reps"
                        className="signup-form fadedshort"
                        onChange={(e) => {
                            this.handleSurveyChangeReps(e,'bench')
                        }}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                this.setState({activeQuestion: 'deadlift',reps:0})
                                // @ts-ignore
                                document.activeElement.blur()

                            }
                        }}
                    />

                </div>);
            case 'deadlift':
                return(<div className="fadedshort"  style={{width: '100%', display: 'block', marginTop: 50}}>
                    <input
                        autoFocus={true}
                        max={400}
                        min={0}
                        style={{display: 'inline-block',width:200}}
                        type="number"
                        name="deadlift"
                        value={this.state.deadlift}
                        placeholder="Deadlift"
                        className="signup-form fadedshort"
                        onChange={(e) => {
                            this.handleSurveyChangeDeadlift(e)
                        }}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                if(this.state.deadliftReps){
                                    this.setState({activeQuestion: null,reps:0})
                                    this.submitDataToCookies(this.state)
                                }
                            }
                        }}
                    />
                    <input
                        max={400}
                        min={0}
                        style={{display: 'inline-block',width:80}}
                        type="number"
                        name="reps"
                        value={this.state.reps||this.state.deadliftReps}
                        placeholder="x reps"
                        className="signup-form fadedshort"
                        onChange={(e) => {
                            this.handleSurveyChangeReps(e,'deadlift')
                        }}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                this.setState({activeQuestion: null,reps:0})
                                this.submitDataToCookies(this.state)

                            }
                        }}
                    />

                </div>);
            default:
                if(this.state.squatReps==1&&this.state.benchReps==1&&this.state.deadliftReps==1){
                    (<div className="fadedshort" ><h3>Your one rep max has been logged. Please use the below training max</h3>
                        <br/>
                        <div className="fadedshort">
                            {this.state.squat&&<>Squat: {this.state.squat}</>}
                            <br />
                            {this.state.squat&&<>Training Max: {Math.ceil(0.9*this.state.squat)}</>}
<br />

                            {this.state.bench&&<>Bench: {this.state.bench}</>}
                            <br />
                            {this.state.bench&&<>Training Max: {Math.ceil(0.9*this.state.bench)}</>}
                            <br />
                            {this.state.deadlift&&<>Deadlift: {this.state.deadlift}</>}
                            <br />
                            {this.state.deadlift&&<>Training Max: {Math.ceil(0.9*this.state.deadlift)}</>}
                            <br />

                        </div></div>)
                }
                return(<div className="fadedshort" ><h3 style={{color:'pink'}}>Your work has been logged. Thank you.</h3>
                <br/></div>)

        }
    }

    public render() {
        console.log(rootStore.generalStore.data)
        return (<div style={{height:'100%',width:'100%',backgroundColor:"transparent"}} className="fadedshort">
                <div style={{display:'flex'}}>
                    <div style={{width:350,padding:'0px 0px 0px 30px',margin:0,height:550,backgroundColor:'#6584ff',borderRadius:12,marginBottom:50}}>
                        <p style={{height:40,color:'#fff'}}>{this.state.submitted?`Log today's training session`:`Submit Your One Rep Max`}</p>
                        {rootStore.generalStore.nextGoal.squat?<div style={{color:'white'}}>
                            <h3 style={{color:'white',margin:0}}>{rootStore.generalStore.data.length===1?'Your programme has been generated below':'Try for these numbers next week'}</h3>
                            <p><b>S</b>{rootStore.generalStore.nextGoal.squat}  <b style={{marginLeft:10}}>B</b>{rootStore.generalStore.nextGoal.bench} <b style={{marginLeft:10}}>D</b>{rootStore.generalStore.nextGoal.deadlift}</p>
                            </div>:null}

                        <div className="scrollbar" style={{maxHeight:90,overflowY:'auto',overflowX:'hidden',maxWidth:399}}>{rootStore.generalStore.data.length>=1?<div>{rootStore.generalStore.data.map((data)=>{
                            console.log('...',data);
                            return(<div style={{borderBottom:'1px solid #6584ff',backgroundColor:'#4264ea',color:'white',maxWidth:399,overflowX:'hidden',display:'flex',justifyContent:'space-evenly'}}><div>{moment(data.timestamp).format('l')}</div><div style={{width:40}}>S{data.data.squat} x{data.data.squatReps}</div><div style={{width:40}}>B{data.data.bench} x{data.data.benchReps}</div><div style={{width:40}}>D{data.data.deadlift} x{data.data.deadliftReps}</div>
                            </div>)
                        })}
                            <div style={{marginTop:10,display:'flex',justifyContent:'center',height:30}}> <div style={{width:'95%',backgroundColor:'#fff',border:'2px solid #6584ff',color:'#4264ea',cursor:'pointer',borderRadius:8,height:22,fontSize:18}} onClick={()=>{this.removeData()}}>Clear All Logs</div></div>

                        </div>:null}
                        </div>
                        <br />
                        {this.renderActiveQuestion()}
{/*
                        <div style={{marginTop:10,display:'flex',justifyContent:'center',height:30}}> <div style={{width:'95%',backgroundColor:'#fff',border:'2px solid #f5f4fa',color:'#fae0e2',cursor:'pointer',borderRadius:8,height:22,fontSize:18}} onClick={()=>{this.props.toggleGraph()}}>Toggle Progress Graph</div></div>
*/}



                    </div>
                    <br />
                </div>
            </div>
        );
    }
}
const ObservedStrongSurvey = observer(StrongSurvey);
export default ObservedStrongSurvey;
