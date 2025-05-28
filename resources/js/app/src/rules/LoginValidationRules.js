const NUMBER = '0123456789';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const SPECIALCHARACTER = '!@#$%^&*()_+[]{}|;:,.<>?';
const PASSWORD_LENGHT = 8;

const loginValidationRules = {
    // Os campos neste arquivo precisam bater com os campos do Login.js 
    // em Types e no Login.jsx em Views
    email:(email)=>{
        if (!email || email.trim().length === 0){
            mensagens.push('Obrigatório informar um Email');
        }
    },

    password:(password)=>{
        if (!password || password.trim().length === 0){
            mensagens.push('Obrigatório informar uma Senha');
        }

        if (password && password.length < PASSWORD_LENGHT){
            mensagens.push('A Senha deve ter no mínimo {PASSWORD_LENGHT} caracteres');
        }

        const hasNumber = [...password].some((char) =>{ 
            NUMBER.includes(char);
        });

        if (!hasNumber) {
            mensagens.push('A Senha deve conter pelo menos um número');
        }
        
        const hasLowercase = [...password].some((char) =>{ 
            LOWERCASE.includes(char);
        });

        if (!hasLowercase) {
            mensagens.push('A Senha deve conter pelo menos uma letra minúscula');
        }
    },
    
    
    
}