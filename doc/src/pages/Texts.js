import React from 'react';
import { Row, Col, H1, H2, Text } from 'Components';

export default class Texts extends React.Component {
	render(){
		return(
			<Row>
				<Col s="12" m="12" l="12">
					<H1>Texts</H1>

					<br/>
					<hr/>
					<br/>
					
					<H2>H1</H2>
					<br/>
					<Text>
						Este H1 herda propriedades de 
						<span className={'link-style'} onClick={this.props.handleButtonMenu()} data-component="Components/TextBase">TextBase</span>.
						As propriedades aceitas por este componente no momento são:
					</Text>
					<ul>
						<li> - fontSize</li>
						<li> - clNormalLilac, clNormalGreen, etc...</li>
						<li> - txCenter, txRight</li>
						<li> - fontSize (passar em unidades rem)</li>
						<li> - padding</li>
						<li> - size</li>
						<li> - txBold</li>
						<li> - txItalic</li>
						<li> - txInline</li>
						<li> - offSide (font-family: 'OffSide')</li>
						<li><H2>Para avaliar:</H2></li>
						<li> - backGroundRed</li>
						<li> - backGroundGreen</li>
					</ul>


					<pre className="code">
						{`<H1>
							Hello world
						<H1/>`}
					</pre>
				</Col>
			</Row>
		);
	}
}
