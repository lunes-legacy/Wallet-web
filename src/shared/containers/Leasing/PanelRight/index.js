import React from 'react'
import styled from 'styled-components'
import style from 'Shared/style-variables'
import { coins } from 'lunes-lib';
import { TextBase, H1 } from "Components";
//import {ButtonGreen} from "Components/Buttons";
import { Col, Row } from 'Components/index';
import { Loading } from 'Components/Loading';
import {timestampToDate} from 'Utils/date';
import { encrypt, decrypt } from '../../../utils/crypt';
// import Leasing from 'Classes/Leasing'; // refatorar para usar a classe
import { connect } from 'react-redux';
import { getWalletInfo } from 'Redux/actions';
import {numeral} from 'Utils/numeral';


const StyledPanelRight = styled.div`
    position: relative;
	background: ${style.normalLilac};
	width: 100%;
	height: 100%;
    overflow-x: auto;
    letter-spacing: .3px;
`;

const LabelBalance = styled.text`
  ${TextBase}
  display:block;
  text-align:right;
  margin-bottom:3rem;
`;

const ContentList = styled.div`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

  border-radius: 1.5rem;
  padding: 1.5rem;
  margin: 1.5rem;
  margin-bottom: 180px;
`;

const HeaderRow = Row.extend`
    ${TextBase}
    padding: 3rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
`;

const DateText = styled.div`
    ${TextBase}
    font-size: 1rem;
    display:block;

    ${props => {
        if(!props.status){
            return `color: ${style.lightPurple}`;
        }
    }};
`;

const HashText = styled.div`
    ${TextBase}
    font-size: 1.2rem;
    display:block;
    margin-top: .5rem;

    ${props => {
        if(!props.status){
            return `color: ${style.lightPurple}`;
        }
    }};
`;

const GreenText = styled.div`
    ${TextBase}
    font-size: 1.2rem;
    display:block;

    ${props => {
        if(!props.status){
            return `color: ${style.lightPurple}`;
        }
    }};
`;

const CancelBox = styled.div`
    &:hover {
        filter: hue-rotate(260deg) saturate(8);
        -webkit-filter: hue-rotate(260deg) saturate(8);
    }
`;

const CancelText = styled.div`
    ${TextBase}
    font-size: 1.2rem;
    display:block;
    cursor: pointer;

    ${props => {
        if(!props.status){
            return `color: ${style.lightPurple}`;
        }
    }};
`;

const Icon = styled.img`
	width: 25px;
    height: 25px;
`;

const IconActive = styled.div`
    background-image: url(/img/leasing_panel_right/icon-power.svg);
    backrgound-repeat: no-repeat;
    background-size: cover;

	width: 25px;
    height: 25px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom:-10px;

    -webkit-animation: rotation 5s infinite linear;
    -moz-animation: rotation 5s infinite linear;
    animation: rotation 5s infinite linear;

    @-webkit-keyframes rotation {
        from { -webkit-transform: rotate(0deg); }
        to {-webkit-transform: rotate(359deg); }
    }
    
    @-moz-keyframes rotation {
        from { -moz-transform: rotate(0deg); }
        to { -moz-transform: rotate(359deg); }
    }
    
    @keyframes rotation {
        from { transform: rotate(0deg); }
        to { transform: rotate(359deg); }
    }
    
`;

const BoxLineLeasing = Row.extend`
    margin-bottom:20px; 
    border-bottom: solid 1px ${style.normalLilac3};
    padding-top:20px;
    padding-bottom:20px;

    &:last-child {
        border-bottom: none;
    }
`;

