import React, {Component} from 'react';
import * as G2 from '@antv/g2'

export default class MyG2Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const data = [
            { genre: 'Sports', sold: 275 },
            { genre: 'Strategy', sold: 115 },
            { genre: 'Action', sold: 120 },
            { genre: 'Shooter', sold: 350 },
            { genre: 'Other', sold: 150 },
        ];

        // Step 1: 创建 Chart 对象
        const chart = new G2.Chart({
            container: this.chartRef, // 指定图表容器 ID
            width: 600, // 指定图表宽度
            height: 300, // 指定图表高度
            renderer: "svg",
        });

        // Step 2: 载入数据源
        chart.data(data);

        // Step 3：创建图形语法，绘制柱状图
        chart.interval().position('genre*sold');

        // Step 4: 渲染图表
        chart.render();
    }

    render() {
        return (
            <div ref={r => this.chartRef = r}>

            </div>
        )
    }
}
