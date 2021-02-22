let laptops = [];
let bankBalance = 0;
let loanBalance = 0;
let laptopBounght = false;
let workBalance = 0;
let computerPrice;
let selectedComputer = 0;
let purchasedComputers = [];

const laptop = function (model, price, specs, info, image){
    this.model = model;
    this.price = price;
    this.info = info;
    this.specs = specs;
    this.image = image;
}

const asus = new laptop(
    "Asus Laptop 15", 
    799, 
    "4 GB internal memory \n  i7 8565U Processor \n 15.6 (16: 9) LED-backlit HD",
    "Whether for work or play, the ASUS X509 is an entry-level laptop that delivers strong performance and deep visuals.",
    "resources/asus.jpg"
    );
const macbook = new laptop(
    "MacBook Pro 13",     
    2299, 
    "Screen Size 13 Inches \n Four Thunderbolt 3 (USB-C) ports \n  i7 8565U Processor",
    "If you're in the market for a sleek small laptop that you can carry anywhere with you then MacBook Pro 13 2020 is the laptop for you.",
    "resources/mac.jpg"
    );
const lenovo = new laptop(
    "Lenovo Yoga Slim 7", 
    999, 
    "16 GB DDR4 RAM \n AMD Ryzen™ 7 4700U -prosessor \n 512 GB M.2 PCIe NVMe SSD",
    "Lenovo once again gives us a masterclass on how to make a world-class laptop for under a grand.",
    "resources/lenovo.jpg"
    );
const hp = new laptop(
    "HP Envy x360 ay0802",
    1099, 
    "16GB DDR4 RAM \n  AMD Ryzen™ 7 4700U Processor \n 512 GB NVMe SSD",
    "Between its small, slim design and its snappy AMD processor, HP's midrange convertible laptop is worth seeking out.",
    "resources/hp.jpg"
    );

laptops.push(asus, macbook, lenovo, hp);

document.addEventListener('DOMContentLoaded', function() {
    getComputers();
}, false);    
    
document.getElementById("computers").addEventListener("change", function() {
    getComputers();
});

function getComputers(){
    let x = document.getElementById("computers");
    let i = x.value;
    computerPrice = laptops[i].price;
    document.getElementById("laptopSpecs").innerText = laptops[i].specs;
    document.getElementById("laptopModel").innerText = laptops[i].model;
    document.getElementById("laptopImage").src = laptops[i].image;
    document.getElementById("laptopInfo").innerText = laptops[i].info;
    document.getElementById("laptopPrice").innerText = computerPrice + " €";
}

document.getElementById("getLoanButton").addEventListener("click", function() {
    let amount;
    if (loanBalance != 0) {
        alert("Once you have a loan, you must pay it back BEFORE getting another loan");
    } else if (laptopBounght == true){
        alert("You cannot get more than one bank loan before buying a computer");
    } else {
        amount = parseInt(prompt("Enter the amount of loan:"));
        if (isNaN(amount)) {
            alert("Loan cancelled.");
        } else if (amount > (bankBalance * 2)) {
            alert("Loan amout can't be more than double of yout bank balance.");
        } else {
            bankBalance += amount;
            loanBalance = amount;
            laptopBounght = true;
            document.getElementById("bankBalance").innerHTML = bankBalance + " €";
            document.getElementById("loanBalance").innerHTML = loanBalance + " €";
            document.getElementById("repayLoanButton").style.display = "initial";
        } 
    }
});

document.getElementById("repayLoanButton").addEventListener("click", function() {
    console.log("klik")
    if (workBalance >= loanBalance){
        bankBalance = bankBalance + (workBalance - loanBalance);
        loanBalance = 0;
        workBalance = 0;
        alert("The loan has been repaid totally. Excess mony added to your banck account");
        document.getElementById("repayLoanButton").style.display = "none";
    } else {
        document.getElementById("repayLoanButton").style.display = "initial";
        loanBalance = loanBalance - workBalance;
        workBalance = 0;
    }
    document.getElementById("bankBalance").innerHTML = bankBalance + " €";
    document.getElementById("workBalance").innerHTML = workBalance + " €";
    document.getElementById("loanBalance").innerHTML = loanBalance + " €";
});

document.getElementById("workButton").addEventListener("click", function() {
    workBalance = workBalance + 100;
    document.getElementById("workBalance").innerHTML = workBalance + " €";
});

document.getElementById("bankButton").addEventListener("click", function() {
    bankBalance = bankBalance + workBalance;
    workBalance = 0;
    document.getElementById("workBalance").innerHTML = workBalance + " €";
    document.getElementById("bankBalance").innerHTML = bankBalance + " €";
});

document.getElementById("buyComputer").addEventListener("click", function() {
    if (computerPrice > bankBalance){
        alert("You cannot afford the laptop.");
    } else {
        bankBalance = (bankBalance - computerPrice);
        laptopBounght = false;
        document.getElementById("bankBalance").innerHTML = bankBalance + " €";
        alert("Computer successfully purchased.");
        let x = document.getElementById("computers");
        let i = x.value;
        purchasedComputers.push(laptops[i].model)
        showComputers();
    }
});

function showComputers(){
    if (document.getElementById("myComputers")) {
        document.getElementById("myComputers").innerHTML = "Laptops you own: " + purchasedComputers;
    } else {
        const span = document.createElement("span");
        span.innerText = "Laptops you own: " + purchasedComputers;
        span.className = "card-text";
        span.id = "myComputers";
        document.getElementById("myBank").appendChild(span);
    }
}