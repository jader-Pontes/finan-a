import { useState, useEffect } from "react"

// style
import * as C from "./App.styles";


// import data
import { categories } from "./data/categories";
import { items } from "./data/items";


//import interface/types
import { category } from "./types/Category";
import { Item } from "./types/Item";


// funções
import { filterListByMonth, getCurrentMonth } from "./helpers/dateFilter";


//components
import { TableArea } from "./Components/TableArea/index";
import { InfoArea } from "./Components/InfoArea/index";
import { InputArea } from './Components/InputArea/index';


const App = () => {
  const [list, setList] = useState(items);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);


  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth));
  }, [list, currentMonth])

  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    for (let i in filteredList) {
      if (categories[filteredList[i].category].expense) {
        expenseCount += filteredList[i].value;
      } else {
        incomeCount += filteredList[i].value;

      }
    }

    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList])


  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth)
  }

  const handleAddItem = (item: Item) => {
    let newList = [...list];
    newList.push(item);
    setList(newList);
  }

  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>Sistema Financeiro</C.HeaderText>
      </C.Header>
      <C.Body>
        {/* Área de informações */}
        <InfoArea
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
        />

        {/* Área de inserção */}
        <InputArea onAdd={handleAddItem} />

        {/* Área de itens */}
        <TableArea list={filteredList} />

      </C.Body>
    </C.Container>

  )
}

export default App;