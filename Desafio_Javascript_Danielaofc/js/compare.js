let carArr = [];

class Car {
    constructor(model, price, bedHeight, carHeight, groundClearance, loadCapacity, engine, power, bedVolume, wheel, image, id = null) {
        this.id = id;
        this.model = model;
        this.image = image;
        this.bedHeight = bedHeight || "511 mm";
        this.carHeight = carHeight || "1821 mm";
        this.groundClearance = groundClearance || "232 mm";
        this.loadCapacity = loadCapacity || "1234 kg";
        this.engine = engine;
        this.power = power;
        this.bedVolume = bedVolume;
        this.wheel = wheel;
        this.price = price;
    }
}

// Procura no array se o carro já existe, retornando a posição ou -1
function GetCarArrPosition(arr, carClass) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].model === carClass.model) {
            return i;
        }
    }
    return -1;
}

// Adiciona ou remove o carro do array de comparação baseado no checkbox
function SetCarToCompare(el, carClass) {
    if (!(carClass instanceof Car)) {
        throw new Error("You need to set a Car Class");
    }

    const exists = GetCarArrPosition(carArr, carClass);

    if (el.checked) {
        // Se já existir por algum motivo, ignora
        if (exists !== -1) return;

        // Limita a seleção a apenas 2 carros
        if (carArr.length >= 2) {
            el.checked = false;
            alert("Você só pode comparar 2 carros por vez.");
            return;
        }
        // Adiciona o carro selecionado ao array
        carArr.push(carClass);
    } else {
        // Se foi desmarcado e o carro existe no array, remove-o
        if (exists !== -1) {
            carArr.splice(exists, 1);
        }
    }
}

// Controla a exibição e valida a quantidade mínima
function ShowCompare() {
    if (carArr.length < 2) {
        alert("Precisa marcar 2 carros para apresentar a comparação");
        return;
    }
    
    UpdateCompareTable();
    document.getElementById("compare").style.display = "block";
}

// Oculta o pop-up de comparação
function HideCompare() {
    document.getElementById("compare").style.display = "none";
}

// Injeta dinamicamente os dados dos carros selecionados nas células correspondentes
function UpdateCompareTable() {
    const columns = [
        { id: "compare_image", prop: "image", isImage: true },
        { id: "compare_modelo", prop: "model" },
        { id: "compare_alturacacamba", prop: "bedHeight" },
        { id: "compare_alturaveiculo", prop: "carHeight" },
        { id: "compare_alturasolo", prop: "groundClearance" },
        { id: "compare_capacidadecarga", prop: "loadCapacity" },
        { id: "compare_motor", prop: "engine" },
        { id: "compare_potencia", prop: "power" },
        { id: "compare_volumecacamba", prop: "bedVolume" },
        { id: "compare_roda", prop: "wheel" },
        { id: "compare_preco", prop: "price" }
    ];

    for (const column of columns) {
        for (let index = 0; index < 2; index++) {
            // Nota: Corrigido o seletor dinâmico para usar a sintaxe correta com crases
            const cell = document.getElementById(`${column.id}_${index}`);
            if (!cell) continue;

            if (index < carArr.length) {
                const value = carArr[index][column.prop];
                if (column.isImage) {
                    // Formata a exibição da imagem
                    cell.innerHTML = `<img src="${value}" alt="${carArr[index].model}" style="max-width:200px; max-height:120px;">`;
                } else if (column.prop === "price") {
                    // Formatação opcional amigável para preço monetário
                    cell.textContent = `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                } else {
                    cell.textContent = value;
                }
            } else {
                cell.innerHTML = "";
            }
        }
    }
}