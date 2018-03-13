import React from 'react'
import ReactDOM from 'react-dom'
import AddOption from './AddOption'
import Options from './Options'
import Header from './Header'
import Action from './Action'
import OptionModal from './OptionModal'

class IndecisionApp extends React.Component {

    state = {
        options: [],
        selectedOption: undefined
    }

    handleClearSelect = () => {
        this.setState(() => ({ selectedOption: undefined }))
    }

    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }))
    }

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((opt) => optionToRemove !== opt)
        }))
    }

    // bind and pass down to action
    handlePick = () => {
        // pick the options and alert
        const random = Math.floor(Math.random() * this.state.options.length);
        const selection = this.state.options[random];
        this.setState(() => ({
            selectedOption: selection
        }))
    }

    handleAddOption = (option) => {

        if (!option) {
            return 'Enter valid value to add item'
        } 
        else if (this.state.options.indexOf(option) > - 1) {
            return 'This option already exists'
        }

        this.setState((prevState) => ({ options: prevState.options.concat(option)}))
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

    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <div className="container">
                    <Action 
                        handlePick={this.handlePick}
                        hasOptions={this.state.options.length > 0}/>
                    <div className="widget">
                        <Options 
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}/>
                        <AddOption 
                            handleAddOption={this.handleAddOption}/>
                    </div>
                </div>      
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    clearSelected={this.handleClearSelect}
                    />
            </div>
        );
    }
}

export default IndecisionApp