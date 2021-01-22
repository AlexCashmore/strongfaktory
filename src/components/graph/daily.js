import React, { Component } from "react";
import PropTypes from "prop-types";

import moment from "moment";
import {
    Button, MenuItem, Position, Classes, Intent,
} from "@blueprintjs/core";
import { MultiSelect, Select } from "@blueprintjs/select";
import { DateTime } from "luxon";
import Spinner from "./spinner";
import ChartWrapper from "./chartwrapper";
import Search from "./search";

class Daily extends Component {
    constructor(props) {
        super(props);
        this.chartHandle = this.chartHandle.bind(this);
    }

    componentDidMount() {
        // fetch data

    }

    componentWillMount() {
        this.setState({
            selectedLegend: [],
            selectedOrganizations: [],
            dataItems: [],
            updated: false,
            legendItems: [{
                datasetIndex: 0,
                fillStyle: "#b16037",
                hidden: false,
                lineCap: "",
                lineDash: "",
                lineDashOffset: "",
                lineJoin: "",
                lineWidth: 1,
                pointStyle: "",
                strokeStyle: "#b16037",
                text: "Organization1 Score3",
            }],
        });
    }

    chartHandle(chart) {
        const chartInstanceHandle = chart;
        this.setState({
            chartInstance: chartInstanceHandle,
            legendItems: chartInstanceHandle.legend.legendItems,
        });
        this.forceUpdate();
    }

    render() {
        const submitted=this.props.submitted
        /* const clearButton =
            this.state.selectedLegend.length > 0 ? <Button icon="cross" minimal={true} onClick={this.handleClear} /> : undefined;*/
        const shortTermChartColorStorage = [
            "#efd8ff",
        ];
        if(true) {
            const randHex = Math.floor(Math.random() * 16777215);
            const color = `#${randHex.toString(16)}`;
            const color2 = `#${Math.floor(randHex - 5000).toString(16)}`;
            const color3 = `#${Math.floor(randHex - 8000).toString(16)}`;
            const squatData= this.props.dataset.map((data)=>{return({x:data.timestamp,y:data.data.squat})});
            const benchData= this.props.dataset.map((data)=>{return({x:data.timestamp,y:data.data.bench})});
            const deadliftData= this.props.dataset.map((data)=>{return({x:data.timestamp,y:data.data.deadlift})});
            const testData = this.props.dataset;
            console.log('WHAT IS MY TEST DATA',testData,squatData,benchData,deadliftData);

            const dataset2 = [
                        {
                            label: `Squat`,
                            backgroundColor: color,
                            borderColor: color,
                            borderWidth: 1,
                            hoverBackgroundColor: color,
                            hoverBorderColor: color,
                            fill: false,
                            showLine: true,
                            hidden: false,
                            data:squatData
                        },
                        {
                            label: `Bench`,
                            backgroundColor: color2,
                            borderColor: color2,
                            borderWidth: 1,
                            hoverBackgroundColor: color2,
                            hoverBorderColor: color2,
                            fill: false,
                            showLine: true,
                            hidden: false,
                            data:benchData
                        },
                        {
                            label: `Deadlift`,
                            backgroundColor: color3,
                            borderColor: color3,
                            borderWidth: 1,
                            hoverBackgroundColor: color3,
                            hoverBorderColor: color3,
                            fill: false,
                            showLine: true,
                            hidden: false,
                            data:deadliftData
                        }];
            const chartConfig = {
                labels: this.props.dataset.length>=1?[moment(this.props.dataset[0].timestamp).toISOString(),moment(this.props.dataset[this.props.dataset.length-1].timestamp).toISOString()]:[new Date().toISOString(),moment().add('30','day').toISOString()],
                datasets: dataset2,
            };

            return (
                <section style={{width:800,height:800}}>
                    <div className="wrapper">
                        <div className="container">
                            <div style={{ margin: 15 }}>
                                <ChartWrapper
                                    chartHandle={this.chartHandle}
                                    type="line"
                                    data={chartConfig}
                                    options={{
                                        animationTime: 0,
                                        hoverMode: "index",
                                        stacked: false,
                                        legend: {
                                            display: false,
                                            position: "bottom",
                                            /* labels: {
                                                filter(item, chart) {
                                                    // Logic to remove a particular legend item goes here
                                                    return item.text.includes('TEST 2 Score1');
                                                },
                                            },*/
                                        },
                                        annotation: {
                                            annotations: [

                                            ],
                                        },

                                        tooltips: {
                                            mode: "nearest",
                                            intersect: true,
                                            enabled: true,
                                            callbacks: {
                                                label(tooltipItems, data) {
                                                    const averageDataSetIndex = tooltipItems.datasetIndex;
                                                    console.log(data,tooltipItems);
                                                    return `${data.datasets[tooltipItems.datasetIndex].label}: ${tooltipItems.yLabel} kg/lb `;
                                                },
                                            },
                                        },
                                        scales: {

                                            xAxes: [{
                                                type: "time",
                                                time: {
                                                    unit: "day",
                                                    displayFormats: {
                                                        day: "MMM D",
                                                    },
                                                    tooltipFormat: "MMM D",
                                                    display: true,
                                                    ticks: {
                                                        display: true,
                                                        source: "labels",
                                                    },
                                                    scaleLabel: {
                                                        display: true,
                                                    },

                                                },
                                            }],
                                            yAxes: [{
                                                ticks: {
                                                    stepSize: 1,
                                                },
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: "KG/LB",
                                                },
                                            }],
                                        },
                                    }
                                    }
                                />
                            </div>
                        </div>

                    </div>

                </section>
            );
        }
        return (
            <div style={{ marginTop: 30 }}>
                <Spinner
                    animated
                    content={["Extracting information...",
                        "Generating Chart...", "Aquiring Birthdays...", "Integrating Data Structures...",
                        "Taking Temperatures...", "Inheriting Schematics...", "Rolling up data source...", "Drilling down..."]
                    }
                />
            </div>
        );
    }
}

Daily.propTypes = {};
Daily.contextTypes = {
    router: PropTypes.object.isRequired,
};





export default (Daily);