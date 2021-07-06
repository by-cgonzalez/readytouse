import React, { useState } from 'react'
import { Button , DatePicker, Input, Form,} from 'antd'
import Resumen from '../Resumen'
import { connect } from 'react-redux';
import { setStateModals, setStatus, } from '../../actions/index.js';
import { Ordenar } from '../../utils/Ordenar.js';
import Resultado from './Resultado';
import moment from 'moment';



const Dashboard = (props) => {
  const [form] = Form.useForm();
  const [showResumen, setShow] = useState(false)
  let createTXT = {};
  
  const handleClick = async () => {
    await Ordenar({
      data:props.toTxt, 
      fecha: moment(form.getFieldValue('fecha')).format('yyyyMMDD'), 
      Desc: form.getFieldValue('conceptopago'),
      Monto: props.montoPorPagar,
    }).then(result => {
      createTXT = result;
      props.setStatus({status:'success', message: result.message})
      props.setStateModals({...props.stateModals, result:true})
    }).catch(err => {
      props.setStatus({status:'error', message:err.message.message})
      props.setStateModals({...props.stateModals, result:true})
    })
  }
  const handleOnFinish = (values) => {
    props.setStateModals({...props.stateModals, reload: true})
    setShow(true)
  }

  return (
    <div>
      <Form
        layout='inline'
        name="pagomasivo"
        size='small'
        initialValues={{ remember: true }}
        form={form}
        onFinish={handleOnFinish}
      >
        <Form.Item
            label="Concepto de Pago"
            name="conceptopago"
            style={{marginBottom:5}}
            rules={[{ required: true, message: 'Debe ingresar datos para buscar!' }]}
        >
          <Input style={{width:240}} placeholder='PPN Semana XX'/>
        </Form.Item>
        <Form.Item
            label="Fecha de Pago"
            name="fecha"
            style={{marginBottom:5}}
            rules={[{ required: true, message: 'Debe ingresar fecha' }]}
        >
          <DatePicker value={form.setFieldsValue(moment())} />
        </Form.Item>
        <Form.Item
            style={{marginBottom:5}}
            >
          <Button type="primary" htmlType='submit' >Mostrar</Button>
        </Form.Item>
        <Button 
          type='dashed'
          disabled={props.pagosSeleccionados === 0}
          onClick={handleClick}
        >
          Generar Archivo
        </Button>

      </Form>
      {showResumen ? <Resumen busqueda={form.getFieldValue('conceptopago')}/> : null }
      {props.stateModals.result ? <Resultado />: null }
    </div>
  )

}

const mapDispatchToProps = {
  setStateModals,
  setStatus,
};

const mapStateToProps = state => {
  return {
      pagosSeleccionados: state.pagosSeleccionados,
      toTxt: state.toTXT,
      montoPorPagar: state.montoPorPagar,
      stateModals: state.stateModals,
    }    
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
