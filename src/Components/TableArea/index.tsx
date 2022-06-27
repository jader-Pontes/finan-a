// style
import * as C from './styles'


//Interface
import { Item } from "../../types/Item"

//components
import { TableItem } from "../../Components/TableItem/index"


type Props = {
    list: Item[];

}

export const TableArea = ({ list }: Props) => {


    return (

        <C.Table>
            <thead>
                <tr>
                    <C.TableHeadColum width={100}>Data</C.TableHeadColum>
                    <C.TableHeadColum width={130}>Categoria</C.TableHeadColum>
                    <C.TableHeadColum>Título</C.TableHeadColum>
                    <C.TableHeadColum width={150}>Value</C.TableHeadColum>

                </tr>
            </thead>
            <tbody>
                {list.map((item, index) => (
                    < TableItem key={index} item={item} />
                ))}
            </tbody>
        </C.Table>


    );
};