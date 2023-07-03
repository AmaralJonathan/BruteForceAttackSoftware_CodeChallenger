const express = require('express');
const cors = require('cors');
const app = express();


// Start : Node .

// Liberação do 'Access-Control-Allow-Origin'.
app.use(cors());

app.listen(3000, () => console.log('run'));
app.use(express.json());

const secretKey = 'sk_test_183097'

 app.post('/settingsBruteForce', async (req, res) => {
  const jsonSetting = req.body; 
  console.log(jsonSetting)
  
  const JSONSecretKey = jsonSetting['secretKey']
  const Start= parseInt(jsonSetting['indexStartInterval'])
  const End= parseInt(jsonSetting['indexEndInterval'])
 

  //Validations
  if(JSONSecretKey != secretKey){
    res.json("SecretKey is invalid") 
  }
  if(Start == NaN){
    res.json("Primeira senha é obrigatoria") 
  }
  if(End == NaN){
    res.json("Última senha é obrigatoria") 
  }
  if(Start == End){
    res.json("Primeira e última senha não podem ser iguais") 
  }
  if(Start > End){
    res.json("Primeira senha não pode ser maior que a última") 
  }
  
  

  let values = []
  let count = 0

  console.log('Start = ' +Start)
  console.log('End = ' + End)
  
  console.log("--------Fase1--------")
    values =  await ValidateSequences(Start, End)
   
    
    console.log("--------Fase2--------")
    values = await ValidateIncrement(values)
    
    
    console.log("--------Fase3--------")
    values = await ValidateTwoSequences(values)
    

    res.json(values)
  
});


function ValidateSequences(Start, End){
  let values = []
  
  for(var pass = Start; pass < End; pass++){

    var passString = pass.toString()
    //two values equals
      for (var i = 0; i < passString.length; i++) {
        //Compara a string anterior com a seguinte se for igual adiciona
        if (passString[i] === passString[i + 1]) {
          values.push(passString)
        }
      }
    } 
    return values
}


function ValidateIncrement(values){ 
 
  var newValues = []
  var beforeValue = null;
  
  for(var i = 0; i < values.length; i++){
    //Aqui vamos interar em cada um dos valores satisfeitos no filtro anterior
    for(var v = 0; v < values[i].length; v++){
        //Interamos no Array de string e em seguida comparamos o valor anterior com o atual fazendo um parse para int se satisfeito é criada uma nova array que retorna para a função anterior.
        if(beforeValue == null){
          beforeValue = values[i][v]
        }else{
          var isValid = false
          if(parseInt(values[i][v]) >= parseInt(beforeValue)){    
            isValid = true
            beforeValue = values[i][v]
          }else{
            isValid = false
            break
          }
        }
      }
      if(isValid == true){
        newValues.push(values[i])
      }
      beforeValue = null
      
  }
  
  return [...new Set(newValues)];
  
};
function ValidateTwoSequences(value) {
  let newValue = [];
  
  for (var i = 0; i < value.length; i++) {
    let numSequences = 0;
    
    for (var s = 0; s < value[i].length; s++) {
      if (value[i][s] === value[i][s + 1]) {
        numSequences += 1;
      } else {
        if (numSequences === 1) {
          newValue.push(value[i]);
          break;
        }
        numSequences = 0;
      }
    }
  }

  return newValue;
}
function ValidateTwoSequences(value) {
  let newValue = [];

  for (var i = 0; i < value.length; i++) {
    let numSequences = 1;
    let lastDigit = value[i][0];
  // Contabilizamos o número de sequencias caso sejam identificadas 2 sequencias aumentamos o contador e se ele tiver o valor 2 atribuido então adicionamos ao Array
  // LastDigit é para verificar se o número de sequencia não está sendo satifeito por uma sequencia de 3 numeros ex: 3331267
    for (var s = 1; s < value[i].length; s++) {
      if (value[i][s] === lastDigit) {
        numSequences += 1;
      } else {
        if (numSequences === 2) {
          newValue.push(value[i]);
        }
        numSequences = 1;
        lastDigit = value[i][s];
      }
    }

    if (numSequences === 2) {
      newValue.push(value[i]);
    }
  }

  return newValue;
}


