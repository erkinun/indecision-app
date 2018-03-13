class Visibility extends React.Component {

    constructor(props) {
        super(props)

        this.showButton = this.showButton.bind(this)
        this.showInformation = this.showInformation.bind(this)
        this.toggle = this.toggle.bind(this)

        this.state = {
            visibility: false
        }
    }

    showButton() {
        if (this.state.visibility) {
            return 'Hide'
        }
        else { return 'Show' }
    }

    showInformation() {
        if (this.state.visibility) {
            return 'Some Information'
        }
        else { return '' }
    }

    toggle() {
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Visibility</h1>
                <button onClick={this.toggle}>{this.showButton()}</button>
                <p>{this.showInformation()}</p>
            </div>
        )
    }
}

ReactDOM.render(<Visibility />, document.getElementById('app'))