import React, {useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { setStateModals, setSelectedPay, setSelection, setMontoTotal } from '../../actions/index.js';
import { Table, Typography, Divider, Space, Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Modal } from '../../components'
import moment from 'moment';


const urlResumen = `http://${process.env.URL}:4003/Pagos/`

const { Text } = Typography;

const Resumen = ({busqueda,...props}) => {
const [loading, setLoading] = useState(true);
const [selected, setSelected] = useState([]);
const [selectedRowKeys, setSelectedRow] = useState([])
const [montoTotal, setMonto] = useState(0)
const [pagos, setPagos] = useState([]);
const [state, setState] = useState({
    searchText:'',
    searchedColumn:'',
})

useEffect(() => {
    if(loading || props.stateModals.reload){
        const getPagos = async () => {
            try {
                const result = await axios.get(`${urlResumen}${busqueda}`)
                setPagos(result.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
                props.setStateModals({...props.stateModals, reload: false})
            }
        }
        getPagos();
    }
}, [props.stateModals.reload])


const handleShowDetalle = data => {
    setSelected(data)
    props.setStateModals({...props.stateModals, detalle: true})
}


const onSelectChange = (selectedRowKeys, all ) => {
    setSelectedRow(selectedRowKeys);
    props.setSelectedPay(selectedRowKeys.length)
    props.setSelection(all)
    if(all.length !== 0){
        const monto = all.reduce((acum, curr) => ({Monto: acum.Monto + curr.Monto })).Monto
        setMonto(monto)
        props.setMontoTotal(monto)
    }
  };


const hasSelected = selectedRowKeys.length > 0;

const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  let searchInput = ''
  const getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              searchInput = node;
            }}
            placeholder={`Buscar ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Buscar
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Limpiar
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => searchInput.select(), 100);
        }
      },
      render: text =>
        state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[state.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
  });
  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
  };
  
  const handleReset = clearFilters => {
      clearFilters();
      setState({ searchText: '' });
  };

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
        align: 'center',
        render: value => <strong>{Intl.NumberFormat("de-DE").format(value)  }</strong>,
        sorter: {
            compare: (a, b) => a.Monto - b.Monto,
            multiple: 2,
        }
    },
    {
        title: 'Instrumento',
        dataIndex: 'Instrumento',
        align: 'center',
        key: 'instrumento',
    },
    {
        title: 'Fecha',
        dataIndex: 'fecha',
        key: 'fecha ',
        align: 'center',
        render: value => moment(value).format('L'),
        sorter: {
            compare: (a, b) => moment(a.fecha) - moment(b.fecha),
            multiple: 1
        }
    },
    {
        title: 'Rut',
        dataIndex: 'Rut',
        key: 'rut',
        align: 'center',
        ...getColumnSearchProps('Rut')
    },
    {
        title: 'Beneficiario',
        dataIndex: 'Empresa',
        key: 'beneficiario',
        ...getColumnSearchProps('Empresa')
    },
    {
        title: 'Facturas',
        dataIndex: 'Facturas',
        key: 'facturas',
        align: 'center',
        render: (value, all) =>  <a onClick={() => handleShowDetalle(all)}>{value}</a>
    },
]

return(
    <>
        <Text style={{paddingTop:5}}>
            <strong>Has seleccionado: </strong>{selectedRowKeys.length} pagos.
        </Text>
        <Divider type='vertical' />
        <Text>
            <strong>Total:</strong> {hasSelected ? Intl.NumberFormat("de-DE").format(montoTotal) : 0}
        </Text>
        <Table
            style={{paddingTop:5}}
            rowKey='ID'
            size='small'
            loading={loading}
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
                defaultPageSize:100,
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