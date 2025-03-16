const readline = require("readline");
const { addPerm } = require("./sqlAdmin");


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log("============================[ADMIN CONSOLE]===========================");
console.log("");
console.log("\x1b[34m ████  ██   ██  ███  █████       █     █ ██    █ ███████ ███████");
console.log("\x1b[34m█      ██   ██ █   █ █   █       ██   ██ █ █   █    █       █   ");
console.log("\x1b[34m ███   ███████ █   █ ████  ████  ██   ██ █  █  █    █       █   ");
console.log("\x1b[34m    █  ██   ██ █   █ █            █   █  █   █ █    █       █   ");
console.log("\x1b[34m ███   ██   ██  ███  █             ███   █    ██    █       █   ");
console.log("\x1b[0m");

console.log("Ctrl + C để thoát");
function askCommand() {
    rl.question(">>> ", (command) => {
        switch (command) {
            case "addperm":
                rl.question("Nhập username: ", (username) => {
                    rl.question("Nhập perm: ", (perm) => {
                            addPerm(username, perm, (err, res)=>{
                                console.log(`🔹 Đã cấp perm ${perm} cho tài khoản ${username}`);
                                console.log(res)
                            })
                            askCommand();
                    });
                });
                break;
            default:
                console.log("Lệnh không hợp lệ. Vui lòng nhập lại.");
                askCommand();
                break;
        }
    });
}

// Bắt đầu nhận lệnh
askCommand();