import React, { Component } from 'react';
import *  as d3 from 'd3';

class Chart extends Component {

    componentDidMount() {
        const data = [ 
            {
                localidad:"Teusaquillo", 
                semanas:[
                    { semana: "3/11/19-9/11/19", robos: 1},
                    { semana: "10/11/19-16/11/19", robos: 5 },
                    { semana: "17/11/19-23/11/19", robos: 7 },
                    { semana: "24/11/19-30/11/19", robos: 19 },
                    { semana: "1/12/19-7/12/19", robos: 16},
                    { semana: "13/12/19-19/12/19", robos: 24},
                    { semana: "20/12/19-16/12/19", robos: 30 }
                ]
            },
            {
                localidad:"Usaquen", 
                semanas:[
                    { semana: "3/11/19-9/11/19", robos: 5},
                    { semana: "10/11/19-16/11/19", robos: 10 },
                    { semana: "17/11/19-23/11/19", robos: 15 },
                    { semana: "24/11/19-30/11/19", robos: 3 },
                    { semana: "1/12/19-7/12/19", robos: 9},
                    { semana: "13/12/19-19/12/19", robos: 27},
                    { semana: "20/12/19-16/12/19", robos: 25 }
                ]
            }
            
        ];
        
        this.drawChart(data)
    }
    
    drawChart(data) {

        const canvas = d3.select(this.refs.canvas);
        const width = 700;
        const height = 500;
        const margin = { top:10, left:50, bottom: 40, right: 10};
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top -margin.bottom;

        const svg = canvas.append("svg");
        svg.attr("width", width);
        svg.attr("height", height);

        let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
        const dataF = data[0]['semanas']
        console.log(dataF)
        const y = d3.scaleLinear() 
            .domain([0, 30])
            .range([iheight, 0]);

        const x = d3.scaleBand()
        .domain(dataF.map(d => d.semana) ) 
        .range([0, iwidth])
        .padding(0.1); 

        const bars = g.selectAll("rect").data(dataF);

        bars.enter().append("rect")
        .attr("class", "bar")
        .style("fill", "steelblue")
        .attr("x", d => x(d.semana))
        .attr("y", d => y(d.robos))
        .attr("height", d => iheight - y(d.robos))
        .attr("width", x.bandwidth())  

        g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);  

        g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y));
    }
    
    render() {
            return (
                <div>
                <div ref="canvas">
                </div>
                </div>
            );
        }
}

export default Chart;