import './App.css';
import * as React from 'react';
import logo from './logo.svg';
import TimeSeries from './TimeSeries';
import { Data } from './types';

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
                return {data: prevState.data.concat(data)}
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
                <TimeSeries data={this.state.data}/>
            </div>
        );
    }
}

export default App;
