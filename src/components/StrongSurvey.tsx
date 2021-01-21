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
    submitDataToCookies(data){
        const prevData = cookie.get('data')
        console.log('prevData',typeof prevData,prevData,data);
        const newData={data:{squat:parseInt(data.squat),deadlift:parseInt(data.deadlift),bench:parseInt(data.bench)},timestamp:moment().format('LL')};
        if(typeof prevData !== 'undefined'){
            const prevDataSet = JSON.parse(prevData)
            prevDataSet.push(newData);
            rootStore.generalStore.setData(prevDataSet);
        }
        else{
            cookie.set('data',[newData]);
            rootStore.generalStore.setData([newData]);
        }

    }
    removeData(){
        cookie.remove('data')
        window.location.reload();
    }

    renderActiveQuestion(){
        switch(this.state.activeQuestion) {
            case 'squat':
                return <div style={{width: '100%', display: 'block', marginTop: 50}}>
                    <input
                        style={{display: 'block'}}
                        type="text"
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
                    <label className="form-label" htmlFor="squat">Squat. Leave blank and press enter if you did not squat</label>

                </div>;
            case 'bench':
                return(<div style={{width: '100%', display: 'block', marginTop: 50}}>
                    <input
                        style={{display: 'block'}}
                        type="text"
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
                    <label className="form-label" htmlFor="squat">Bench. Leave blank and press enter if you did not bench</label>

                </div>);
            case 'deadlift':
                return(<div style={{width: '100%', display: 'block', marginTop: 50}}>
                    <input
                        style={{display: 'block'}}
                        type="text"
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
                    <label className="form-label" htmlFor="deadlift">Deadlift. Leave blank and press enter if you did not deadlift</label>

                </div>);
            default:
                return(<div><h3>Your work has been logged. Thank you.</h3>
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
        return (<div style={{height:'100%',width:'100%',backgroundColor:"transparent"}}>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <div style={{width:400,margin:0,height:400,backgroundColor:'#f7e1c7',borderRadius:12,marginBottom:50}}>
                        <p style={{height:40}}>Log your more recent training session</p>

                        {rootStore.generalStore.data.length>=1?rootStore.generalStore.data.map((data)=>{
                            console.log('...',data);
                            return(<div style={{backgroundColor:'pink',color:'white',width:400,display:'flex',justifyContent:'center'}}><div>{data.timestamp}</div><div style={{marginLeft:20}}>{data.data.squat}</div></div>)
                        }):null}
                        <br />
                        {this.renderActiveQuestion()}
                        <div style={{display:'flex',justifyContent:'center'}}> <div style={{width:200,backgroundColor:'#fff',border:'2px solid #f5f4fa',color:'#f5f4fa',cursor:'pointer',borderRadius:8,height:60,fontSize:28,lineHeight:'32px',paddingTop:10}} onClick={()=>{this.removeData()}}>Reset</div></div>


                    </div>
                    <br />
                    <div>
                        <section className="dashboard content container">
                            <div className="wrapper">
                                <LineGraph dataset={rootStore.generalStore.data} />
                            </div>
                        </section>
                    </div>

                </div>
            </div>
        );
    }
}
const ObservedStrongSurvey = observer(StrongSurvey);
export default ObservedStrongSurvey;
