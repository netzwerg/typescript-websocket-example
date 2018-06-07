import './App.css';
import * as React from 'react';
import logo from './logo.svg';
import CanvasTimeSeries from './CanvasTimeSeries';
import { Data } from './types';
import HighchartsTimeSeries from './HighchartsTimeSeries';
import { hertz, slidingTimeWindowSec } from './utils';

export type State = {
    readonly data: Data[]
}

class App extends React.Component<{}, State> {

    constructor(props: any) {
        super(props);
        this.state = {data: []};
    }

    public componentDidMount() {
        const ws = new WebSocket('ws://localhost:8999');

        ws.onmessage = (evt: MessageEvent) => {
            const data: Data = JSON.parse(evt.data);
            this.setState((prevState: State) => {
                return {data: prevState.data.concat(data).slice(-hertz * slidingTimeWindowSec * 1000)}
            })
        };

    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">WebSocket Client Demo</h1>
                </header>
                <CanvasTimeSeries data={this.state.data}/>
                <HighchartsTimeSeries dataPoint={this.state.data[this.state.data.length - 1]}/>
            </div>
        );
    }
}

export default App;
