export interface Vehicle {
    name: string
    plat_number: string
    lat: number
    long: number
}

export interface User {
    id: string
    name: string
    email: string
    motocycles: Vehicle[]
}