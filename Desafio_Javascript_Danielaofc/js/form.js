class contato {
    constructor(nome, email, telefone, contato, mensagem) {
        this.nome = nome,
            this.email = email,
            this.telefone = telefone,
            this.contato = contato,
            this.mensagem = mensagem;
    }
}

function Post(form) {

  let data = new contato(form.elements.namedItem("nome").value,
            form.elements.namedItem("email").value, 
            form.elements.namedItem("telefone").value, 
            form.elements.namedItem("contato").value,
            form.elements.namedItem("mensagem").value);

        Enviar(data);
  
}

function Enviar(data) {
const forms = document.querySelector("#forms");
    document.addEventListener("submit", (e) => {
        e.preventDefault();
        var nome = document.getElementById("nomeid");

        if (nome.value != "") {
            alert('Obrigado sr(a) ' + nome.value + ' os seus dados foram encaminhados com sucesso');
        }   
        forms.reset();
        document.getElementById('btnEnviar').disabled = true;
        console.log(data);
    }, { once: true});

}
document.addEventListener("DOMContentLoaded", function () {
const chkTermos = document.getElementById('chkTermos');
    const btnEnviar = document.getElementById('btnEnviar');

    // Garante que o botão comece desativado ao carregar a página se o checkbox estiver desmarcado
    if (chkTermos && btnEnviar) {
        btnEnviar.disabled = !chkTermos.checked;

        // 2. Cria a função que liga/desliga o botão baseado no checkbox 
        chkTermos.addEventListener('change', function () {
            // Se chkTermos estiver marcado, disabled vira false (habilita) 
            // Se chkTermos estiver desmarcado, disabled vira true (desabilita) 
            btnEnviar.disabled = !this.checked;
        });
    }
});