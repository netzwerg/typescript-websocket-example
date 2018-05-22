import * as React from 'react';
import './App.css';

import logo from './logo.svg';

export type State = {
    readonly data: number[]
}

class App extends React.Component<{}, State> {

    constructor(props: any) {
        super(props);
        this.state = {data: []};
    }

    public componentDidMount() {
        const ws = new WebSocket('ws://localhost:8999');

        ws.onopen = () => console.log('open');

        ws.onmessage = (evt: MessageEvent) => {
            console.log('Yay, data!');
            this.setState((prevState: State) => {
                return {data: prevState.data.concat(evt.data)}
            })
        };

    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <table>
                    <tbody>
                    {
                        this.state.data.map((n: number, index: number) => <tr key={index}>
                            <td>{n}</td>
                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
