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
}
interface IHeaderProps {
    generalStore:any;

}


class StrongSurvey extends React.Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps, state:IHeaderState) {
        super(props);
        this.state = { activeQuestion:'squat',squat:'',bench:'',deadlift:'',submitted:false };
    }

    handleSurveyChangeSquat(e){
        this.setState({
            squat:e.target.value
        });
    }
    handleSurveyChangeBench(e){
        this.setState({
            bench:e.target.value
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
        this.props.setSubmitted(true);
        const prevData = cookie.get('data')
        console.log('prevData',typeof prevData,prevData,data);
        if(typeof prevData !== 'undefined'){
            const prevDataSet = JSON.parse(prevData)
            const addDay = prevDataSet.length
            prevDataSet.push({data:{squat:data.squat,deadlift:data.deadlift,bench:data.bench},timestamp:moment().format('LL')});
            rootStore.generalStore.setData(prevDataSet);
            cookie.set('data',prevDataSet);
        }
        else{
            cookie.set('data',[{data:data,timestamp:moment().format('LL')}]);
            rootStore.generalStore.setData([{data:data,timestamp:moment().format('LL')}]);
        }

    }
    removeData(){
        cookie.remove('data')
        window.location.reload();
    }

    renderActiveQuestion(){
        switch(this.state.activeQuestion) {
            case 'squat':
                return <div className="fadedshort" style={{width: '100%', display: 'block', marginTop: 50}}>
                    <input
                        max={400}
                        min={0}
                        style={{display: 'block'}}
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
                                this.setState({activeQuestion: 'bench'})

                            }
                        }}
                    />

                </div>;
            case 'bench':
                return(<div className="fadedshort"  style={{width: '100%', display: 'block', marginTop: 50}}>
                    <input
                        max={400}
                        min={0}
                        style={{display: 'block'}}
                        type="number"
                        name="bench"
                        value={this.state.bench}
                        placeholder="Bench"
                        className="signup-form"
                        onChange={(e) => {
                            this.handleSurveyChangeBench(e)
                        }}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                this.setState({activeQuestion: 'deadlift'})

                            }
                        }}
                    />

                </div>);
            case 'deadlift':
                return(<div className="fadedshort"  style={{width: '100%', display: 'block', marginTop: 50}}>
                    <input
                        max={400}
                        min={0}
                        style={{display: 'block'}}
                        type="number"
                        name="deadlift"
                        value={this.state.deadlift}
                        placeholder="Deadlift"
                        className="signup-form"
                        onChange={(e) => {
                            this.handleSurveyChangeDeadlift(e)
                        }}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                this.setState({activeQuestion: null})
                                this.submitDataToCookies(this.state)

                            }
                        }}
                    />

                </div>);
            default:
                return(<div className="fadedshort" ><h3>Your work has been logged. Thank you.</h3>
                <br/>
                <div>
                    {this.state.squat&&<>Squat: {this.state.squat}</>}
                    <br />
                    {this.state.bench&&<>Bench: {this.state.bench}</>}
                    <br />
                    {this.state.deadlift&&<>Deadlift: {this.state.deadlift}</>}
                </div></div>)

        }
    }

    public render() {
        console.log(rootStore.generalStore.data)
        return (<div style={{height:'100%',width:'25%',backgroundColor:"transparent"}}>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <div style={{width:400,margin:0,height:400,backgroundColor:'#f7e1c7',borderRadius:12,marginBottom:50}}>
                        <p style={{height:40}}>Log your more recent training session</p>

                        <div className="scrollbar" style={{maxHeight:90,overflowY:'auto',overflowX:'hidden',maxWidth:399}}>{rootStore.generalStore.data.length>=1?<div>{rootStore.generalStore.data.map((data)=>{
                            console.log('...',data);
                            return(<div style={{backgroundColor:'pink',color:'white',maxWidth:399,width:399,overflowX:'hidden',display:'flex',justifyContent:'space-evenly'}}><div>{data.timestamp}</div><div style={{marginLeft:20,width:40}}>S{data.data.squat}</div><div style={{marginLeft:20,width:40}}>B{data.data.bench}</div><div style={{marginLeft:20,width:40}}>D{data.data.deadlift}</div>
                            </div>)
                        })}
                            <div style={{marginTop:10,display:'flex',justifyContent:'center',height:30}}> <div style={{width:'95%',backgroundColor:'#fff',border:'2px solid #f5f4fa',color:'#fae0e2',cursor:'pointer',borderRadius:8,height:22,fontSize:18}} onClick={()=>{this.removeData()}}>Clear All Logs</div></div>

                        </div>:null}
                        </div>
                        <br />
                        {this.renderActiveQuestion()}


                    </div>
                    <br />

                </div>
            </div>
        );
    }
}
const ObservedStrongSurvey = observer(StrongSurvey);
export default ObservedStrongSurvey;
