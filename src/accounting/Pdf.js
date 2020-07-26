import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


export const PdfExport =()=>{
    pdfMake.fonts = {
        GenShin: {
        normal: 'GenShinGothic-Normal-Sub.ttf',
        bold: 'GenShinGothic-Normal-Sub.ttf',
        italics: 'GenShinGothic-Normal-Sub.ttf',
        bolditalics: 'GenShinGothic-Normal-Sub.ttf'
        }
     }

var table_content = {
      table: {
      widths: '*',
      body: [
      []
      ]
      }
   };


const obj = JSON.parse(localStorage.getItem("dates"));
const keyArray = Object.keys(obj);                        //キー一覧
const keyCount = keyArray.length;                         //日付キー数
const today = new Date();
const makeDay = today.getFullYear() + "年" + (today.getMonth()+1) + "月" + today.getDate() + "日";


var table_head = ['日付','売り上げ','点数'];
var head_tr = [];
for( let v of table_head ){
  head_tr.push({
    text: v,
    fillColor: '#dddddd',
    style: ["tableHeader", "tableCell"]
    });
  };
  table_content["table"]["body"][0] = head_tr;
  var table_body = [];
  for(let i=0; i<keyCount-1; i++){
    table_body.push([keyArray[i], obj[keyArray[i]]["uriage"], obj[keyArray[i]]["number"]]);
  }
  table_body.push([keyArray[keyCount-1], obj[keyArray[keyCount-1]]["uriage"] + " (未確定)", obj[keyArray[keyCount-1]]["number"] + " (未確定)"]);
  

for( let a of table_body ){
  var tr = [];
  for( let v of a ){
    tr.push({
    text: v,
    fillColor: '#fff',
    style: ["tableCell"]
    });
  };
table_content["table"]["body"].push(tr);
};
pdfMake.createPdf(
{
    content: [{
    text: "売り上げ確認表\n\n",fontSize: 35,alignment:'center'},
    {text: "作成日　"+ makeDay, alignment:'right',bold: true},
    {text: "日々の売り上げ確認です。当日の情報は現時点の情報が表示されます。\n",bold: true},
    table_content,
    {text: "\n計"+ keyCount+ "件",alignment:'right'}
    ],
    defaultStyle:{
    font: 'GenShin'//ここでデフォルトのスタイル名を指定しています。
    }
  }).download("ファイル名.pdf");
};

 