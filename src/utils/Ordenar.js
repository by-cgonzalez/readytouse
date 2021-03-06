import { saveAs } from 'file-saver';

export const Ordenar = (props) => {
  const create = new Promise((resolve, reject) => {
    try {
      const header = []
      //ENCABEZADO TIPO 01
      header.push(`01084176900700200001`)
      header.push(`${props.Desc.padEnd(25," ")}`) //Descripcion Concepto Pago
  
      header.push(`01`) //Codigo moneda 01 = pesos
      header.push(`${props.fecha}`) //fecha formato yyyymmdd
      header.push(`${props.Monto.toString().padStart(11,"0")}00`) // Monto total de pago, con dos decimales, sin coma ni punto separador
      header.push(`   N`)
      header.push(''.padStart(322," ")) //filler
      header.push('010201') //Pago Proveedores
      header.push('\n')
      //DETALLES 02 Y 03
      let correlativo = 1
      for(let datos of props.data){
          //TIPO 02
          header.push('020841769007002  ')
          header.push(`00001`) //Nro Nomina
          header.push(`${datos.medioPago}`) //Medio de Pago
          header.push(`${datos.Rut.replace(/[-.]/g,'').substring(0,8).padStart(9,'0')}`) //Rut sin DV ni puntos ni guion
          header.push(`${datos.Rut.substring(datos.Rut.length -1)}`) // DV
          header.push(`${datos.Empresa.padEnd(60,' ')}`) //Nombre Beneficiario
          header.push('0')
          header.push(''.padStart(74," ")) //filler
          header.push(`${datos.CodBanco}`) //Cod Banco
          header.push(`${datos.CodCuenta.trim().padEnd(22,' ')}`) // Cod Cuenta Bancaria
          header.push(`000`) // Oficina destino
          header.push(`${datos.Monto.toString().padStart(11,'0')}00`) //monto 
          header.push(`${''.padEnd(119,' ')}`) //descripcion pago
          header.push(`${correlativo.toString().padStart(4,'0')}`) //Numero Mensaje
          header.push(`N`) //āNā: Vale Vista Normal
          header.push(''.padStart(14," ")) //filler
          header.push(''.padStart(6,'0')) //filler
          header.push('S') //vale Vista Virtual
          header.push(''.padEnd(45," ")) //filler
          header.push('\n')
  
          //TIPO 03
          header.push('030841769007002  ')
          header.push(`00001`) //Nro Nomina
          header.push(`${correlativo.toString().padStart(4,'0')}`) //Nro Nomina
          header.push(`EMA`) //āEMAā para avisos por Correo ElectrĆ³nico
          header.push(`${datos.correo.trim().padEnd(96,' ')}`)
          header.push(datos.Glosa.padEnd(250," ")) //Mesaje a desplegar en Aviso de Pago
          header.push(''.padEnd(2," ")) //fille
          header.push('000')
          header.push(''.padEnd(20," ")) //filler
  
          correlativo += 1
          header.push('\n')
      }
  
      var blob = new Blob(header, {type: "text/plain;charset=utf-8"});
      saveAs(blob, `${props.Desc} ${props.fecha}.txt`);
      resolve({ status:'ok', message:'Archivo creado Exitosamente!' })
    } catch (error) {
      reject({ status: 'error', message: error})
    }
  })

  return create
}

