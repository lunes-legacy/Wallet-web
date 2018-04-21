import React from 'react';

class Home extends React.Component {
	componentDidUpdate() {
		console.log(this.props, "HOME");
	}
	render() {
		return(
			<h1 onClick={ () => this.props.userLogin('marcelo@g.c', '123') }>
				Click to Login 
				<br/>
				Status: { this.props.user && this.props.user.logged ? 'Logged' : 'Disconnected' }
			</h1>
		);
	}
}

export default Home;