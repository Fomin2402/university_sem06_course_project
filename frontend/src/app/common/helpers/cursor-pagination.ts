export function calculatePage(offset: number, limit: number): number {
    return Math.floor(offset / limit) + 1;
}