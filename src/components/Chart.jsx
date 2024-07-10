/* Imports */
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect, useLayoutEffect, useState, useRef } from "react";
import useWindowWidth from "../utils/useWindowWidth";

export default function Chart({ users }) {
    const chartRef = useRef(null);
    const currentWidth = useWindowWidth();

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
            paddingLeft: 0,
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

        // Modify the appearance of the labels on the xAxis
        xRenderer.labels.template.setAll({
            fontSize: (currentWidth * 0.007) + 10,
            fontFamily: 'Arial, sans-serif',
            fontWeight: "700",
            oversizedBehavior: "truncate",
            maxWidth: currentWidth * 0.25 < 250 ? currentWidth * 0.25 : 250,
        });

        let yRenderer = am5xy.AxisRendererY.new(root, {});
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0,
            min: 0,
            max: 5,
            extraMax: 0.1,
            renderer: yRenderer
        }));

        yRenderer.grid.template.setAll({
            strokeDasharray: [2, 2]
        });

        yRenderer.labels.template.setAll({
            fontSize: 20,
            fontFamily: 'Arial, sans-serif',
            fontWeight: "700",
        });

        // Create series
        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            sequencedInterpolation: true,
            categoryXField: "name",
            tooltip: am5.Tooltip.new(root, { dy: -25, labelText: "{valueY}" }),
            minWidth: 200,
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
                    shadowOpacity: 0.6,
                    mask: am5.Circle.new(root, {
                        radius: 25
                    })
                })
            });
        });

        // Store chart instance in ref
        chartRef.current = { root, chart, xAxis, series };



        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);

        return () => {
            root.dispose();
        };

    }, [currentWidth])


    useEffect(() => {
        if (chartRef.current) {
            const { xAxis, series } = chartRef.current;
            xAxis.data.setAll(users);
            series.data.setAll(users);
        }
    }, [users, currentWidth]);



    return (
        <div className="container-fluid my-5">
            <div className="row">
                <div className="col-12">
                    <h2 className="display-4 text-center secondary-title">STATISTICHE</h2>
                    <h3 className="secondary-title fs-4 text-center">Media voti di tutti gli utenti</h3>
                </div>
            </div>
            <div className="row justify-content-center px-3">
                <div className="chartContainer col-12 mt-3">
                    <div className="p-3 chartScroll">
                        <div id="chartdiv" className="chartDiv" style={{ width: `${users?.length * (currentWidth * 0.25)}px`, maxWidth: `${users?.length * 250}px`}}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}