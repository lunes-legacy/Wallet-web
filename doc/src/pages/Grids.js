import React from 'react';
import { Row, Col, H1, H2, Text } from 'Components';

export default class Grids extends React.Component {
	render(){
		console.log(this.props);
		return(
			<Row>
				<Col s="12" m="12" l="12">
					<H1 fontSize="2.3rem">Grids</H1>
					<H2 fontSize="2rem">Rows</H2>
					<Text>
						O esquema de linhas é feito em flex-box. Parâmetros disponíveis nas linhas são:
					</Text>
					<ul>
						<li>sAlign: [Number or String]</li>
						<li>mAlign: [Number or String]</li>
						<li>lAlign: [Number or String]</li>
					</ul>
					<br/>
					<Text>Código:</Text>
					<pre className="code">
						{`<Row sAlign="left" mAlign="center" lAlign="right">
						    <Text>Olá meu amigo</Text>
						</Row>`}
					</pre>
					<Text>Exemplo:</Text>
					<Row style={{background: 'indianred'}} sAlign="left" mAlign="center" lAlign="right">
						<Text>Olá meu amigo</Text>
					</Row>

					<br/>
					<br/>
					
					<hr/>

					<br/>
					<br/>

					<H2>Cols</H2>
					<Text>Código:</Text>
					<pre className="code">
						{`
							<Row sAlign="left" mAlign="center" lAlign="right">
							    <Col s="12" m="6" l="3">
									<Text>Primeira coluna</Text>
							    </Col>
							    <Col s="12" m="6" l="3">
									<Text>Segunda coluna</Text>
							    </Col>
							    <Col s="12" m="6" l="3">
									<Text>Terceira coluna</Text>
							    </Col>
							</Row>
						`}
					</pre>
					<Text>Exemplo:</Text>
					<Row style={{background: 'indianred'}} sAlign="left" mAlign="center" lAlign="right">
					    <Col style={{background: 'orange'}} s="12" m="6" l="3">
							<Text>Primeira coluna</Text>
					    </Col>
					    <Col style={{background: 'slateblue'}} s="12" m="6" l="3">
							<Text>Segunda coluna</Text>
					    </Col>
					    <Col style={{background: 'violet'}} s="12" m="6" l="3">
							<Text>Terceira coluna</Text>
					    </Col>
					</Row>
					
					<br/>

					<H2>Mais exemplos com cols</H2>
					<Text>Código:</Text>
					<pre className="code">
						{`<Row sAlign="left" mAlign="center" lAlign="right">
							    <Col s="12" m="4" l="4">
									<Text>Primeira coluna</Text>
							    </Col>
							    <Col s="12" m="4" l="4">
									<Text>Segunda coluna</Text>
							    </Col>
							    <Col s="12" m="4" l="4">
									<Text>Terceira coluna</Text>
							    </Col>
							</Row>`}
					</pre>
					<Text>Exemplo:</Text>
					<Row style={{background: 'indianred'}} sAlign="left" mAlign="center" lAlign="right">
					    <Col style={{background: 'orange'}} s="12" m="4" l="4">
							<Text>Primeira coluna</Text>
					    </Col>
					    <Col style={{background: 'slateblue'}} s="12" m="4" l="4">
							<Text>Segunda coluna</Text>
					    </Col>
					    <Col style={{background: 'violet'}} s="12" m="4" l="4">
							<Text>Terceira coluna</Text>
					    </Col>
					</Row>

					<br/>
					<br/>
					<hr/>
					<br/>
					<br/>
					
					<h2>Bases:</h2>
					<ul>
						<li className={"link-style"} onClick={this.props.handleButtonMenu()} data-component={"Components/RowBase"}>
							RowBase
						</li>
					</ul>
				</Col>
			</Row>
		);
	}
}
