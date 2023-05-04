
const inputs = document.querySelectorAll('.form-control');
const selects = document.querySelectorAll('.form-select');

const selectSpecialty = selects[0]
const selectSchedule = selects[1]

const checkEvaluacionDental = document.getElementById('checkEvaluacionDental');
const checkLimpiezaDental = document.getElementById('checkLimpiezaDental');
const checkExodoncia = document.getElementById('checkExodoncia');
const checkSellantes = document.getElementById('checkSellantes');
const checkFluor = document.getElementById('checkFluor');
const checkTapaduras = document.getElementById('checkTapaduras');
const checkOtro = document.getElementById('checkOtro');
const checks = [
    checkEvaluacionDental, 
    checkLimpiezaDental,
    checkExodoncia,
    checkSellantes,
    checkFluor,
    checkTapaduras,
    checkOtro,
]

const checksForms = document.getElementById('forms-checks');

const buttonSend = document.getElementById('button-send')
console.log(buttonSend)

const fields = {
    name  : false,
    email : false,
    phone : false,
    select_specialty : false,
    select_tentative_schedule : false,
    is_completed_fields : false,
}

const expression = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{9}$/, // 8 a 11 numeros.
}

const validarSelectSpecialty = (e) => {
    const value = e.target.value;
    const validateValue = [
    'Odontología', 
    'Medicina general', 
    'Nutrición',
    'Fonoaudiología'];
    const isValid = validateValue.includes(value)
    if(isValid){
        fields['select_specialty'] = true;
        e.target.className = 'form-select is-valid'
        if(value === 'Odontología'){
            checksForms.style.display = 'block'
        } else {
            checksForms.style.display = 'none'
        }
    } else {
        fields['select_specialty'] = false;
        e.target.className = 'form-select is-invalid'
        checksForms.style.display = 'none'
    }
}
const validarSelectSchedule = (e) => {
    const value = e.target.value;
    const validateValue = [
    '09:00 - 11:00', 
    '11:00 - 13:30', 
    '14:00 - 16:30'];
    const isValid = validateValue.includes(value)
    if(isValid){
        fields['select_tentative_schedule'] = true;
        e.target.className = 'form-select is-valid'
    } else {
        fields['select_tentative_schedule'] = false;
        e.target.className = 'form-select is-invalid'
    }
}

const validarFormulario = (e) => {
    switch(e.target.name){
        case "name":
            validarCampo(expression.name, e.target, e.target.name)
        break;
        case "email":
            validarCampo(expression.email, e.target, e.target.name)
        break;
        case "phone":
            validarCampo(expression.phone, e.target, e.target.name)
        break;
    }
}

const validarCampo = (expresion, input, field) => {
    if(expresion.test(input.value)){
        document.getElementById(`input-${field}`).classList.remove('form-control');
        document.getElementById(`input-${field}`).classList.remove('is-invalid');
        document.getElementById(`input-${field}`).classList.add('form-control');
        document.getElementById(`input-${field}`).classList.add('is-valid');
        fields[field] = true;

    } else {
        document.getElementById(`input-${field}`).classList.remove('form-control');
        document.getElementById(`input-${field}`).classList.remove('is-valid');
        document.getElementById(`input-${field}`).classList.add('form-control');
        document.getElementById(`input-${field}`).classList.add('is-invalid');
        // document.getElementById(`input-${field}`).classList.add('form-control is-invalid');
        // document.getElementById(`input-${field}`).classList.remove('form-control is-valid');
        // document.getElementById(`wrapper-${field}`).classList.add('c-form-page__wrapper-form-incorrect');
        // document.getElementById(`wrapper-${field}`).classList.add('c-form-page__wrapper-form-correct');
        // document.querySelector(`#wrapper-${field} i`).classList.add('fa-times-circle');
        // document.querySelector(`#wrapper-${field} i`).classList.remove('fa-check-circle');
        // document.querySelector(`#wrapper-${field} .c-form-page__input-error`).classList.add('c-form-page__input-error-active');
        fields[field] = false;
    }
}

const validateButton = () => {
    console.log(fields)
    if(fields.name && fields.email && fields.phone && fields.select_specialty && fields.select_tentative_schedule){
        buttonSend.removeAttribute("disabled");
        buttonSend.style.backgroundColor = '#86c548';
    } else {
        buttonSend.setAttribute("disabled", "");
        buttonSend.style.backgroundColor = '#ffffff';
    }
}

// checks.forEach((check) => {
//     check.addEventListener('click', e => {
//         if(checkMedicalPrescription.checked || checkFoodRestriction.checked){
//             boxObservation.style.display = 'block'
//             fields['checks'] = true;
//             validateButton()
//         } else {
//             boxObservation.style.display = 'none'
//             fields['checks'] = false;
//             validateButton()
//         }
//     })
// })

inputs.forEach((input)=>{
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
    input.addEventListener('keyup', validateButton);
    input.addEventListener('blur', validateButton);
});

selectSpecialty.addEventListener('blur', validarSelectSpecialty);
selectSpecialty.addEventListener('change', validarSelectSpecialty);
selectSpecialty.addEventListener('change', validateButton);
selectSpecialty.addEventListener('blur', validateButton);

selectSchedule.addEventListener('blur', validarSelectSchedule);
selectSchedule.addEventListener('change', validarSelectSchedule);
selectSchedule.addEventListener('change', validateButton);
selectSchedule.addEventListener('blur', validateButton);

