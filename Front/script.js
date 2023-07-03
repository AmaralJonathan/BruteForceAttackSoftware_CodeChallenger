window.onload = startTypingEffect()
function auto(){
  debugger
  let startInterval = document.getElementById("intervalStart")
  startInterval.value = 184759
  
  let intervalEnd = document.getElementById("intervalEnd")
  intervalEnd.value = 856920
  
  let secretKey = document.getElementById("secretKey")
  secretKey.value = "sk_test_183097"

  let endPoint = document.getElementById("endPoint")
  endPoint.value = "http://localhost:3000/settingsBruteForce"
  
}
function getSettings(){
    debugger
    let startInterval = document.getElementById("intervalStart").value ? document.getElementById("intervalStart").value : null;
    let intervalEnd = document.getElementById("intervalEnd").value ? document.getElementById("intervalEnd").value : null;
    let secretKey = document.getElementById("secretKey").value ? document.getElementById("secretKey").value : null;
    let endPoint = document.getElementById("endPoint").value ? document.getElementById("endPoint").value : null;
    
    
   
   const objSetting = {
        indexStartInterval: startInterval,
        indexEndInterval: intervalEnd,
        secretKey:secretKey,
        
    }

    let jsonSetting = JSON.stringify(objSetting);

    this.sendSettings(jsonSetting,endPoint)
}

function sendSettings(jsonSetting,endPoint){
  var count = 0
  var resultTxt = document.getElementById("resultTxt");
    if(jsonSetting == null){
        return window.alert("Error to validater fields")
    }

    try{
        fetch(endPoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonSetting,
        })
          .then((response) => response.json())
          .then((data) => {
            count = data.length;
            resultTxt.value = "$. brute-force -codeChallenge..." + "Success:" +JSON.stringify(data);
            window.alert(count + " Senhas encontradas")
          })
          .catch((error) => {
            resultTxt.value = "$. brute-force -codeChallenge..." + "Error:" + error
          });
    }catch{
        return window.alert("Error to send data")
    }
    
}

function startTypingEffect() {
  var element = document.querySelector('.typing-effect');
  var text = element.innerHTML.trim();
  element.innerHTML = '';

  var i = 0;
  var speed = 50; // Velocidade de digitação em milissegundos

  // Loop para adicionar as letras uma a uma com o intervalo de tempo
  function typeWriter() {
      if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
      }
  }

  // Inicia o efeito de digitação
  typeWriter();
}

