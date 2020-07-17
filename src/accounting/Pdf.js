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

const data =[
    {date: "4/01", money: "1000", num: "11"},
    {date: "4/02", money: "2000", num: "12"},
    {date: "4/03", money: "3000", num: "13"},
];


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
for(let i=0; i<data.length; i++){
table_body.push([data[i].date, data[i].money, data[i].num]);
}

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
    text: String(new Date()) + "テキストも追加できます\n\n"},
    table_content,
    {text: "\n\nテーブルの後ろに追加してみました。"}
    ],
    defaultStyle:{
    font: 'GenShin'//ここでデフォルトのスタイル名を指定しています。
    }
  }).download("ファイル名.pdf");
};

 