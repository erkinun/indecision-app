class IndecisionApp extends React.Component {

    constructor(props) {
        super(props)
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleDeleteOption = this.handleDeleteOption.bind(this)
        this.state = {
            options: []
        }
    }

    // lifecycle methods
    componentDidMount() {

        try {
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)

            if (options) {
                this.setState(() => ({ options: options }))
            }
        } 
        catch (e) {
            // do nothing
        }
    }

    componentDidUpdate(prevProps, prevState, hede) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
    }

    componentWillUnmount() {
        console.log('component will unmount')
    }

    handleDeleteOptions() {
        this.setState(() => ({ options: [] }))
    }

    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((opt) => optionToRemove !== opt)
        }))
    }

    // bind and pass down to action
    handlePick() {
        // pick the options and alert
        const random = Math.floor(Math.random() * this.state.options.length);
        const selection = this.state.options[random];
        alert(selection);
    }

    handleAddOption(option) {

        if (!option) {
            return 'Enter valid value to add item'
        } 
        else if (this.state.options.indexOf(option) > - 1) {
            return 'This option already exists'
        }

        this.setState((prevState) => ({ options: prevState.options.concat(option)}))
    }

    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <Action 
                    handlePick={this.handlePick}
                    hasOptions={this.state.options.length > 0}/>
                <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}/>
                <AddOption 
                    handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
}


const Header = (props) => {
    return (
            <div>
                <h1>{props.title}</h1>
                <h2>{props.subtitle}</h2>
            </div>
        );
}

Header.defaultProps = {
    title: "defaul title"
}

const Action = (props) => {
    return (
            <div>
                <button 
                    onClick={props.handlePick}
                    disabled={!props.hasOptions}>What should I do?</button>
            </div>
        );
}

const Options = (props) => {
    return (
            <div>
                <ol>
                    {props.options.map((option) => {
                        return <Option 
                                    key={option} optionText={option}
                                    handleDeleteOption={props.handleDeleteOption}
                                />
                    })}
                </ol>
                <button onClick={props.handleDeleteOptions}>Remove all</button>
                {props.options.length === 0 && <p>Please add some options</p>}
            </div>
        );
}

const Option = (props) => {
    return (
            <div>
                {props.optionText}
                <button 
                    onClick={(e) => {
                        props.handleDeleteOption(props.optionText)
                    }}>
                    remove
                </button>
            </div>
        );
}

// AddOption 
class AddOption extends React.Component {

    constructor(props) {
        super(props)
        this.handleAddOptionx = this.handleAddOptionx.bind(this)

        this.state = {
            error: undefined
        }
    }

    handleAddOptionx(e) {

        e.preventDefault();

        const option = e.target.elements.option.value.trim();

        const error = this.props.handleAddOption(option)

        this.setState(() => ({ error: error }))

        if (!error) {
            e.target.elements.option.value = ''
        }
    }

    render() {
        return (
            <div>

                {this.state.error && <p>{this.state.error}</p>}

                <form onSubmit={this.handleAddOptionx}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));