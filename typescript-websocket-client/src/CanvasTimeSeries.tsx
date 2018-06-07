import * as React from 'react';
import { Data } from './types';
import { scaleLinear } from 'd3-scale';
import { slidingTimeWindowSec } from './utils';

const width = 400;
const height = 200;
const lineWidth = 2;

type Props = {
    readonly data: Data[]
}

class CanvasTimeSeries extends React.Component<Props, {}> {

    private readonly canvasRef = React.createRef<HTMLCanvasElement>();

    private readonly scaleY = scaleLinear()
        .domain([-1, 1])
        .range([lineWidth, height - lineWidth]);

    public componentDidMount() {
        const canvas = this.canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d')!;
            this.paint(context);
        }
    }

    public render() {
        return <canvas ref={this.canvasRef} width={width} height={height}/>;
    }

    private paint(ctx: CanvasRenderingContext2D) {

        const now = Date.now();
        const scaleX = scaleLinear()
            .domain([now - slidingTimeWindowSec * 1000, now])
            .range([0, width]);

        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.lineWidth = lineWidth;

        this.props.data.forEach(d => {
            const x = Math.floor(scaleX(d.timestamp));
            const y = Math.floor(this.scaleY(d.value));

            if ((x >= 0 && x < width) && (y >= 0 && y < height)) {
                ctx.lineTo(x, y);
            }

        });

        ctx.stroke();

        window.requestAnimationFrame(() => this.paint(ctx));
    }

}

export default CanvasTimeSeries;