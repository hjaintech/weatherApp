import React, {Component} from 'react';
import {getSuggestions} from '../../utils/networkUtil';
import './AutoSuggest.css';

let fnSuggestCallTimer = null;

class AutoSuggest extends Component {
    constructor(props){
        super(props);
        this.state={
            userInput: '',
            showSuggestions: false,
            suggestions: [],
            activeSuggestion: 0
        };
    }

    onSuggestionClick = (index) => {
        const selectedValue = this.state.suggestions[index];
        this.setState({
            userInput: selectedValue,
            showSuggestions: false,
            suggestion: [],
            activeSuggestion: 0,
        });

        this.props.citySelect(selectedValue);
    }

    _loadSuggestions = async (value) => {
        let suggestions = [];
        let showSuggestions = false;
        if(value){
            const suggestionsObj = await getSuggestions(value); 
            suggestions = suggestionsObj.predictions.map(prediction => prediction.description);
            showSuggestions = (suggestions.length > 0);
        }
        this.setState({
            showSuggestions,
            suggestions,
            activeSuggestion: 0
        });
    }

    
    _debounceLoadSuggestionCall = (value) => {
        clearTimeout(fnSuggestCallTimer);

        fnSuggestCallTimer = setTimeout(this._loadSuggestions.bind(this,value), 500);
    }
    onChangeUserInput = (event) => {
        const {value} = event.target;
        this.setState({
            userInput: value
        });
        this.props.inputChanged();
        this._debounceLoadSuggestionCall(value);
    }

    onKeyDown = (e) => {
        const {suggestions, activeSuggestion} = this.state;
        switch (e.key){
            case 'ArrowDown':
                this.setState({
                    activeSuggestion: activeSuggestion < suggestions.length - 1 ? activeSuggestion + 1 : activeSuggestion
                });
                break;
            case 'ArrowUp':
                this.setState({
                    activeSuggestion: activeSuggestion === 0 ? 0 : activeSuggestion -1
                });
                break;
            case 'Enter':
                const selectedValue = suggestions[activeSuggestion];
                this.setState({
                    userInput: selectedValue,
                    showSuggestions: false,
                    suggestions: [],
                    activeSuggestion : 0
                });
                this.props.citySelect(selectedValue);
                break;
            default:
                break;
        }
        
    }

    render(){
        return (
            <div className="autoSuggestContainer">
                <input 
                    className="autoSuggestInput"
                    value={this.state.userInput}
                    onChange={this.onChangeUserInput}
                    onKeyDown={this.onKeyDown}
                    placeholder="Enter the city">
                </input>
                {this.state.showSuggestions ? 
                    <ul className='suggestionList'>
                        {this.state.suggestions.map((suggestion, index) => {
                            let className = 'suggestion';
                            if(index === this.state.activeSuggestion){
                                className = `${className} activeSuggestion`;
                            }
                            return <li key={suggestion} className={className} onClick={() => {this.onSuggestionClick(index)}}>{suggestion}</li>;
                        })}
                    </ul> : null
                }
            </div>
        );
    }
}

export default AutoSuggest;