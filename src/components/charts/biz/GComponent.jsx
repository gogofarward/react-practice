import React, {Component} from 'react';
import {GComponents} from "bizcharts";

const {Canvas, Group, Line} = GComponents;

export default class GComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Canvas width={800} height={400} id="test">
                    <Group>
                        <Line attrs={{
                            x1: 200,
                            y1: 100,
                            x2: 400,
                            y2: 100,
                            stroke: '#1890FF',
                            lineWidth: 2,
                        }}/>
                    </Group>
                </Canvas>
            </div>
        )
    }
}
