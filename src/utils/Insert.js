import axios from 'axios'

const urlInsert = `http://${process.env.URL}:4003/Insert/`

export const Insertar = (props) => {
  const insert = new Promise((resolve, reject) =>{
    try {
        const getInsert = async () => {
          console.log(props)
          const result = await axios.post(urlInsert, props)
          result.data.info && result.data.info.name === 'ERROR' ? reject(result.data.info) : resolve(result.data)
        }
        getInsert();
    } catch (error) {
      console.log('error Insert:', error)
      reject(error)   
    }
  })


  return insert
}
