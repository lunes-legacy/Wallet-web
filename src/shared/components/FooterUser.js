import React from 'react'
import StyledComponents from 'styled-components'
import style from 'Shared/style-variables'
import {Link, CustomLink} from 'Components/Link'
import {P} from 'Components/P'

const CustomP = P.extend`
  display: block;
  margin-top: 20%;
  text-align: center;

  @media (${style.media.tablet2}) {
    margin-top: 12%;
  }

  @media (${style.media.desktop}) {
    margin-top: 25%;
  }
`;

class FooterUser extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      content: this.props.content,
      to: this.props.to,
      label: this.props.label
    }
  }

  render() {
    return (
      <div>

        <CustomP clWhite fontSize={"1.4rem"}>
          {this.state.content} {" "}
          <CustomLink to={this.state.to} color={`${style.normalGreen}`} display="inline">
            {this.state.label}
          </CustomLink>
        </CustomP>

      </div>
    )
  }

}

export default FooterUser
