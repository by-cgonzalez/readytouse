import { saveAs } from 'file-saver';

export const Ordenar = (props) => {
    const header = [`01084176900700200001${props.Desc.padEnd(25," ")}01202106040002943516900   N                                                                                                                                                                                                                                                                                                                                  010201`]

    var blob = new Blob(header, {type: "text/plain;charset=utf-8"});
    saveAs(blob, "prueba.txt");
    return console.log(props)
}

