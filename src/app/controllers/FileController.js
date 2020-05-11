import path from 'path';
import xlsx from 'xlsx';

import File from '../models/File';

class FileController {
  async store (req, res) {
    const filename = req.file.filename
    const arq = path.resolve(__dirname, '..', '..','..', 'tmp', 'uploads', filename)
    const wb = xlsx.readFile(arq, { cellDates:true });

    const names = wb.SheetNames;
    const ws = wb.Sheets[names];
    const data = xlsx.utils.sheet_to_json(ws); 

    async function verify(data){
      const arr = []
      
      const cadastra = await data.map(async (d) =>{
        const {Ordem, primeiro_ct} = d
        const ordemExists = await File.findOne({ where: { Ordem }})

        if (ordemExists) {
          arr.push(ordemExists)
          return [...arr]
        }else{
          await File.create({ ordem: Ordem, primeiro_ct: primeiro_ct })
        }   
      })

      
      const promises = await Promise.all(cadastra)
      
      return promises
    }
    const dados = await verify(data)
    return res.json(dados)
  }
}

export default new FileController();