class PanelRight extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            listLeasing: [], 
            wallet_info: {
                seed: null,
                addresses: {
                    LNS: null
                }
            }
        };
        
        this.cancelLeasing = this.cancelLeasing.bind(this);
    }

    // consulta de leasing
    searchLeasing = async () => {
        this.setState({...this.state, listLeasing: []});

        // usando endereco do localstorage
        let address = this.state.wallet_info.addresses.LNS

        // consulta
        let listLeasing = await coins.services.leaseHistory({ 
            address: address, 
            network: 'LNS', 
            testnet: true 
        }).then((e)=>{
            console.log(e);
            return e
        }).catch((e)=>{
            console.log(e);
            return false
        });

        this.setState({...this.state, listLeasing: listLeasing});

        console.log(this.state);
    }

    componentDidMount = () => {
        this.searchLeasing();
    }

    componentWillMount = () => {
        // fazer a chamada da classe Leasing
        // let leasing = new Leasing()
        // let retorno = leasing.getLeaseHistory() // chamada para teste

        // pegar os dados criptografados (verificar em privacy/rescue.js)
        //this.setState({this.state, wallet_info: JSON.parse(decrypt(localStorage.getItem('WALLET-INFO')))});
    
        // bloco de teste ************
        this.setState({...this.state, wallet_info: {
                seed: encrypt('educate cruise farm draw paper smile valve conduct remain blur agree index chef example lesson'),
                addresses: {
                    LNS: '37aF3eL4tsZ6YpqViXpYAmRQAi7ehtDdBmG'
                }
            }
        });
        // bloco de teste ************
    }

    cancelLeasing = async (key) => {
        const mnemonic = decrypt(this.state.wallet_info.seed);

        const cancelLeasingData = { 
            mnemonic: mnemonic, 
            txID: key, 
            fee: "100000", 
            testnet: true 
        }; 
        const cancelLeaseResult = await coins.services.leaseCancel(cancelLeasingData);

        alert("CANCELED: "+key);
        this.searchLeasing();
    }    

    // normalizar status do leasing, que hoje é 8 ou 9 
    _normalizeStatus = status => {
        if(status==="active"){
            return true
        }else{
            return false
        }
    }

    // retornando o botao de cancelar, com condicional de status
    _buttonCancel = (status, id, type) => {
        if(type===8){
            if(status){
                return (
                    <CancelBox>
                        <CancelText clNormalGreen txCenter status={status} onClick={()=>this.cancelLeasing(id)}>
                            <IconActive /><br/>
                            CANCEL
                        </CancelText>
                    </CancelBox>
                );
            }else{
                return (
                    <CancelText clNormalRed txCenter status={status} onClick={()=>{}}>
                        <Icon src={'/img/leasing_panel_right/icon-power-off.svg'} /><br/>
                        CANCELED
                    </CancelText>
                );
            }
        }
    }

    // retornando os itens, de acordo com os dados no storage
    _renderLeasings = () => {
        if(!this.state.listLeasing){
            return <GreenText txBold txCenter>NENHUM LEASING ENCONTRADO</GreenText>
        }
        if (this.state.listLeasing.length < 1) {
            return <Loading className="js-loading" size={'35px'} bWidth={'7px'} />;
        }else{
            return this.state.listLeasing.map((obj, key) => {

                let nativeAmount = numeral(obj.nativeAmount / 100000000).format('0,0.00000000');
                let status = this._normalizeStatus(obj.otherParams.status);

                return (
                    <BoxLineLeasing key={obj.txid} >
                        <Col s={12} m={6} l={6}>
                            <DateText clWhite status={status}> {new Date(obj.date).toLocaleDateString()} </DateText>
                            <HashText clWhite txBold status={status}> {obj.txid} </HashText>
                        </Col>
                        <Col s={12} m={4} l={4}>
                            <GreenText clNormalGreen txBold txCenter status={status}> {nativeAmount} LNS</GreenText>
                        </Col>
                        <Col s={12} m={2} l={2}>
                            {this._buttonCancel(status, obj.txid, obj.otherParams.type)} 
                        </Col>
                    </BoxLineLeasing>
                );
            });
        }
    }

    // o componente
    render() {
        return (
            <StyledPanelRight>
                {/* header da tabela */}
                <HeaderRow>
                    <Col s={12} m={6} l={6}>
                        Leasing Transactions
                    </Col>
                    <Col s={12} m={4} l={4} css={`text-align:center;`}>
                        Emprestado
                    </Col>
                    <Col s={12} m={2} l={2} css={`text-align:center;`}>
                        Status
                    </Col>
                </HeaderRow>
            
                {/* content da tabela */}
                <ContentList>
                    {this._renderLeasings()}
                </ContentList>
            </StyledPanelRight>
        );
    }
}

//aplicar redux 
// const mapStateToProps = state => {
//     return {
//         walletInfo: state.walletInfo
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         getWalletInfo: (data) => {
//             dispatch(getWalletInfo(data));
//         }
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(PanelRight);
export default PanelRight;
