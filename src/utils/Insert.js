import { message } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import axios from 'axios'

const urlInsert = `http://${process.env.URL}:4003/Insert/`
var BreakException = {};

export const Insertar = (props) => {
  let messageError = {}
  const insert = new Promise((resolve, reject) =>{
    try {
        const getInsert = async () => {
          const { data } = props
          const newData = data.map(items => {
            const {MatchID, ...rest} = items
            return rest
          })

          const isNull = (value) => value === null

          newData.forEach(item => {
            const itemArray = Object.values(item)
            const index = itemArray.findIndex(isNull)
            if(index !== -1) {
              const benficiarioWithNull = newData.filter(items => items === item)[0].Empresa
              const valueNull = Object.keys(item)[index]
              console.log({ benficiarioWithNull, valueNull })
              BreakException = { message: `Beneficiario: ${benficiarioWithNull} contiene un valor nulo en el campo: ${valueNull}`}
              reject(BreakException)
              throw BreakException;
            }  
          }) 
          
          
          
          const result = await axios.post(urlInsert, props)
          result.data.info && result.data.info.name === 'ERROR' ? reject(result.data.info) : resolve(result.data)
        }
        getInsert();
    } catch (error) {
      if(error !== BreakException){
        console.log('error Insert:', error)
        reject(error) 
        throw error
      } else {
        console.log('error values:', BreakException)
        reject(BreakException)
        
      }
        
    }
  })


  return insert
}
