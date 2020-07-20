import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { xlsmemo } from '../data/Store';
import './Main.css';
import Item from './Item';
import Item2 from './Item2';
import  XLSX from 'xlsx';
import bsCustomFileInput from 'bs-custom-file-input'


const Menu = (props)=>{
  const childRef = useRef();

  let parentModal = (num)=>{
     childRef.current.openModal();
  }
  let items = props.mode === 'default' ?
   props.data.map((value, i)=>(
     <Item key={value.message} value={value} index={i} parent={(num)=>parentModal(num)} />
     
   ))
   :
   props.fdata.map((value, i)=>(
    <Item key={value.message} value={value} index={i} parent={(num)=>parentModal(num)} />
  ))


  let items2 = props.mode === 'default' ?
   props.data.map((value, i)=>(
     <Item2 key={value.message} value={value} index={i} parent={(num)=>parentModal(num)} />
     
   ))
   :
   props.fdata.map((value, i)=>(
    <Item2 key={value.message} value={value} index={i} parent={(num)=>parentModal(num)} />
  ))
  //excel入力

  const doChange = (e)=>{
    handleFile(e);
    bsCustomFileInput.init();
  }
  // ファイル選択時のメイン処理
  const handleFile =(e)=>{
    var files = e.target.files;
    var f = files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        var wb;
        var arr = fixdata(data);
        wb = XLSX.read(btoa(arr), {
            type: 'base64',
            cellDates: true,
        });

        var output = "";
        output = to_json(wb);
        console.log(output);
        let action = xlsmemo(output);
        props.dispatch(action);
    };
    reader.readAsArrayBuffer(f);
   }
    // ファイルの読み込み
    const fixdata =(data)=>{
      var o = "",
      l = 0,
      w = 10240;
      for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w,
          l * w + w)));
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
   }
   // ワークブックのデータをjsonに変換
   const to_json =(workbook)=>{
    var result = {};
    workbook.SheetNames.forEach(function (sheetName) {
        var roa = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheetName],
            {
                raw: true,
            });
        if (roa.length > 0) {
            result[sheetName] = roa;
        }
    });
    return result;
   }
  /***********************************jsx********************************************* */
  return(
    <div>
      <div class="form-group">
        <label for="inputFile">Excelで商品追加</label>
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="inputFile" onChange={doChange} />
          <label className="custom-file-label" for="inputFile" data-browse="参照">Excelファイルを選択ください。</label>
        </div>
     </div>

      {props.mode === 'default'? 
        props.data.length === 0 ? 
        <div className="bg-secondary text-light p-5">データがありません。</div>
          : 
          <div>
          {/* .....pc...*/}
          <table className="table table-bordered itemTable list-pc">
            <thead>
              <tr>
                <th className="bg-dark text-white text-center">NO</th>
                <th className="bg-dark text-white text-center">商品名</th>
                <th className="bg-dark text-white text-center">価格</th>
                <th className="bg-dark text-white text-center">カテゴリー</th>
                <th className="bg-dark text-white text-center"></th>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
          </table>
           {/* .....phone...*/}

          <table className="table table-bordered itemTable list-phone">
            <thead>
              <tr>
                <th className="bg-dark text-white text-center">商品名</th>
                <th className="bg-dark text-white text-center">価格</th>
                <th className="bg-dark text-white text-center"></th>
              </tr>
            </thead>
            <tbody>
              {items2}
            </tbody>
          </table>


          </div>
          :
          props.fdata.length === 0 ? 
          <div className="bg-secondary text-light p-5">データがありません。</div>
           : 
        <div>
           {/* .....pc...*/}
          <table className="table table-bordered list-pc">
          <thead>
            <tr>
              <th className="bg-dark text-white text-center">NO</th>
              <th className="bg-dark text-white text-center">商品名</th>
              <th className="bg-dark text-white text-center">価格</th>
              <th className="bg-dark text-white text-center">カテゴリー</th>
              <th className="bg-dark text-white text-center"></th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
          {/* .....phone...*/}

          <table className="table table-bordered itemTable list-phone">
            <thead>
              <tr>
                <th className="bg-dark text-white text-center">商品名</th>
                <th className="bg-dark text-white text-center">価格</th>
                <th className="bg-dark text-white text-center"></th>
              </tr>
            </thead>
            <tbody>
              {items2}
            </tbody>
          </table>
      </div>
      }
    </div>
  );
}
export default connect((state)=>state)(Menu)