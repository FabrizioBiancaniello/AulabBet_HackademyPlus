/* Imports */
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect, useLayoutEffect, useState } from "react";

export default function Chart({users}) {

     const [data, setData] = useState([])

    let array = [
        { name: 'Carlo Boffetti', value: 4.2, bulletSettings: { src: "https://picsum.photos/300" } },
        { name: 'Babrizio Fiancaniello', value: 2.2, bulletSettings: { src: "https://picsum.photos/302" } },
        { name: 'Mioele Gedde', value: 5, bulletSettings: { src: "https://picsum.photos/301" } }
    ]


    // useEffect( ()=>{
       
    // }, [])


    useLayoutEffect(() => {
        let root = am5.Root.new("chartdiv");

        // Set themes
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // Create chart
        let chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "none",
            wheelY: "none",
            paddingLeft: 0
        }));
        // Add cursor
        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);

        // Create axes
        let xRenderer = am5xy.AxisRendererX.new(root, {
            minGridDistance: 30,
            minorGridEnabled: true
        });

        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0,
            categoryField: "name",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        xRenderer.grid.template.set("visible", false);

        let yRenderer = am5xy.AxisRendererY.new(root, {});
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0,
            min: 0,
            extraMax: 0.1,
            renderer: yRenderer
        }));

        yRenderer.grid.template.setAll({
            strokeDasharray: [2, 2]
        });

        // Create series
        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            sequencedInterpolation: true,
            categoryXField: "name",
            tooltip: am5.Tooltip.new(root, { dy: -25, labelText: "{valueY}" })
        }));


        series.columns.template.setAll({
            cornerRadiusTL: 5,
            cornerRadiusTR: 5,
            strokeOpacity: 0
        });

        series.columns.template.adapters.add("fill", (fill, target) => {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.columns.template.adapters.add("stroke", (stroke, target) => {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        // Set data
        let data = [...users];
        // setData();
        console.log(data);
        // let data = [
        //     {
        //         name: "John",
        //         value: 35654,
        //         bulletSettings: { src: "https://www.amcharts.com/lib/images/faces/A04.png" }
        //       },
        //       {
        //         name: "Damon",
        //         value: 65456,
        //         bulletSettings: { src: "https://www.amcharts.com/lib/images/faces/C02.png" }
        //       },
        //       {
        //         name: "Patrick",
        //         value: 45724,
        //         bulletSettings: { src: "https://www.amcharts.com/lib/images/faces/D02.png" }
        //       },
        //       {
        //         name: "Mark",
        //         value: 13654,
        //         bulletSettings: { src: "https://www.amcharts.com/lib/images/faces/E01.png" }
        //       }
        // ];


        series.bullets.push(function () {
            return am5.Bullet.new(root, {
                locationY: 1,
                sprite: am5.Picture.new(root, {
                    templateField: "bulletSettings",
                    width: 50,
                    height: 50,
                    centerX: am5.p50,
                    centerY: am5.p50,
                    shadowColor: am5.color(0x000000),
                    shadowBlur: 4,
                    shadowOffsetX: 4,
                    shadowOffsetY: 4,
                    shadowOpacity: 0.6
                })
            });
        });

        xAxis.data.setAll(data);
        series.data.setAll(data);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);

    }, [])

    //  {bets && bets.bets.map(bet=> data.push(bet))}



    return (
        <div className="d-flex justify-content-center align-items-center">

            <div id="chartdiv" style={{ width: '500px', height: '500px' }}></div>
        </div>
    )
}