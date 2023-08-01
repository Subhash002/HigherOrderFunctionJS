import cart from './cart.json';
import currencyRates from './currencyRates.json';
import {renderRows,renderTotals} from "./view"
const currencyPicker = document.querySelector("select[name='currency-picker']");
currencyPicker.innerHTML=Object.keys(currencyRates).map(key =>`<option>${key}</option>`).join("")

const computeCart=function(){
    const currency=this?.value;
    currencyConverter(currency,currencyRates,renderRows)(cart);
    currencyConverter(currency,currencyRates,renderTotals)(cart);
    // renderRows(cart);
    // renderTotals(cart);
}

// Higher order functions
const currencyConverter=(currency,rates,fn) =>{
    const conversionRates=rates[currency]??1;
    return cart=>{
        const revised=cart.map(item=>{
            return {
                ...item,
                cost: item.cost*conversionRates,
            }
        })
        return fn(revised);
    }
}

currencyPicker.addEventListener("change",computeCart);
computeCart(); 