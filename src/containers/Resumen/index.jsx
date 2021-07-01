import React, {useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { setStateModals, setSelectedPay, setSelection, setMontoTotal } from '../../actions/index.js';
import { Table, Typography, Divider, } from 'antd'
import { Modal } from '../../components'


const urlResumen = `http://${process.env.URL}:4003/Pagos/`

const { Text } = Typography;

const Resumen = ({busqueda,...props}) => {
const [loading, setLoading] = useState(true);
const [selected, setSelected] = useState([]);
const [selectedRowKeys, setSelectedRow] = useState([])
const [montoTotal, setMonto] = useState(0)
const [pagos, setPagos] = useState([]);

useEffect(() => {
    if(loading){
        console.log('buscando pagos...', busqueda)
        const getPagos = async () => {
            try {
                const result = await axios.get(`${urlResumen}${busqueda}`)
                setPagos(result.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getPagos();
    }
}, [])


const handleShowDetalle = data => {
    setSelected(data)
    props.setStateModals({...props.stateModals, detalle: true})
}

const columns = [
    {
        title: 'Concepto',
        dataIndex: 'Concepto',
        key: 'concepto',
    },
    {
        title: 'Monto',
        dataIndex: 'Monto',
        key: 'monto',
        render: text => <strong>{Intl.NumberFormat("de-DE").format(text * -1)  }</strong>,
    },
    {
        title: 'Instrumento',
        dataIndex: 'Instrumento',
        key: 'instrumento',
    },
    {
        title: 'Rut',
        dataIndex: 'Rut',
        key: 'rut',
    },
    {
        title: 'Beneficiario',
        dataIndex: 'Empresa',
        key: 'beneficiario',
    },
    {
        title: 'Facturas',
        dataIndex: 'Facturas',
        key: 'facturas',
        align: 'center',
        render: (value, all) =>  <a onClick={() => handleShowDetalle(all)}>{value}</a>
    },
]

const onSelectChange = (selectedRowKeys, all ) => {
    setSelectedRow(selectedRowKeys);
    props.setSelectedPay(selectedRowKeys.length)
    props.setSelection(all)
    if(all.length !== 0){
        const monto = all.reduce((acum, curr) => ({Monto: acum.Monto + curr.Monto })).Monto
        setMonto(monto)
        props.setMontoTotal(monto * -1)
    }
  };


const hasSelected = selectedRowKeys.length > 0;

const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

return(
    <>
        <Text style={{paddingTop:5}}>
            <strong>Has seleccionado: </strong>{selectedRowKeys.length} pagos.
        </Text>
        <Divider type='vertical' />
        <Text>
            <strong>Total:</strong> {hasSelected ? Intl.NumberFormat("de-DE").format(montoTotal * -1) : 0}
        </Text>
        <Table
            style={{paddingTop:5}}
            rowKey='ID'
            size='small'
            loading={loading && !pagos.length === 0}
            columns={columns}
            dataSource={pagos}
            rowSelection={{
                type: 'checkbox',
                ...rowSelection,
              }}
            pagination={{
                showSizeChanger:true,
                position:['bottomLeft'],
                showTotal: total => `Total ${total} items`,
                defaultPageSize:10,
                defaultCurrent:1,
            }}
        />
        {props.stateModals.detalle ? <Modal selected={selected} /> : null }
    </> 
)
}

const mapDispatchToProps = {
    setStateModals,
    setSelectedPay,
    setSelection,
    setMontoTotal,
};

const mapStateToProps = state => {
    return {
        stateModals: state.stateModals,
    }    
}

export default connect(mapStateToProps, mapDispatchToProps)(Resumen);