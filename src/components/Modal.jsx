import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Table, Typography, Button } from 'antd';
import { connect } from 'react-redux';
import { setStateModals } from '../actions';
import moment from 'moment';

const urlDetalle = `http://${process.env.URL}:4003/Detalle/`

const { Text, Title, } = Typography;
const ModalDetalle = ({selected, ...props}) => {
    const [detalle, setDetalle] = useState([])
    const [loading, setLoading] = useState(false)

    const columns = [
        {
            title: 'Factura',
            dataIndex: 'Factura',
            key: 'factura',
            align: 'center',
        },
        {
            title: 'Monto',
            dataIndex: 'Monto',
            key: 'monto',
            render: value => <strong>{Intl.NumberFormat("de-DE").format(value * -1)  }</strong>,
        },
        {
            title: 'Fecha de Pago',
            dataIndex: 'Fecha',
            key: 'fecha',
            align: 'center',
            render: value => moment(value).format('L')
        },
        // {
        //     title: 'Nuestra Referencia',
        //     dataIndex: 'NuestraRef',
        //     key: 'referencia',
        //     align: 'center',
        // },
        {
            title: 'Descripción',
            dataIndex: 'DescrRef',
            key: 'descrRef',
        },
    ]
    
    useEffect(() => {
            setLoading(true)
            const getDetalle = async () => {
                try {
                    const result = await axios.get(`${urlDetalle}${selected.ID}`)
                    setDetalle(result.data)
                } catch (error) {
                    console.log(error)
                } finally {
                    setLoading(false)
                }
        }
        getDetalle();
    },[])


    const handleCancel = () => {
        props.setStateModals({...props.stateModals, detalle: false})
    }

    return (
        <Modal 
            visible={props.stateModals.detalle} 
            // style={{width:'70%'}}
            onCancel={handleCancel}
            zIndex={2000}
            width={800}
            footer={[
                <Button key="back" type='primary'onClick={handleCancel}>
                  cerrar
                </Button>,
              ]}
        >
            <Title type='secondary' level={4} style={{margin:0}}>{selected.Empresa}</Title>
            <Title type='secondary' level={5} style={{margin:0}}>{selected.DescBanco}({selected.CodCuenta})</Title>
            
            <Text>Detalle de pagos para beneficiario:</Text>

            <Table
                rowKey='Factura'
                size='small'
                loading={loading}
                columns={columns}
                dataSource={detalle}
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
    }    
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalDetalle);