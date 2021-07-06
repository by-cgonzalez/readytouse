import React from 'react'
import { connect } from 'react-redux'
import { setStateModals, } from '../../actions/index.js';
import { Button, Result, Modal } from 'antd'

const Resultado = (props) =>{
  
  const handleClick = () =>{
    props.setStateModals({...props.stateModals, result:false})
  }

  return (
    <Modal
      visible={props.stateModals.result}
      closable
      key={Math.random()}
      footer={false}
      footer={[
        <Button key={1} type="primary" onClick={handleClick}>
          Volver
        </Button>
      ]}

    >
      <Result
        key={Math.random()}
        status={props.result.status}
        title={props.result.message}
      />
     
    </Modal>
  )
}

const mapDispatchToProps = {
  setStateModals,
};

const mapStateToProps = state => {
  return {
      stateModals: state.stateModals,
      result: state.statusTXT,
    }    
}

export default connect(mapStateToProps, mapDispatchToProps)(Resultado)