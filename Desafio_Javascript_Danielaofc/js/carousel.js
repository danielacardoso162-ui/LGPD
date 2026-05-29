/**
 * AÇÃO 2: Carrossel de Imagens
 * Classe responsável pelo gerenciamento da transição de banners da página principal.
 */
class Carousel {
    // Passo 4: Construtor com os atributos exigidos
    constructor(image, title, url) {
        this.image = image;
        this.title = title;
        this.url = url;
    }

    // Variáveis de controle estáticas para guardar o estado do carrossel
    static dados = [];
    static indexAtual = 0;
    static intervalo = null;
    static TEMPO_TRANSICAO = 2000; // Passo 5: Intervalo de 2 segundos (2000ms)

    /**
     * Passo 4: Método inicializador invocado no HTML por Carousel.Start(carouselArr)
     */
    static Start(arr) {
        Carousel.dados = arr;
        Carousel.indexAtual = 0;

        // Exibe o primeiro slide imediatamente
        Carousel.showContent();

        // Inicia o temporizador automático de 2 segundos
        Carousel.configurarTemporizador();
    }

    /**
     * Passo 4: Atualiza a imagem de fundo e o título com o link na tela
     */
    static showContent() {
        const divCarousel = document.getElementById("carousel");
        const divTitle = document.getElementById("carousel-title");
       
        // Verifica se existem dados carregados no array
        if (!Carousel.dados || Carousel.dados.length === 0) return;
       
        const item = Carousel.dados[Carousel.indexAtual];

        if (divCarousel && divTitle) {
            // Aplica a imagem de fundo na div conforme as regras do CSS
            divCarousel.style.backgroundImage = `url('${item.image}')`;
            divCarousel.style.backgroundSize = "cover";
            divCarousel.style.backgroundPosition = "center";

            // Injeta o título estruturado como um link clicável
            divTitle.innerHTML = `<a href="${item.url}">${item.title}</a>`;
        }
    }

    /**
     * Incrementa ou decrementa o index e atualiza a tela
     */
    static mudarSlide(direcao) {
        if (!Carousel.dados || Carousel.dados.length === 0) return;

        Carousel.indexAtual += direcao;

        // Se passar do último slide, volta para o primeiro (0)
        if (Carousel.indexAtual >= Carousel.dados.length) {
            Carousel.indexAtual = 0;
        }
        // Se voltar antes do primeiro slide, vai para o último
        if (Carousel.indexAtual < 0) {
            Carousel.indexAtual = Carousel.dados.length - 1;
        }

        // Mostra o slide correspondente
        Carousel.showContent();

        // Reinicia o tempo para o usuário ganhar mais 2 segundos inteiros para ler
        Carousel.configurarTemporizador();
    }

    /**
     * Controla o temporizador para avançar automaticamente a cada 2s
     */
    static configurarTemporizador() {
        if (Carousel.intervalo) {
            clearInterval(Carousel.intervalo);
        }
        Carousel.intervalo = setInterval(() => {
            Carousel.mudarSlide(1); // Avança 1 slide automaticamente
        }, Carousel.TEMPO_TRANSICAO);
    }
}

/**
 * MAPEAMENTO GLOBAL DAS FUNÇÕES:
 * Como o HTML dela chama as funções diretamente usando onclick="mudarSlide()",
 * precisamos expor essa função para o navegador encontrá-la fora da classe.
 */
window.mudarSlide = function(direcao) {
    Carousel.mudarSlide(direcao);
};