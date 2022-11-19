const isPath = (): boolean => {
    return window.location.host.includes('localhost') || window.location.host.includes('192.168.100.56')
}

export const url: string = isPath() ? '' : '/vm'
