const addressForm = document.getElementById("address-form");
const cepInput = document.getElementById("cep");
const addressInput = document.getElementById("address");
const cityInput = document.getElementById("city");
const neighborhoodInput = document.getElementById("neighborhood");
const regionInput = document.getElementById("region");
const formInputs = document.querySelectorAll("[data-input");
const closeButton = document.getElementById("close-message");
const fadeElement = document.getElementById("fade")
//validate CEP input

cepInput.addEventListener("keypress", (e)=>{
   const onlyNumbers = /[0-9]/;
   const key = String.fromCharCode(e.keyCode);

   // allow only numbers
   if(!onlyNumbers.test(key)){
      e.preventDefault();
      return;
   }
})

// Get address event
cepInput.addEventListener("keyup", (e)=>{
   const inputValue = e.target.value

   if(inputValue.length === 8){
      getAddress(inputValue)
   }
})

// Get customer address from API
const getAddress = async (cep)=>{
   toggleLoader()

   cepInput.blur()

   const apiUrl = `https://viacep.com.br/ws/${cep}/json/`

   const response = await fetch(apiUrl)

   const data = await response.json()

   if(data.erro === true){
      if(!addressInput.hasAttribute("disabled")){
         toggleDisabled();
      }
      addressForm.reset()
      toggleLoader()
      toggleMessage("CEP Inválido, tente novamente.")
      return
   }

   if(addressInput.value === ""){
      toggleDisabled()
   }

   addressInput.value = data.logradouro
   cityInput.value = data.localidade
   neighborhoodInput.value = data.bairro
   regionInput.value = data.uf
   toggleLoader()
}

const toggleDisabled = ()=>{
   if(regionInput.hasAttribute("disabled")){
      formInputs.forEach((input)=>{
         input.removeAttribute("disabled")
      })
   }else{
      formInputs.forEach((input)=>{
         input.setAttribute("disabled", "disabled")
      })
   }
}

// Show or hide loader
const toggleLoader = () =>{
   const loaderElement = document.getElementById("loader")

   fadeElement.classList.toggle("hide")
   loaderElement.classList.toggle("hide")
}

const toggleMessage = (msg) =>{
   const messageElement = document.getElementById("message")
   const messageElementText = document.querySelector("#message p")
   
   messageElementText.innerText = msg

   fadeElement.classList.toggle("hide")
   messageElement.classList.toggle("hide")
}

closeButton.addEventListener("click", ()=>toggleMessage())

addressForm.addEventListener("submit", (e)=>{
   e.preventDefault()
   toggleLoader()
   setTimeout(()=>{
      toggleLoader()
      toggleMessage("Endereço enviado com sucesso!")
      addressForm.reset()
      toggleDisabled()
   },1500)
})