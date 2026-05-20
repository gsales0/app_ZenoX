import { Categorias } from "../../cadastro/categorias";
import { Contas } from "../../cadastro/contas";
import { Contratos } from "../../cadastro/contratos";
import { Pessoas } from "../../cadastro/pessoas";
import { Produtos } from "../../cadastro/produtos";
import { Financeiro } from "../../movimento/financeiro";
import { Entidade } from "../../seguranca/entidade/entidade";


export const menuEngine: menuEngine[] = [
    {
        folder: "Cadastro",
        icon: 'fa-solid fa-folder-open',
        open: false,
        route: "cadastro",
        itens: [
            { label: "Categorias", route: "categorias", icon: "fa-solid fa-tags", component: Categorias },
            { label: "Contas Bancárias", route: "contas", icon: "fa-solid fa-money-check-dollar", component: Contas },
            { label: "Contratos & Aditivos", route: "contratos", icon: "fa-solid fa-briefcase", component: Contratos },
            { label: "Credores & Fornecedores", route: "pessoas", icon: "fa-solid fa-address-book", component: Pessoas },
            { label: "Produtos e Serviços", route: "produtos", icon: "fa-solid fa-boxes-packing", component: Produtos },
        ],
    },
    {
        folder: "Movimentação",
        icon: "fa-solid fa-folder-open",
        open: false,
        route: "movimentacao",
        itens: [
            { label: "Financeiro", route: "financeiro", icon: "fa-solid fa-calculator", component: Financeiro }
        ]
    },
    {
        folder: "Relatórios",
        icon: "fa-solid fa-folder-open",
        open: false,
        route: "relatorios",
        itens: [

        ]
    },
    {
        folder: "Segurança",
        icon: "fa-solid fa-folder-open",
        open: false,
        route: "seguranca",
        itens: [
            { label: "Entidade & Configurações", route: "entidade", icon:"fa-solid fa-sliders", component: Entidade }
        ]
    }

]

interface menuEngine{
    folder: string,
    icon: string,
    open: boolean,
    route: string,
    itens: { label: string, route: string, icon: string, component: any }[]
}