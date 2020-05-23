let btnStart = document.getElementById('start'),//кнопка старт начать рассчет
bgtval = document.getElementsByClassName('budget-value')[0],//доступ к значениям 
dabuval = document.getElementsByClassName('daybudget-value')[0],//указанным в строке 
lvlval = document.getElementsByClassName('level-value')[0],
expval = document.getElementsByClassName('expenses-value')[0],
optExpVal = document.getElementsByClassName('optionalexpenses-value')[0],
incval = document.getElementsByClassName('income-value')[0],
msavval = document.getElementsByClassName('monthsavings-value')[0], 
ysavval = document.getElementsByClassName('yearsavings-value')[0],

expitem = document.getElementsByClassName('expenses-item'),//поля ввода
expbtn = document.getElementsByTagName('button')[0],//первая кнопка "утвердить"
optexpbtn = document.getElementsByTagName('button')[1],//"утвердить" вторая кнопка
countbtn = document.getElementsByTagName('button')[2],//кнопка "рассчитать дневной бюджет"
optexpit = document.querySelectorAll('.optionalexpenses-item'),//поля ввода необязательных расходов
choinc = document.querySelector('.choose-income'),//поле ввода статьи дохода в(можно так '#income')
chebox = document.querySelector('#savings'),//поле ввода накоплений
ssum = document.querySelector('.choose-sum'),// поле ввода суммы в (можно и так'#sum')
choper = document.querySelector('.choose-percent'),//поле ввода процентов в (можно и так'#percent')
yeval = document.querySelector('.year-value'),//поле ввода год
monval = document.querySelector('.month-value'),//поле ввода месяц
daval = document.querySelector('.day-value');//поле ввода день


    let money, time;

btnStart.addEventListener('click', function(event){//начать расчет
    appData.evnt = event.type;
    
    time = prompt("Введите дату в формате YYYY-MM-DD", "");    
    money = +prompt( "Ваш бюджет на месяц?", "");
    
    while (isNaN(money) || money == '' || money == null){
        money = +prompt( "Ваш бюджет на месяц?", "");
    }
    appData.budget = money;
    appData.timeData = time;
    bgtval.textContent = money.toFixed();
    yeval.value = new Date(Date.parse(time)).getFullYear();
    monval.value = new Date(Date.parse(time)).getMonth() + 1;
    daval.value = new Date(Date.parse(time)).getDate(); 
});

    expbtn.addEventListener('click', function(){//внесение и расчет обязательных расходов
        if(appData.evnt == 'click') {
            let sum = 0;
    
            for(let i = 0; i < expitem.length; i++) {
            let m = expitem[i].value,
                a = expitem[++i].value;


                if((typeof(m))=== 'string' && (typeof(m)) != null && 
                (typeof(a)) !=null && m != '' && a != '' &&
                m.length < 50) { 
                    appData.expenses[m] = a;

                sum += +a;
                appData.sumexpenses = sum;

                } else {
                    i = i - 1; 
                }
            }
            expval.textContent = sum;
        
        };    
    });
   
   
    optexpbtn.addEventListener('click', function(){//описание необязательных расходов
        if (appData.evnt == 'click') {
            for(let i = 0; i < optexpit.length; i++){
                let d = optexpit[i].value;
                appData.optionalExpenses[i] = d;
                optExpVal.textContent += appData.optionalExpenses[i] + ' '; 
            }
        };

    });

    countbtn.addEventListener('click', function(){//расчет дневного бюджета и уровня достатка
        if(appData.evnt == 'click') {
            if (appData.budget != undefined){

                appData.moneyPerDay = ((appData.budget - appData.sumexpenses) / 30).toFixed();
                dabuval.textContent =  appData.moneyPerDay;//с учетом обязательных расходов

                if (appData.moneyPerDay < 100){
                    lvlval.textContent = "Минимальный уровень достатка";
                } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000){
                    lvlval.textContent = 'средний уровень достатка';
                } else if(appData.moneyPerDay >= 2000){
                    lvlval.textContent = 'Высокий уровень достатка';
                } else {
                    lvlval.textContent = 'Произошла ошибка';  
                }
            } else {
                    dabuval.textContent = 'Произошла ошибка';  
            }
        };
    });


choinc.addEventListener('input', function(){//ввод доп доходов
    let items = choinc.value;
    appData.income = items.split(", ");
    incval.textContent = appData.income;
}); 

chebox.addEventListener('click', function(){//галочка накоплений
    if (appData.savings == true){
        appData.savings = false;
    } else {
        appData.savings = true;
    } 
});

ssum.addEventListener('input', function(){//ввод и расчет суммы накоплений
    if (appData.savings == true){
        let sum = +ssum.value;
        // percent = +choper.value;

        // appData.monthIncome = sum/100/12*percent;
        // appData.yearIncome = sum/100*percent;
       
        // msavval.textContent = appData.monthIncome.toFixed(1);
        // ysavval.textContent = appData.yearIncome.toFixed(1);
    }
});
 
choper.addEventListener('input', function(){//ввод процентов и расчет суммы накоплений
    if (appData.savings == true) {
        let sum = +ssum.value,
        percent = +choper.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        msavval.textContent = appData.monthIncome.toFixed(1);
        ysavval.textContent = appData.yearIncome.toFixed(1);
    }
});

 var appData = {
budget: money,
timeData: time,
expenses: {},
optionalExpenses:{},
income:[],
savings: false,
};