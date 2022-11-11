export type typeTab = {
    title: string
    id: number
}

export interface ITabsProps {
    isPage: number
    data: typeTab[]
    changePage: (pre: number) => void
}
