import React from 'react';

class SearchBarYoutube extends React.Component{
            state={term:''};
    onFormSubmit=(event)=>{
            event.preventDefault();
            this.props.onTermSubmit(this.state.term);
    }        
    render(){
        return(
            <div className="search-bar ui segment">
                <form className="ui form" onSubmit={this.onFormSubmit}>
                    <div className="field">
                        <label>Youtube Search</label>
                        <input 
                            type="text"
                            placeholder="please type video to search"
                            value={this.state.term}
                            onChange={(e)=>{this.setState({term:e.target.value})}}
                        
                        />
                    </div>
                </form>
            </div>
        );
    }
}
export default SearchBarYoutube ;