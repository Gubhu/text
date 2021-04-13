function Cart() {
    if (localStorage.getItem("cartDatas")) {
        this.cartData = JSON.parse(localStorage.getItem("cartDatas"));
    } else {
        this.cartData = {};
    }
}
//商品id
Cart.prototype.saveData = function (id, num, bull) {
    if (this.cartData[id] && bull) {
        this.cartData[id] += num;
    } else {
        this.cartData[id] = num;
    }

    localStorage.setItem("cartDatas", JSON.stringify(this.cartData));

}

//DOM结构的id 用于展示购物车数据列表的ul的id
Cart.prototype.show = function (id) {
    let oCartList = document.getElementById(id);
    let productDatas = JSON.parse(localStorage.getItem("productDatas"));
    let str = "";
    for (let id in this.cartData) {
        str += `<li data-id="${id}" class="list">
        <input type="checkbox" class="ck">
        <img src="${productDatas[id].imgsrc}">
        <span>${productDatas[id].title}</span>
        <button class="down">-</button>
        <input type="text" value="${this.cartData[id]}" class="num">
          <button class="rise">+</button>
       <span class="totlepay">${this.cartData[id] * productDatas[id].price}</span>
       <button class="delitem">删除</button>
        </li>`;
        oCartList.innerHTML = str;
    }
    let oRise = document.querySelectorAll(".rise");
    let tDown = document.querySelectorAll(".down");
    let oInput = document.querySelectorAll(".num");
    let oDel = document.querySelectorAll(".delitem");
    let apay = document.querySelectorAll(".totlepay");
    let aLi = document.querySelectorAll(".list");
    let ckall = document.querySelector(".checkAll");
    let ck = document.querySelectorAll(".ck");
    for (let i = 0; i < oRise.length; i++) {
        oRise[i].onclick = () => {
            oInput[i].value++;
            this.cost(i);
            this.totle();
        }
        tDown[i].onclick = () => {
            oInput[i].value--;
            if (oInput[i].value <= 1) {
                oInput[i].value = 1;
            }
            this.cost(i);
            this.totle();
        }
        oInput[i].oninput = () => {
            this.cost(i);
            this.totle();
        }
        oDel[i].onclick = () => {
            let id = aLi[i].getAttribute("data-id");
            this.del(id, i);
            this.totle();
            console.log(oCartList.children.length);
            if (oCartList.children.length == 0) {
                ckall.checked = false;
            }
        }

        ck[i].onclick = () => {
            let cont = 0;
            for (let j = 0; j < ck.length; j++) {
                if (ck[j].checked) {
                    cont++;
                }
                this.totle();
            }
            if (cont == ck.length) {
                ckall.checked = true;
            } else {
                ckall.checked = false;
            }
            console.log(cont);
            this.totle()

        }
    } ckall.onclick = () => {
        for (let i = 0; i < ck.length; i++) {
            ck[i].checked = ckall.checked;
            this.totle();
        }
    }
    Cart.prototype.cost = function (i) {
        let id = aLi[i].getAttribute("data-id");
        this.saveData(id, oInput[i].value, false);
        apay[i].innerText = oInput[i].value * productDatas[id].price;
    }
    Cart.prototype.del = function (id, i) {
        delete this.cartData[id];
        localStorage.setItem("cartDatas", JSON.stringify(this.cartData));
        oCartList.removeChild(aLi[i]);
        ck[i].checked = false;
    }
    Cart.prototype.totle = function () {
        let oDiv = document.getElementById("totlepay");
        let allmoney = 0;
        for (let i = 0; i < ck.length; i++) {
            if (ck[i].checked) {
                allmoney += Number(apay[i].innerText);
            }
        }
        oDiv.innerText = allmoney;
    }
}