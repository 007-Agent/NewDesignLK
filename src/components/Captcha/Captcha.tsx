import React from 'react';
import {RefreshCw} from 'lucide-react'

class Captcha extends React.Component {

    constructor(props : any) {
        super(props);
        this.state = {index: (new Date()).getTime()};
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    handleRefresh() {
        this.setState({index: (new Date()).getTime()});
    }

    render () {

        

        return (

            <div >
                <img
                    
                    src={'/api/login/captcha?' + this.state.index} />
                <RefreshCw
                    
                    name={'refresh'}
                    onClick={this.handleRefresh} />
            </div>

        );

    }

}

;

export default Captcha;