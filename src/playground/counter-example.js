class Counter extends React.Component {

    constructor(props) {
        super(props)
        this.handleAddOne = this.handleAddOne.bind(this)
        this.handleMinusOne = this.handleMinusOne.bind(this)
        this.handleReset = this.handleReset.bind(this)

        this.state = {
            count: 0
        }
    } 

    componentDidMount() { 
        try {
            const json = localStorage.getItem('count')
            const strCount = JSON.parse(json)
            const count = parseInt(strCount, 10)

            if (!isNaN(count)) {
                this.setState(() => ({ count: count }))
            } 
        }
        catch (e) {
            console.log(e)
        }
    }

    componentDidUpdate(prevProps, prevState, hede) {
        const json = JSON.stringify(this.state.count)
        localStorage.setItem('count', json)
    }

    handleAddOne() {
        this.setState((prevState) => {
            return {
                count: prevState.count + 1 
            }
        });
    }
    handleMinusOne() {
        this.setState((prevState) => {
            return {
                count: prevState.count - 1 
            }
        });
    }
    handleReset() {
        this.setState(() => {
            return {
                count: 0
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>reset</button>
            </div>
        )
    }
}


ReactDOM.render(<Counter count={15}/>, document.getElementById('app'))