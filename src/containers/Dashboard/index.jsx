import React, { useState } from 'react'
import { Button , DatePicker, Input, Form } from 'antd'
import Resumen from '../Resumen'
import { connect } from 'react-redux';
import { Ordenar } from '../../utils/Ordenar.js';
import moment from 'moment';



const Dashboard = (props) => {
  const [form] = Form.useForm();
  const [showResumen, setShow] = useState(false)
  
  const handleClick = () => {
    // var blob = new Blob(["                  Hello, world!"], {type: "text/plain;charset=utf-8"});
    // saveAs(blob, "prueba.txt");
    Ordenar({
      data:props.toTxt, 
      fecha: moment(form.getFieldValue('fecha')).format('yyyyMMDD'), 
      Desc: form.getFieldValue('conceptopago'),
      Monto: props.montoPorPagar,
    });
  }
  const handleOnFinish = (values) => {
    setShow(true)
  }

  const handleOnFinishFailed = (values) => {
    console.log('Success:', values);
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
        onFinishFailed={handleOnFinishFailed}
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
      {showResumen ? <Resumen busqueda={form.getFieldValue('conceptopago')}/> : null}
    </div>
  )

}

const mapStateToProps = state => {
  return {
      pagosSeleccionados: state.pagosSeleccionados,
      toTxt: state.toTXT,
      montoPorPagar: state.montoPorPagar,
  }    
}

export default connect(mapStateToProps)(Dashboard);
