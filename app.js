let form = document.forms.register
// regex
let regexes = {
   Email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
   Age: /^\S[0-9]{0,3}$/,
   Name: /^[a-zA-Z ]+$/
}
let obj = {}

// submit
form.onsubmit = () => {
   event.preventDefault()
   let fm = new FormData(form)
   let counter = 0

   fm.forEach((value, key) => {
      obj[key] = value
      let input = document.querySelector('input[name=' + key + ']')

      if (input.getAttribute('data-regex')) {
         let regex = input.getAttribute('data-regex')

         if (regexes[regex].test(value)) {
            input.style.border = "1px solid green"
            counter++
         } else {
            input.style.border = "1px solid red"
            counter--
         }
      }

      if (input.getAttribute('data-min')) {
         if (input.value.length < +input.getAttribute("data-min")) {
            input.style.border = "1px solid red"
            counter--
         } else {
            input.style.border = "1px solid green"
            counter++
            if (input.getAttribute('data-max')) {
               if (input.value.length > +input.getAttribute('data-max')) {
                  input.style.border = "1px solid red"
               } else {
                  input.style.border = "1px solid green"
               }
            }
         }
      }

      if (counter == form.querySelectorAll('input[data-required]').length) {
         console.log("send to server");
      } else {
         console.log("error");
      }
   })
}