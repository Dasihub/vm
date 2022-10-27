export interface INavigationProps {
    isNavigation: boolean
    changeMenu: (is: boolean) => void
    logout: () => Promise<void>
    access: null | number
}
